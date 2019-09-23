const path = require("path");

module.exports = {
  siteMetadata: {
    siteUrl: "https://urls.wtf",
    title: "urls.wtf",
    author: "Francisco Sousa",
    description: "minimalist url shortener",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets/`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        root: path.join(__dirname, "src"),
      },
    },
    "gatsby-plugin-sitemap",
  ],
};
