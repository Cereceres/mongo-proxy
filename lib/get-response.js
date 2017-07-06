module.exports = (collection, method = 'GET', query = {}, body = {}) => {
    let promise = Promise.resolve();
    console.log('method, query, body in getResponse= ', method, query, body);
    if (method === 'GET') promise = collection.find(query);
    else if (method === 'POST') promise = collection.create(body);
    else if (method === 'DELETE') promise = collection.delete(query);
    else promise = collection.update(query, body, { new: true });
    console.log('promise', promise);

    return promise.then((items = []) => {
        console.log('items in getResponse = ', items);
        if (Array.isArray(items)) return items.map((item) => item.toObject());
        return items;
    })
};