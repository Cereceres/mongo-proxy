const { stringify } = require('querystring');

module.exports = (thereAreMoreData, records) => {
    if (!thereAreMoreData) return {};

    if (records[records.length - 1] && records[records.length - 1]._id) return {
        nextQuery: stringify({
            $gt:records[records.length - 1]._id
        })
    };

    return {};
};
