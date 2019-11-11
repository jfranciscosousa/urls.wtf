require("./src/styles/reset.css");
require("./src/styles/theming.css");

// eslint-disable-next-line import/prefer-default-export
export const onClientEntry = async () => {
  if (typeof Map === "undefined") {
    await import("core-js/es6/map");
  }

  if (typeof Set === "undefined") {
    await import("core-js/es6/set");
  }

  await import("babel-polyfill");
};
