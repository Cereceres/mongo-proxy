const Collection = require('./Collection');

module.exports = ({ models }, name) => (modelName = name) => new Collection(models[modelName]);
