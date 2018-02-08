module.exports = (collection, plainObject) => (query, data) => plainObject(
    collection.create(data).then((res) => res.toObject())
);
