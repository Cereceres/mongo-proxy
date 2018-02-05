module.exports = (collection, plainObject) => (query, data) => plainObject(collection.create(data));
