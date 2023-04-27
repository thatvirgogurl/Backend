
const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.labels",
];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}


async function sendEmail(auth, to, subject, body) {
  const gmail = google.gmail({ version: "v1", auth });

  // Construct the message payload
  const message = ["To: " + to, "Subject: " + subject, "", body].join("\n");

  // Encode the message payload as base64
  const encodedMessage = Buffer.from(message).toString("base64");

  // Send the message
  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  console.log(`Message sent to ${to}.`);

  return res.data;
}

async function listUnreadMessages(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    q: "is:unread",
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    console.log("No unread messages.");
    return;
  }
  console.log("Unread messages:");

  // Dictionary to store message IDs for each sender
  const repliedMessages = {};

  for (const message of messages) {
    const messageRes = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
    });
    const payload = messageRes.data.payload;
    const headers = payload.headers;
    const fromHeader = headers.find((header) => header.name === "From");
    const subjectHeader = headers.find((header) => header.name === "Subject");
    const sender = fromHeader.value;
    const subject = subjectHeader.value;
    console.log(`From: ${sender}, Subject: ${subject}`);

    // Check if sender has already received an auto-reply
    if (
      repliedMessages[sender] &&
      repliedMessages[sender].includes(message.id)
    ) {
      console.log(`Already sent auto-reply to ${sender} for this message.`);
      continue;
    }

    // Construct and send auto-reply
    const autoReplyText = `Hi there!\n\nI am currently out of office and will not be available to respond to emails until [DATE]. Thank you for your understanding!\n\nBest regards,\n[NAME]`;
    const autoReplyMessage = await sendEmail(
      auth,
      sender,
      subject,
      autoReplyText
    );
    console.log(autoReplyMessage);

    // Add message ID to repliedMessages dictionary
    if (!repliedMessages[sender]) {
      repliedMessages[sender] = [message.id];
    } else {
      repliedMessages[sender].push(message.id);
    }
  }
}

async function main() {
  await authorize().then(listUnreadMessages);

  // Check for unread messages every 5 minutes
  setInterval(async function () {
    await listUnreadMessages();
  }, 5 * 60 * 1000);
}

module.exports = {main}


