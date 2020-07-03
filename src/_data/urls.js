const { getTotalUrls } = require("../../api/lib");

module.exports = async () => {
  const count = await getTotalUrls();

  return { count };
};
