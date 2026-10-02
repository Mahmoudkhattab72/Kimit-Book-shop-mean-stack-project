const fs = require("fs");
const joi = require("joi");

// ---------- Reusable rules ----------
// Letters (any language) and spaces, e.g. "Ahmed K Ali"
const nameRule = joi
  .string()
  .trim()
  .min(3)
  .max(50)
  .pattern(/^[\p{L} ]+$/u);

// Lowercased so "User@Mail.com" and "user@mail.com" are the same account
const emailRule = joi.string().trim().lowercase().email().max(100);

// ---------- Schemas ----------
const signupSchema = joi.object({
  name: nameRule.required(),
  email: emailRule.required(),
  password: joi.string().min(8).max(64).required(),
  address: joi.string().trim().min(3).max(100).required(),
  city: joi.string().trim().min(2).max(50).required(),
});

// Every field is optional, but at least one must be sent.
// "role" and "password" are not allowed here on purpose.
const updateSchema = joi
  .object({
    name: nameRule,
    email: emailRule,
    address: joi.string().trim().min(3).max(100),
    city: joi.string().trim().min(2).max(50),
  })
  .min(1);

// No length rules on login, so we do not reveal how accounts are validated
const loginSchema = joi.object({
  email: emailRule.required(),
  password: joi.string().required(),
});

// ---------- Middleware factory ----------
const validateBody = (schema) => (request, response, next) => {
  const { error, value } = schema.validate(request.body ?? {}, {
    abortEarly: false, // report all problems at once
    stripUnknown: true, // drop fields that are not in the schema
  });

  if (error) {
    // The photo was already saved by multer, so remove it
    if (request.file) fs.unlink(request.file.path, () => {});

    return response.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  // Controllers only see the cleaned data (trimmed, lowercased, no extra fields)
  request.body = value;
  return next();
};

module.exports = {
  addUserValidation: validateBody(signupSchema),
  updateUserValidation: validateBody(updateSchema),
  loginValidation: validateBody(loginSchema),
};