module.exports = (userModel) => async(name, pass) => {
    const query = {
        name, pass: new Buffer(pass, 'base64').toString()
    };

    const user = await userModel.findOne(query);

    return user;
};
