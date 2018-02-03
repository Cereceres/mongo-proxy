module.exports = (collection) => ({
    create:(query, data) => collection.create(data),

    find:(query) => collection.find(query).exec(),

    delete:(query) => collection.remove(query).exec(),

    update:(query, body) => collection.updateMany(query, body).exec()
});
