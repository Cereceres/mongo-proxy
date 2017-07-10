const statusDefault = 200;

module.exports = (res, status = statusDefault) => (_data = {}) => {
    const data = _data || {};
    console.log('res of query ====', data);
    res.writeHead(status, { 'Content-Type': 'application/json' });

    const { query: $data = {}, next:$next } = data;
    const response = { $data: $data };

    if($next) response.$next = $next;

    res.end(JSON.stringify(response));
};
