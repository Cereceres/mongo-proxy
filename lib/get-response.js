module.exports = async function(collection, method = 'GET', query = {}, body = {}) {
    let items = {};
    if (method === 'GET') items = await collection.find(query);
    else if (method === 'POST') items = await collection.create(body);
    else if (method === 'DELETE') items = await collection.delete(query);
    else items = await collection.update(query, body, { new: true });

    if (Array.isArray(items)) items = items.map((item) => item.toObject());
    return { query: items };
};
