const { getUrl } = require("../api");

exports.handler = async (event, _context) => {
  try {
    const { hash } = event.queryStringParameters;

    const url = await getUrl(hash);

    return {
      statusCode: 301,
      headers: { Location: url },
      body: url,
    };
  } catch (error) {
    if (error.message === "not_found") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "i don't know wtf is going on" }),
    };
  }
};
