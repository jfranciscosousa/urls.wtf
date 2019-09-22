const axios = require("axios").default;

// Credit https://gist.github.com/dperini/729294
const urlRegex = new RegExp(
  "^" +
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    "(?::\\d{2,5})?" +
    "(?:[/?#]\\S*)?" +
    "$",
  "i",
);

/**
 * Visit the URL with a HEAD request
 * to check if the server is down or
 * the URL doesn't exist
 */
async function visitUrl(url) {
  try {
    await axios.head(url);
  } catch (error) {
    if (!error.response) {
      return false;
    }
  }

  return true;
}

module.exports = async function validateUrl(url) {
  return urlRegex.test(url) && visitUrl(url);
};
