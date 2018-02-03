const parse = require('./parse-json-to-joi');


module.exports = (schemaModel) => async(collectionName) => {
    console.log('collectionName ', collectionName);
    const schema = await schemaModel.findOne({
        __collection:collectionName
    });

    if (!schema) return parse({});
    const joiSchema = parse(schema.__schema);

    return joiSchema;
};
