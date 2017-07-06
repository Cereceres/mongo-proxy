const instancePropertySchema = require('./instance-property-schema');

const validateProperty = module.exports = (item, itemSchema) => {
    console.log('item, itemSchema ', item, itemSchema);
    const hasMixOptions = Object.keys(itemSchema) && typeof itemSchema !== 'function';
    if(hasMixOptions) return instancePropertySchema(item, itemSchema.type);
    return instancePropertySchema(item, itemSchema);
};
