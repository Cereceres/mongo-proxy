module.exports = (res) => (err) => {
    console.log('fail err ', err);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: err.message,
        done:false
    }));
};
