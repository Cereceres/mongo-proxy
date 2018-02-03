const Mongo = require('mongoose');
Mongo.Promise = global.Promise;
module.exports = (url) => {
    if (Mongo.connection.readyState) return Mongo;

    Mongo.connect(url);
    Mongo.connection.on('connected', () => console.log(`Mongo default connection open to ${ url}`));
    Mongo.connection.on('error', (err) => console.log(`Mongo default connection error: ${ err}`));
    Mongo.connection.on('disconnected', () => console.log('Mongo default connection disconnected'));
    process.on('SIGINT', () => {
        Mongo.connection.close(() => {
            console.log('Mongo default connection disconnected through app termination');
            process.exit(0);
        });
    });
    return Mongo;
};
