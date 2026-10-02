const model = require("../models/user-cart");

// TODO: once the auth middleware is added, return only the cart of the
// logged-in user (request.user.id) instead of the whole collection.
const select = async (request, response) => {
  const userCart = await model.select();
  return response.status(200).json(userCart);
};

module.exports = {
  select,
};