const plainObject = require('./plain-object-in-query');

module.exports = (collection) => ({
    create:(query, data) => plainObject(collection.create(data)),
    find:(query) => plainObject(collection.find(query).exec()),
    delete:(query) => plainObject(collection.remove(query).exec()),
    update:(query, body) => plainObject(
        collection
            .updateMany(query, { $set:body }).exec()
    )
});
