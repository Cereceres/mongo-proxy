const joi = require('joi');


module.exports = (data = {}, schema, allowUnknown) => {
    const { error, value } = joi.validate(data, schema, { allowUnknown });

    if (error)return Promise.reject(error);

    return value;
};
