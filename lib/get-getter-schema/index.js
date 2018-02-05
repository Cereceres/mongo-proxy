const jsonToJoiSchema = require('joison');


module.exports = (schemaModel) => async(collectionName) => {
    console.log('collectionName ', collectionName);
    const schema = await schemaModel.findOne({
        __collection:collectionName
    });

    if (!schema) return jsonToJoiSchema({});

    console.log('schema ', schema);

    const joiSchema = jsonToJoiSchema(schema.__schema);

    return joiSchema;
};
