module.exports = (userModel) => async(name, pass) => {
    const query = {
        name, pass: new Buffer(pass, 'base64').toString()
    };

    console.log('query ', query);
    const user = await userModel.findOne(query);

    return user;
};
