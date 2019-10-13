/* eslint-disable no-console */
// eslint-disable-next-line global-require, import/no-extraneous-dependencies
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const apicache = require("apicache");
const bodyParser = require("body-parser");
const cors = require("cors");
const createUrl = require("./createUrl");
const getUrl = require("./getUrl");

const app = express();
const cache = apicache.middleware;
const port = 5000 || process.env.PORT;

apicache.options({
  appendKey: (req, _res) => req.body.url,
});
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is booming on port 5000 Visit http://localhost:5000`);
});

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  app.options("*", cors());
}

app.post("/new_url", cache("1 day"), async (req, res) => {
  try {
    const { url } = req.body;
    const hash = await createUrl(url);

    res.send({ hash });
  } catch (error) {
    console.error("error", error);

    if (error.message === "invalid_url") {
      res.status(400).send(error.message);

      return;
    }

    res.status(500).send("fatal error, sorry if I caused you any trouble");
  }
});

app.get("/u/:hash", cache("1 day"), async (req, res) => {
  try {
    const url = await getUrl(req.params.hash);

    res.redirect(url);
  } catch (error) {
    console.error("error", error);

    if (error.message === "not_found") {
      res.status(404).send(error.message);

      return;
    }

    res.status(500).send("fatal error, sorry if I caused you any trouble");
  }
});
