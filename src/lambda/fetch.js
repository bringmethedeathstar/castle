const axios = require('axios');

exports.handler = (event, context, callback) => {
  axios
    .get(event.queryStringParameters.url)
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: res.data,
      });
    })
    .catch(err => {
      callback(err);
    });
};
