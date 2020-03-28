const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");

module.exports = {
  dateToFormat: (date, format) => {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
  },

  dateToISO: date => {
    return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  cssmin: css => {
    return new CleanCSS({}).minify(css).styles;
  },
};
