const _getCredentialsFromReq = require('./get-credentials-from-req');

const messageWrongCred = 'Credential are wrong';

module.exports = async(req, getUser, getCredFromReq = _getCredentialsFromReq) => {
    const credentials = await getCredFromReq(req);
    const { name, pass } = credentials;
    const user = await getUser(name, pass);

    if (!user) return Promise.reject({
        message:messageWrongCred,
        code: 401
    });

    return user;
};
