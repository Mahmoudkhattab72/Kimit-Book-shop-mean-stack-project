
const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient;
const url = "mongodb://127.0.0.1:27017/"
const connection = new MongoClient(url);

const db = connection.db("kimit-e-commerce-app");
const usersCollection = db.collection("users");

const insert = async (user) => {
    const insertResult = await usersCollection.insertOne(user);
    return insertResult;
};
const select = async () => {
    const users = await usersCollection.find().toArray();
    return users;
};
const deleteCourse = async (userId) => {
    const deleteResult = await usersCollection.deleteOne({
        _id: new mongoDB.ObjectId(userId),
    });
    return deleteResult;
};
const update = (userId, newUser) => {
    const updateResult = usersCollection.replaceOne(
        {
            _id: new mongoDB.ObjectId(userId),
        },
        {
            ...newUser,
        }
    );
    return updateResult;
};
const updateData = async (userId, newUser) => {
    const updateResult = await usersCollection.findOneAndUpdate(
        {
        _id: new mongoDB.ObjectId(userId)
    },
    {
        $set:{
            ...newUser,
        }
    }
);return updateResult;
};
const selectOne = async (filter) => {
    const user = await usersCollection.findOne(filter);
    return user;
};
const selectAll = async () => {
    const users = await usersCollection.find({
        isDeleted: {$ne: true},
    }).toArray();
    return users;
};
const deleteUserById = async (userId) => {
   const deleteResult = await usersCollection.updateOne(
    {
        _id: new mongoDB.ObjectId(userId),
    },
    {
        $set: {
            isDeleted: true,
        },
    }
);
    return deleteResult;
};

const recover = async (userId) =>{
    const recoverResult = await usersCollection.updateOne({
        _id: new mongoDB.ObjectId(userId)
    },
    {
        $set: {
            isDeleted: false,
        }
    });
    return recoverResult;
    };
module.exports = {
    insert,
    select,
    deleteCourse,
    update,
    updateData,
    selectOne,
    selectAll,
    deleteUserById,
    recover,
};