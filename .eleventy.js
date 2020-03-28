const filters = require("./eleventy/filters.js");
const transforms = require("./eleventy/transforms.js");
const shortcodes = require("./eleventy/shortcodes.js");

require("dotenv").config();

module.exports = function(config) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Transform
  Object.keys(transforms).forEach(transformName => {
    config.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach(shortcodeName => {
    config.addPairedShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Passthroughs
  config.addPassthroughCopy("src/robots.txt");

  // Deep-Merge
  config.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["liquid", "md"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    passthroughFileCopy: true,
  };
};
