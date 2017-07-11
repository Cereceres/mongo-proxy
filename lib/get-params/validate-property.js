const instancePropertySchema = require('./instance-property-schema');
const { isArray } = Array;

const mapper = (itemSchema) => (_item, i) => validateProperty(_item, itemSchema[i % itemSchema.length]);

const validateProperty = module.exports = (item, itemSchema) => {
    const isArrayIterable = isArray(itemSchema) && itemSchema.length && isArray(item);

    if (isArrayIterable) return item.map(mapper(itemSchema));


    console.log('item, itemSchema ', item, itemSchema);
    const hasMixOptions = Object.keys(itemSchema).length && typeof itemSchema !== 'function';
    if(hasMixOptions) return instancePropertySchema(item, itemSchema.type);
    return instancePropertySchema(item, itemSchema);
};

