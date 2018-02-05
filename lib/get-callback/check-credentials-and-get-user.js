const auth = require('basic-auth');


const messageCredRequired = 'Credential are required';
const messageWrongCred = 'Credential are wrong';

module.exports = async(req, getUser) => {
    const credentials = auth(req);

    if (!credentials) return await Promise.reject({
        message:messageCredRequired,
        code: 401
    });

    const { name, pass } = credentials;
    const user = await getUser(name, pass);

    if (!user) return Promise.reject({
        message:messageWrongCred,
        code: 401
    });

    return user;
};
