const htmlmin = require("html-minifier");

module.exports = {
  htmlmin: (content, outputPath) => {
    const eligibleForMinification =
      outputPath &&
      outputPath.endsWith(".html") &&
      process.env.NODE_ENV === "production";

    if (eligibleForMinification) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }

    return content;
  },
};
