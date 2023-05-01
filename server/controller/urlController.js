const validUrl = require("valid-url");
const urlmodel = require("../models/urlModel");
const redis = require("redis");
const shortid = require("shortid");
const { promisify } = require("util");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
let urlRegex =
  "((http|https)://)(www.)?" +
  "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
  "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

const redisClient = redis.createClient(
  17520,
  "redis-17520.c302.asia-northeast1-1.gce.cloud.redislabs.com",
  { no_ready_check: true }
);

redisClient.on("error", function (err) {
  console.error("Error connecting to Redis:", err);
});

redisClient.auth("e4bdGv7XMhTRht2Zr4eCAX5jB5LIgHpa", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

// //1. connect to the server
// //2. use the commands :

// //Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const createUrl = async (req, res) => {
  if (!Object.keys(req.body).length > 0) {
    return res
      .status(400)
      .send({ status: false, message: "Please provide some data in body" });
  }

  if (Object.keys(req.body).length > 1) {
    return res
      .status(400)
      .send({ status: false, message: "Please provide only longUrl" });
  }
  const { longUrl } = req.body;
  if (!isValid(longUrl)) {
    return res
      .status(400)
      .send({ status: false, message: "longUrl is required" });
  }
  if (!longUrl.match(urlRegex)) {
    return res.status(400).send({ status: false, message: "invalid Url" });
  }
  let longurl1 = await GET_ASYNC(`${longUrl}`);

  if (longurl1) {
    let data = JSON.parse(longurl1);

    return res
      .status(200)
      .send({ status: true, message: "url already present", data: data });
  }

  let findUrl = await urlmodel
    .findOne({ longUrl: longUrl })
    .select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 });
  if (findUrl) {
    return res
      .status(200)
      .send({ status: true, message: "url already present", data: findUrl });
  }
  const urlcode = shortid.generate().toLowerCase();
  const shorturl = `http://${req.get("host")}/${urlcode}`;
  const savedata = {
    longUrl: longUrl,
    urlCode: urlcode,
    shortUrl: shorturl,
  };

  const createData = await urlmodel.create(savedata);
  const url = { ...createData.toObject() };
      delete url._id;
      delete url.__v;
      await SET_ASYNC(`${longUrl}`, JSON.stringify(url));
      console.log(url)
      return res.status(201).send({ status: true, data:url });
  
}; 

module.exports = { createUrl };
