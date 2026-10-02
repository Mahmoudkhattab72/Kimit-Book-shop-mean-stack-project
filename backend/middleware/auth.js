const jwt = require("jsonwebtoken");

// Checks the "Authorization: Bearer <token>" header.
// On success the decoded payload ({ id, name, email, role }) is available
// as request.user for the next middlewares and controllers.
const auth = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response
      .status(401)
      .json({ status: "error", message: "Token not provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify() checks the signature and the expiry date.
    // (jwt.decode() only reads the payload and trusts anything.)
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return response.status(401).json({ status: "error", message });
  }
};

module.exports = auth;