module.exports = (res) => (response) => {
    response.done = true;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
};
