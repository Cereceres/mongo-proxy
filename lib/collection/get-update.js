module.exports = (collection, plainObject) => (query, body) => plainObject(
    collection
        .updateMany(query, { $set:body }).exec()
);
