const url = require('url');
const qs = require('querystring');

module.exports = (_url = '') => {
    const URL = url.parse(_url, true);
    const path = URL.pathname.slice(1).split('/');
    const query = qs.parse(URL.query);
    const collection = path[0];
    return { collection: collection, query: query };
};
