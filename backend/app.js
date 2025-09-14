const express = require("express");
const app = express();
const morgan = require("morgan");
const usersRouter = require("./routes/users")
const userCartRouter = require("./routes/user-cart")
app.use(express.json());
app.use(morgan("dev"));
app.use("/user-images", express.static('./upload'));
app.use("/users", usersRouter)
app.use("/user/cart", userCartRouter)
module.exports = app;