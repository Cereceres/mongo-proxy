module.exports = (collection, plainObject) => (query) => plainObject(
    collection.remove(query).lean().exec()
)
;
