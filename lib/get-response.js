module.exports = (collection, method = 'GET', query = {}, body = {}) => {
    let promise = Promise.resolve();
    console.log('por obtener la promesa', promise, method, body);
    if (method === 'GET') promise = collection.find(query);
    else if (method === 'POST') promise = collection.create(body);
    else if (method === 'DELETE') promise = collection.delete(query);
    else if (method === 'PUT') promise = collection.update(query, body, { new: true });
    console.log('por obtener la promesa ====', promise, method);

    return promise.then((items = []) => {
        console.log('items =', items);
        if (Array.isArray(items)) return items.map((item) => item.toOject());
        return items;
    });
};
