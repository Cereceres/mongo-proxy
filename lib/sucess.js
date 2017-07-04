module.exports = (res) => (query) => {
    console.log('res of query ====', query);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(query));
};
