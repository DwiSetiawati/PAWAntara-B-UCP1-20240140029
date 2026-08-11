function requireLoginPage(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  return res.redirect("/login");
}

function requireLoginApi(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  return res.status(401).json({
    status: "error",
    message: "Unauthorized, silakan login terlebih dahulu",
  });
}
