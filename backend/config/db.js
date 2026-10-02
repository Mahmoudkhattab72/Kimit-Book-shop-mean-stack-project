const { MongoClient } = require("mongodb");

// Single place for collection names. If your data lives in a collection with
// a different name (check MongoDB Compass), change it here only.
const COLLECTIONS = {
  users: "users",
  products: "products",
};

let client;
let db;

const connectDB = async () => {
  // Read env values here (not at require time) so dotenv is already loaded
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.DB_NAME || "bookshop-e-commerce-app";

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  // Unique email index prevents duplicate accounts even under race conditions
  try {
    await db
      .collection(COLLECTIONS.users)
      .createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.warn(
      "Could not create the unique email index (duplicate emails already exist?):",
      error.message
    );
  }

  console.log(`Connected to MongoDB database "${dbName}"`);
};

const getDb = () => {
  if (!db) {
    throw new Error("Database is not connected. Call connectDB() first.");
  }
  return db;
};

module.exports = { connectDB, getDb, COLLECTIONS };