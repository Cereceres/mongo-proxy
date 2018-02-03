const joi = require('joi');


module.exports = (data, schema, allowUnknown) => {
    console.log('data in validate ', data);

    const { error, value } = joi.validate(data, schema, { allowUnknown });
    console.log('error in validate ', error);

    if (error)return Promise.reject(error);

    return value;
};
