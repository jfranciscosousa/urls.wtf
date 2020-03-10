const path = require("path");

module.exports = {
  webpack(config, _options) {
    const newConfig = config;

    newConfig.resolve.alias = {
      ...newConfig.resolve.alias,
      root: path.join(__dirname, "src"),
    };

    return newConfig;
  },
};
