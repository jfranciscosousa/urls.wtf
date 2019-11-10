// eslint-disable-next-line
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const createUrl = require("./createUrl");
const getUrl = require("./getUrl");

module.exports = {
  getUrl,
  createUrl,
};
