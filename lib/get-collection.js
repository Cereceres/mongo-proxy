const Collection = require('./Collection');

module.exports = (database) => (modelName) => {
    let model = {};

    if (database.models[modelName]) model = database.models[modelName];

    model = database.model(modelName, new database.Schema({}, { strict: false }));
    return new Collection(model);
};
