module.exports = (port, models) => {
    const typeOfPort = typeof port;
    const typeOfModels = typeof models;
    const isValidPort = typeOfPort === 'string';
    const isValidModels = typeOfModels === 'object' && Object === models.constructor;

    if(!isValidPort || !isValidModels) throw new Error('Invalid Params');
};
