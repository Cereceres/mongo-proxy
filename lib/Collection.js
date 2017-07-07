module.exports = class {
    constructor(collection) {
        this.collection = collection;
    }

    create(data) {
        return this.collection.create(data);
    }

    find(query) {
        return this.collection.find(query).exec();
    }

    delete(query) {
        return this.collection.deleteMany(query).exec();
    }

    update(query, body) {
        return this.collection.update(query, body, { multi:true }).exec();
    }
};
