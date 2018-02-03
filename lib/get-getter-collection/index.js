const collection = require('../collection');

module.exports = (_database) => (collectionName, db) => {
    if (!collectionName) throw new Error('collection name is required');

    const database = db || _database;
    const model = database.models[collectionName] || database
        .model(collectionName, new database.Schema({}, {
            strict:false,
            collection:collectionName
        }));

    return collection(model);
};
