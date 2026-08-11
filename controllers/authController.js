const userModel = require("../models/userModel");

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username dan password wajib diisi",
    });
  }
}
