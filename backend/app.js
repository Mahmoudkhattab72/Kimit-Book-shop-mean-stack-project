const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/client");
const userCartRouter = require("./routes/user-cart");

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/user-images", express.static(path.join(__dirname, "upload")));
app.use("/client", userRouter);
app.use("/user/cart", userCartRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

module.exports = app;