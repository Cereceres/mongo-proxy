module.exports = (collection, method = 'GET', query = {}, body = {}) => {
    let promise = {};

    if (method === 'GET') promise = collection.find(query);
    else if (method === 'POST') promise = collection.create(body);
    else if (method === 'DELETE') promise = collection.delete(query);
    else promise = collection.update(query, body, { new: true });

    return promise.then((items = []) => {
        if (Array.isArray(items)) return items.map((item) => item.toObject());
        return items;
    });
};
