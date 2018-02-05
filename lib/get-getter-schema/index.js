const jsonToJoiSchema = require('joison');


module.exports = (schemaModel) => async(collectionName) => {
    const schema = await schemaModel.findOne({
        __collection:collectionName
    });
    console.log('collectionName ', collectionName);
    console.log('schema ', schema);
    if (!schema) return await Promise.reject({
        code: 400,
        message: `Schema is not defined for ${collectionName} collection`
    });

    const joiSchema = jsonToJoiSchema(schema.__schema);

    return joiSchema;
};
