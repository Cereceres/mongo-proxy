const jsonToJoiSchema = require('joison');


module.exports = schemaModel => async (collectionName) => {
  const schema = await schemaModel.findOne({
    __collection: collectionName,
  });
  if (!schema) {
    return await Promise.reject({
      code: 400,
      message: `Schema is not defined for ${collectionName} collection`,
    });
  }

  const joiSchema = jsonToJoiSchema(schema.__schema);
  return joiSchema;
};
