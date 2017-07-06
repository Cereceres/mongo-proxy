const statusDefault = 400;
module.exports = (res, status = statusDefault) => (err) => {
    console.log('error ======', err);
    const responseBody = {
        headers: { 'Content-Type': 'application/json' },
        body: { error: err },
        statusCode: status
    };
    res.write(JSON.stringify(responseBody)); ;
};
