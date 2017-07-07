const Collection = require('./Collection');

module.exports = (database, _modelName) => {
    return (modelName = _modelName) => {
        console.log('Object.keys(database.models)', Object.keys(database.models), modelName);
        const model = database.models[modelName];
        return new Collection(model);
    };
};
