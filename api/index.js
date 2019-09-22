const express = require("express");
const bodyParser = require("body-parser");
const createUrl = require("./createUrl");
const getUrl = require("./getUrl");

const app = express();

app.use(bodyParser.json());

const port = 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is booming on port 5000 Visit http://localhost:5000`);
});

app.post("/new_url", async (req, res) => {
  try {
    const { url } = req.body;
    const hash = await createUrl(url);

    res.send({ hash });
  } catch (error) {
    res.status(500).send("fatal error, sorry if I caused you any trouble");
  }
});

app.get("/:hash", async (req, res) => {
  try {
    const url = await getUrl(req.params.hash);

    res.redirect(url);
  } catch (error) {
    res.status(500).send("fatal error, sorry if I caused you any trouble");
  }
});
