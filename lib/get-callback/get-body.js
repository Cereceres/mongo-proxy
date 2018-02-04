module.exports = (req) => new Promise((resolve, reject) => {
    const _chunk = [];
    req.on('error', reject)
        .on('data', (chunk) => _chunk.push(chunk))
        .on('end', () => {
            const body = Buffer.concat(_chunk).toString();
            resolve(body);
        });
});
