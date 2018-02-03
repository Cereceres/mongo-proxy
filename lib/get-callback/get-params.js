const url = require('url');

module.exports = (_url = '') => {
    const { query, pathname } = url.parse(_url, true);
    const [ , collection ] = pathname.split('/');
    return { collection, query };
};
