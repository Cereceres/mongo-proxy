module.exports = (res) => (response) => {
    console.log('success query ', response);
    response.done = true;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
};
