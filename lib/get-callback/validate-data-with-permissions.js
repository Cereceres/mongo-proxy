const { keys } = Object;

const mapMethodAction = new Map([
    [ 'DELETE', '__$remove' ],
    [ 'GET', '__$get' ],
    [ 'POST', '__$create' ],
    [ 'PUT', '__$update' ],
]);

const thereAreMoreKeys = require('./there-are-more-keys');
const actions = new Set(mapMethodAction.values());

const validate = module.exports = (data, permissions = {}, method = 'GET') => {
    console.log('data ', data);
    console.log('permissions ', permissions);
    const action = mapMethodAction.get(method);
    return keys(data).reduce((red, prop) => {
        if (permissions[prop] && permissions[prop][action]) red[prop] = data[prop];

        if (permissions[prop] === '__$all') {
            red[prop] = data[prop];
            return red;
        }
        console.log('red[prop] ', red[prop]);

        const isDeepObject = typeof red[prop] === 'object' && !Array.isArray(red[prop]);
        if (isDeepObject && thereAreMoreKeys(keys(red[prop]), actions)) red[prop] = validate(
            red[prop],
            permissions[prop],
            method
        );
        console.log('red ', red);
        return red;
    }, {});
};
