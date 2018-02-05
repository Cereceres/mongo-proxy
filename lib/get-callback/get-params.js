const url = require('url');
const cleanUrl = require('./clean-url');

const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
const numDocByPageDef = process.env.NUM_DOC_BY_PAGE || 100;

module.exports = async(_url = '', baseUrl) => {
    console.log('_url ', _url);
    console.log('baseUrl ', baseUrl);
    const { query = {}, pathname } = url.parse(_url, true);
    const urlCleaned = cleanUrl(baseUrl, pathname);
    const [ collection, id ] = urlCleaned.split('/');

    if (id && !checkForHexRegExp.exec(id)) return Promise.reject({
        message : 'Id must be a ObjectId valid.',
        code:400
    });
    return {
        collection,
        query,
        id,
        numDocByPage: numDocByPageDef
    };
};
