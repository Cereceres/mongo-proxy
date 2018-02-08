module.exports = (collection, plainObject) => (query, options = {}) => {
    const {
        sort,
        limit
    } = options;
    let Query = collection
        .find(query)
        .sort(sort || { _id:'1' });

    if (limit > 0) Query = Query.limit(options.limit);

    return plainObject(Query.lean().exec());
};
