const path = require('path');

module.exports = () => require('yargs')
    .locale('en')
    .alias('h', 'host')
    .alias('s', 'start')
    .alias('p', 'port')
    .alias('gd', 'get-db')
    .alias('gum', 'get-user-model')
    .alias('gsm', 'get-schema-model')
    .alias('gc', 'get-collection')
    .describe('host', 'Host\'url with basic auth to use')
    .describe('gd', 'Path to get-database')
    .describe('gum', 'Path to get-user-model')
    .describe('gsm', 'Path to get-schema-model')
    .describe('gc', 'Path to get-collection-model-thunk')
    .describe('port', 'Host\'port')
    .describe('start', 'Start the server')
    .default('host', 'mongodb://localhost:27017/test')
    .default('port', '8080')
    .boolean('start')
    .string([ 'host', 'port', 'gd', 'gc', 'gum', 'gsm' ])
    .coerce('gd', (gd) => {
        if (gd === true) gd = './';
        return path.resolve(process.cwd(), gd);
    })
    .coerce('gum', (gum) => {
        if (gum === true) gum = './';
        return path.resolve(process.cwd(), gum);
    })
    .coerce('gsm', (gsm) => {
        if (gsm === true) gsm = './';
        return path.resolve(process.cwd(), gsm);
    })
    .coerce('gc', (gc) => {
        if (gc === true) gc = './';
        return path.resolve(process.cwd(), gc);
    })
    .help('help')
    .argv;
