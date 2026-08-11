const userModel = require("../models/userModel");

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username dan password wajib diisi",
    });
  }

  const valid = userModel.validateCredentials(username, password);

  if (!valid) {
    return res.status(401).json({
      status: "error",
      message: "Username atau password salah",
    });
  }

  req.session.isLoggedIn = true;
  req.session.username = username;

  res.status(200).json({
    status: "success",
    message: "Login berhasil",
  });
}