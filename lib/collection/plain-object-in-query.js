module.exports = (promise) => promise
    .then((_items) => {
        const items = Array.isArray(_items) ? _items : [ _items ];
        return items
            .map((record) => {
                if (!record._id) return record;

                record._id = record._id.toString();
                return record;
            });
    }
    );
