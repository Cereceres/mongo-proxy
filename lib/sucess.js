const statusDefault = 200;

module.exports = (res, status = statusDefault) => (query) => {
    console.log('res of query ====', query);
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(query));
};
