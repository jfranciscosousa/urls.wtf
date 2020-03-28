const path = require("path");

module.exports = ({ env }) => ({
  // for relative path CSS imports
  from: path.join(__dirname, "src/_includes/styles/index.css"),
  plugins: {
    "postcss-import": {},
    autoprefixer: {},
    cssnano: env === "production" ? { preset: "advanced" } : false,
  },
});
