const postcss = require("postcss");
const postcssrc = require("postcss-load-config");
const Terser = require("terser");

const postcssctx = { parser: true, map: "inline" };

module.exports = {
  postcss: async (code) => {
    const { plugins, options } = await postcssrc(postcssctx);
    const result = await postcss(plugins).process(code, options);

    return result.css;
  },

  jsmin: (code) => {
    if (process.env.NODE_ENV !== "production") return code;

    const minified = Terser.minify(code, {
      mangle: false,
    });

    if (minified.error) {
      //eslint-disable-line
      console.error("Terser error: ", minified.error);

      return code;
    }

    return minified.code;
  },
};
