module.exports = (res) => (err) => {
    console.log('err ', err);
    const { code = 500, message } = err;
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: message,
        done:false
    }));
};
