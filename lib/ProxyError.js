module.exports = class extends Error {
    constructor(code, message) {
        if (message === undefined && typeof code === 'string') {
            message = code;
            code = 500;
        }
        super(message || 'Internal error.');
        this.code = code || 500;
    }
};
