const express = require("express");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./config/dbConnection");
const URL = require("./models/url");
const { redirecttoOriginalURL } = require("./controllers/url");
const app = express();
const PORT = 8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);
app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", redirecttoOriginalURL);
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
