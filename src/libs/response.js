const responseBody = (statusCode = 500, message = "na", data = null) => {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        statusCode,
        message,
        data,
      }),
    };
  };
  
  module.exports = responseBody;
  