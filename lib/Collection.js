module.exports = class {
    constructor(collection) {
        this.collection = collection;
    }

    create(data) {
        console.log('to create data', data);
        try {
            return new Promise((resolve, reject) => {
                console.log('dentro de la promesa ==', data, this.collection);
                return new this.collection(data).save((error, res) => {
                    console.log('dentro de create', error, res);
                    if(error) return reject(error);
                    resolve(res);
                });
            });
        } catch (error) {
            console.log('error catched ==', error);
            return Promise.reject(error);
        }
    }

    find(query) {
        return new Promise((resolve, reject) => {
            this.collection.find(query, (error, res) => {
                if(error) return reject(error);
                resolve(res);
            });
        });
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
            this.updateMany(query, body, (error, res) => {
                if(error) return reject(error);
                resolve(res);
            });
        });
    }
};
