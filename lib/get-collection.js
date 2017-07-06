const Collection = require('./Collection');

module.exports = (database, _modelName, _optionsToMongo = {}) => {
    return (modelName = _modelName, optionsToMongo = _optionsToMongo) => {
        const { schema = {}, options = { strict: false } } = optionsToMongo;
        let model = null;
        console.log('Object.keys(database.models)', Object.keys(database.models), modelName);
        if (database.models[modelName]) model = database.models[modelName];

        model = model || database.model(modelName, new database.Schema(schema, options));
        return new Collection(model);
    };
};
