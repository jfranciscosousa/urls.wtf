/* eslint-disable no-console */
// eslint-disable-next-line global-require, import/no-extraneous-dependencies
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const createUrl = require("./createUrl");
const getUrl = require("./getUrl");

const app = express();

app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => {
  console.log(`Server is booming on port 5000 Visit http://localhost:5000`);
});

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  app.options("*", cors());
}

app.post("/new_url", async (req, res) => {
  try {
    const { url } = req.body;
    const hash = await createUrl(url);

    res.send({ hash });
  } catch (error) {
    console.error("error", error);
    res.status(500).send("fatal error, sorry if I caused you any trouble");
  }
});

app.get("/u/:hash", async (req, res) => {
  try {
    const url = await getUrl(req.params.hash);

    res.redirect(url);
  } catch (error) {
    console.error("error", error);
    res.status(500).send("fatal error, sorry if I caused you any trouble");
  }
});
