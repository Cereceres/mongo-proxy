module.exports = userModel => async (name, pass) => {
  const query = {
    name, pass: new Buffer(pass).toString('base64'),
  };

  const user = await userModel.findOne(query);

  return user;
};
