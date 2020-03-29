const { createUrl } = require("../lib");

exports.handler = async (event, _context) => {
  try {
    const { url } = JSON.parse(event.body);

    const hashedUrl = await createUrl(url);

    return {
      statusCode: 200,
      body: JSON.stringify({ hash: hashedUrl }),
    };
  } catch (error) {
    if (error.message === "invalid_url") {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: error.message }),
      };
    }

    console.error(error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "i don't know wtf is going on" }),
    };
  }
};
