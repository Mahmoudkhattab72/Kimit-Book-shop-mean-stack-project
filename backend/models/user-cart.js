const { ObjectId } = require("mongodb");
const { getDb, COLLECTIONS } = require("../config/db");

// Returns one user with the full product documents of their cart,
// or null if the user does not exist (or was deleted).
// Assumes users.cart is an array of product _id values.
const select = async (userId) => {
  const result = await getDb()
    .collection(COLLECTIONS.users)
    .aggregate([
      { $match: { _id: new ObjectId(userId), isDeleted: { $ne: true } } },
      {
        $lookup: {
          from: COLLECTIONS.products,
          localField: "cart",
          foreignField: "_id",
          as: "products",
        },
      },
      // Whitelist fields so the password hash is never returned
      { $project: { name: 1, email: 1, imageName: 1, products: 1 } },
    ])
    .toArray();

  return result[0] ?? null;
};

module.exports = { select };