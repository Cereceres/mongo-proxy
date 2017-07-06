const instancePropertySchema = module.exports = (item, propertySchema) => {
    console.log('item, propertySchema = ', item, propertySchema);
    if(typeof propertySchema === 'undefined' || propertySchema === null) return propertySchema;
    let mapped = undefined;
    if(typeof propertySchema === 'function') mapped = propertySchema(item);
    mapped = mapped || propertySchema.constructor(item);
    console.log('mapped = ', mapped);
    return mapped;
};
