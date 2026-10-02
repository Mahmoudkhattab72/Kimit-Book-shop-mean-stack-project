require("dotenv").config();
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing in .env");
  process.exit(1);
}
const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start accepting requests
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });