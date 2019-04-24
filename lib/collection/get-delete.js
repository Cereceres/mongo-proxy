module.exports = (collection, plainObject) => query => plainObject(
  collection.deleteOne(query).lean().exec(),
);
