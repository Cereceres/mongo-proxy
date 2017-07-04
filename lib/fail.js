module.exports = (res) => (err) => {
    console.log('error =', err);
    const responseBody = {
        headers: { 'Content-Type': 'application/json' },
        body: { error: err },
        statusCode: 400
    };
    res.write(JSON.stringify(responseBody)); ;
};
