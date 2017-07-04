const Mongo = require('mongoose');
Mongo.Promise = global.Promise;

module.exports = (url) => {
    console.log('url1 ==', url);
    Mongo.connect(url, { useMongoClient: true });

    console.log('url2 ==', url);

    Mongo.connection.on('connected', () => {
        console.log(`Mongo default connection open to ${ url}`);
    });
    console.log('url3 ==', url);

    Mongo.connection.on('error', (err) => {
        console.log(`Mongo default connection error: ${ err}`);
    });
    console.log('url4 ==', url);

    Mongo.connection.on('disconnected', () => {
        console.log('Mongo default connection disconnected');
    });
    console.log('url5 ==', url);

    process.on('SIGINT', () => {
        Mongo.connection.close(() => {
            console.log('Mongo default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return Mongo;
};
