const router = require("express").Router();
const controller = require("../controllers/client");
const auth = require("../middleware/auth");
const { adminOnly, adminOrSelf } = require("../middleware/authorize");
const { uploadUserPhoto } = require("../middleware/upload");
const validationMW = require("../validation/client");

// Mounted in app.js as: app.use("/client", router)

// ---------- Public routes ----------
router.post(
  "/signup",
  uploadUserPhoto,
  validationMW.addUserValidation,
  controller.add
);
router.post("/login", validationMW.loginValidation, controller.login);

// ---------- Protected routes ----------
// List all users: admin only
router.get("/", auth, adminOnly, controller.select);
// Update or delete an account: the owner or an admin
router.put(
  "/:id",
  auth,
  adminOrSelf,
  validationMW.updateUserValidation,
  controller.update
);
router.delete("/:id", auth, adminOrSelf, controller.deleteUsers);
// Recover a deleted account: admin only (deleted users cannot log in)
router.patch("/:id", auth, adminOnly, controller.recover);

module.exports = router;