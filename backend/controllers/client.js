const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/client");

const SALT_ROUNDS = 10;

// ---------- Helpers ----------
// Request bodies are already validated and cleaned by validation/client.js

const isValidId = (id) => /^[a-f\d]{24}$/i.test(id);

const sendInvalidId = (response) =>
  response.status(400).json({ status: "error", message: "Invalid user id" });

// Never send the password hash to the client
const toPublicUser = (user) => {
  const { password, ...publicUser } = user;
  return publicUser;
};

// Removes the photo saved by multer when the signup is rejected
const removeUploadedFile = (request) => {
  if (request.file) fs.unlink(request.file.path, () => {});
};

// ---------- Controllers ----------
// Express 5 forwards rejected promises to the error handler automatically,
// so there is no need for try/catch in every controller.

const add = async (request, response) => {
  const { name, email, password, address, city } = request.body;

  const existingUser = await usersModel.selectOne({ email });
  if (existingUser !== null) {
    removeUploadedFile(request);
    return response.status(409).json({
      status: "error",
      message: `Email ${email} already exists`,
    });
  }

  const user = {
    name,
    email,
    address,
    city,
    imageName: request.newFileName, // set by the multer middleware
    password: await bcrypt.hash(password, SALT_ROUNDS),
    // Always "user" on signup. Admins are set manually in the database.
    role: "user",
  };

  const insertResult = await usersModel.insert(user);
  return response.status(201).json(insertResult);
};

const select = async (request, response) => {
  const users = await usersModel.selectAll();
  return response.status(200).json(users.map(toPublicUser));
};

const update = async (request, response) => {
  const userId = request.params.id;
  if (!isValidId(userId)) return sendInvalidId(response);

  const { email } = request.body;
  if (email) {
    const existingUser = await usersModel.selectOne({ email });
    if (existingUser !== null && !existingUser._id.equals(userId)) {
      return response.status(409).json({
        status: "error",
        message: `Email ${email} already exists`,
      });
    }
  }

  const updateResult = await usersModel.updateData(userId, request.body);
  if (updateResult === null) {
    return response
      .status(404)
      .json({ status: "error", message: `User ${userId} not found` });
  }

  return response
    .status(200)
    .json({ status: "ok", message: `User ${userId} updated` });
};

const deleteUsers = async (request, response) => {
  const userId = request.params.id;
  if (!isValidId(userId)) return sendInvalidId(response);

  const deleteResult = await usersModel.deleteUserById(userId);
  if (deleteResult.modifiedCount === 0) {
    return response
      .status(404)
      .json({ status: "error", message: `User ${userId} not found` });
  }

  return response
    .status(200)
    .json({ status: "ok", message: `User ${userId} deleted` });
};

const recover = async (request, response) => {
  const userId = request.params.id;
  if (!isValidId(userId)) return sendInvalidId(response);

  const recoverResult = await usersModel.recover(userId);
  if (recoverResult.modifiedCount === 0) {
    return response
      .status(404)
      .json({ status: "error", message: `User ${userId} not found` });
  }

  return response
    .status(200)
    .json({ status: "ok", message: `User ${userId} recovered` });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await usersModel.selectActiveOne({ email });

  // Same message for "email not found" and "wrong password"
  // so attackers cannot find out which emails are registered
  const isPasswordCorrect =
    user !== null && (await bcrypt.compare(password, user.password));

  if (!isPasswordCorrect) {
    return response
      .status(401)
      .json({ status: "error", message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return response.status(200).json({ status: "ok", token });
};

module.exports = {
  select,
  add,
  update,
  deleteUsers,
  recover,
  login,
};