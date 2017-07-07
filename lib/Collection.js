module.exports = class {
    constructor(collection) {
        this.collection = collection;
    }

    create(data) {
        return new this.collection(data).save();
    }

    find(query) {
        return this.collection.find(query).exec();
    }

    delete(query) {
        return new Promise((resolve, reject) => {
            this.collection.deleteMany(query, (error, res) => {
                if(error) return reject(error);
                resolve(res);
            });
        });
    }

    update(query, body) {
        return new Promise((resolve, reject) => {
            this.collection.update(query, body, { multi:true }, (error, res) => {
                if(error) return reject(error);
                resolve(res);
            });
        });
    }
};
