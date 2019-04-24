const schemaForSchemas = require('./schema-for-schemas');

const schemaNameCollection = '__schemas';
module.exports = (db) => {
  const Model = db.models[schemaNameCollection] || db
    .model(
      schemaNameCollection,
      new db.Schema(schemaForSchemas, { collection: schemaNameCollection }),
    );
  return {
    create: data => Model.create(data),
    delete: query => Model.deleteOne(query),
    find: query => Model.findOne(query).exec()
      .then((items) => {
        if (Array.isArray(items)) return items.map(item => item.toObject());

        if (items && items.toObject) return items.toObject();

        return items;
      }),
    findOne: query => Model.findOne(query).exec()
      .then((item) => {
        if (item && item.toObject) return item.toObject();

        return item;
      }),
  };
};
