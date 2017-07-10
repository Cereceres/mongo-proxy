module.exports = class {
    constructor(collection) {
        this.collection = collection;
    }

    create(data) {
        return this.collection.create(data);
    }
    find(query = {}, options = {}, optionsPopulate) {
        const cursor = this.collection.find(query, options).exec();

        if(optionsPopulate) return this.populate(cursor, optionsPopulate);

        return cursor;
    }
    populate(cursor, optionsPopulate) {
        if (!Array.isArray(optionsPopulate)) return cursor.populate(optionsPopulate);

        optionsPopulate.forEach((options) => cursor.populate(options));
        return cursor;
    }

    delete(query) {
        return this.collection.deleteMany(query).exec();
    }

    update(query, body) {
        return this.collection.update(query, body, { multi:true }).exec();
    }
};
