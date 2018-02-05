const collection = require('../collection');

module.exports = (_database) => (collectionName, db) => {
    const database = db || _database;
    const model = database.models[collectionName] || database
        .model(collectionName, new database.Schema({}, {
            strict:false,
            collection:collectionName
        }));

    return collection(model);
};
