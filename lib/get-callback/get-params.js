const url = require('url');
const cleanUrl = require('./clean-url');


module.exports = (_url = '', baseUrl) => {
    const { query, pathname } = url.parse(_url, true);
    const urlCleaned = cleanUrl(baseUrl, pathname);
    const [ collection, id ] = urlCleaned.split('/');
    return { collection, query, id };
};
