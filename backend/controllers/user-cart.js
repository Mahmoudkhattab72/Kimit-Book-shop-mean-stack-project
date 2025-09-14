const model =require("../models/user-cart")
const select = async (request, response) => {
    const userCart = await model.select();
    response.status(200).json(userCart);
};

module.exports = {
    select
};