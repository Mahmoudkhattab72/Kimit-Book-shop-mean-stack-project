const router = require("express").Router();
const controller = require("../controllers/user-cart");
const auth = require("../middleware/auth");

// Mounted in app.js as: app.use("/user/cart", router)
// The cart belongs to the logged-in user, so a valid token is required.
router.get("/", auth, controller.select);

module.exports = router;