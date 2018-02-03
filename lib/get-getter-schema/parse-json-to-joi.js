const joi = require('joi');
const { keys } = Object;
const parser = module.exports = (_json) => {
    const json = !_json.__$type ? { __$properties:_json } : _json;
    const{
        __$type,
        __$properties,
        __$required = [],
        __$items = [],
        __$options = {}
    } = json;
    const required = new Set(__$required);
    let schema = typeof joi[__$type] === 'function' ? joi[__$type]() : _json;

    if (schema.keys && __$properties) schema = schema
        .keys(
            keys(__$properties)
                .reduce((store, prop) => {
                    if (!__$properties[prop]) return store;

                    store[prop] = parser(__$properties[prop]);

                    if (required.has(prop)) store[prop].required();
                    return store;
                }, {})
        );

    if (schema.items) schema = schema.items(__$items.map(parser));

    schema = keys(__$options).reduce((_schema, option) => {
        if (typeof _schema[option] === 'function') _schema = _schema[option](__$options[option]);

        return _schema;
    }, schema);

    return schema;
};


