const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient;
const url = "mongodb://127.0.0.1:27017/"
const connection = new MongoClient(url);
const db = connection.db("kimit-e-commerce-app");
const usersCollection = db.collection("users");

const select = async() => {
    const userCart = await usersCollection.aggregate([
        {
    $lookup:{
      from: "products",
      localField:"cart",
      foreignField: "_id",
      as:"products"
    }
},
  {
    $project: {
      cart:false
    }
  },{
  $limit: 4
  },
  {
    $sort: {
      name: 1
    }
  }
    ]).toArray()
return userCart
}
module.exports = {select};