const collection = require('../collection');

module.exports = (_database) => (modelName, db) => {
    if (!modelName) throw new Error('Model name is required');

    const database = db || _database;
    const model = database.models[modelName] || database
        .model(modelName, new database.Schema({}, {
            strict:false,
            collection:modelName
        }));

    return collection(model);
};
