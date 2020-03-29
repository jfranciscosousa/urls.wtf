const postcss = require("postcss");
const postcssrc = require("postcss-load-config");

const postcssctx = { parser: true, map: "inline" };

module.exports = {
  postcss: async (code) => {
    const { plugins, options } = await postcssrc(postcssctx);
    const result = await postcss(plugins).process(code, options);

    return result.css;
  },
};
