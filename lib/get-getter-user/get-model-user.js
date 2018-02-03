const schemaNameCollection = '__users';
module.exports = (db) => {
    const Model = db.models[schemaNameCollection] || db
        .model(
            schemaNameCollection,
            new db.Schema({}, {
                strict:false,
                collection: schemaNameCollection
            })
        );
    return {
        find:(query) => Model.findOne(query).exec()
            .then((items) => {
                if (Array.isArray(items)) return items.map((item) => item.toObject());

                if (items && items.toObject) return items.toObject();

                return items;
            }),
        findOne:(query) => Model.findOne(query).exec()
            .then((item) => {
                if (item && item.toObject) return item.toObject();

                return item;
            }),

        create:(data) => Model.create(data)
            .then((item) => {
                if (item && item.toObject) return item.toObject();

                return item;
            })
    };
};
