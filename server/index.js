const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// Set up CORS headers to allow requests from all origins
app.use(cors());
// const cors = require("cors");


// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Monalisamishra:MDYlL3MKtGxQa59a@cluster0.7zrfpkj.mongodb.net/urlShotner",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
app.use("/", route);

app.use((req, res, next) => {
  const error = new Error("/ Path not found /");
  return res.status(400).send({ status: "ERROR", error: error.message });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
