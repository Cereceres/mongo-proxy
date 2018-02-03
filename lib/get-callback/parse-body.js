module.exports = (body) => {
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
};
