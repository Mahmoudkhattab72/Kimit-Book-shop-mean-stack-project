const { ObjectId } = require("mongodb");
const { getDb, COLLECTIONS } = require("../config/db");

const users = () => getDb().collection(COLLECTIONS.users);

// Soft-deleted users are hidden from every "active" query
const activeFilter = { isDeleted: { $ne: true } };

const insert = async (user) => {
  return users().insertOne({
    ...user,
    isDeleted: false,
    createdAt: new Date(),
  });
};

// Finds a user by any filter, including soft-deleted users.
// Used for the duplicate-email check on signup.
const selectOne = async (filter) => {
  return users().findOne(filter);
};

// Finds a non-deleted user. Used for login so deleted accounts cannot sign in.
const selectActiveOne = async (filter) => {
  return users().findOne({ ...filter, ...activeFilter });
};

const selectAll = async () => {
  return users().find(activeFilter).toArray();
};

// Returns { _id } of the updated user, or null if no active user matches
const updateData = async (userId, newUser) => {
  return users().findOneAndUpdate(
    { _id: new ObjectId(userId), ...activeFilter },
    { $set: newUser },
    { projection: { _id: 1 } }
  );
};

const deleteUserById = async (userId) => {
  return users().updateOne(
    { _id: new ObjectId(userId), ...activeFilter },
    { $set: { isDeleted: true, deletedAt: new Date() } }
  );
};

const recover = async (userId) => {
  return users().updateOne(
    { _id: new ObjectId(userId), isDeleted: true },
    { $set: { isDeleted: false }, $unset: { deletedAt: "" } }
  );
};

module.exports = {
  insert,
  selectOne,
  selectActiveOne,
  selectAll,
  updateData,
  deleteUserById,
  recover,
};