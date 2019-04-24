const auth = require('basic-auth');

const messageCredRequired = 'Credential are required';

module.exports = async (req) => {
  const credentials = auth(req);

  if (!credentials) {
    return await Promise.reject({
      message: messageCredRequired,
      code: 401,
    });
  }

  return credentials;
};
