// Authorization middlewares. They must run AFTER the auth middleware,
// because they read request.user.

const forbidden = (response) =>
  response.status(403).json({
    status: "error",
    message: "You do not have permission to perform this action",
  });

// Only users with role "admin"
const adminOnly = (request, response, next) => {
  if (request.user?.role !== "admin") return forbidden(response);
  return next();
};

// Admins, or the owner of the account (:id in the URL is the logged-in user)
const adminOrSelf = (request, response, next) => {
  const isAdmin = request.user?.role === "admin";
  const isOwner = request.user?.id === request.params.id;
  if (isAdmin || isOwner) return next();
  return forbidden(response);
};

module.exports = { adminOnly, adminOrSelf };