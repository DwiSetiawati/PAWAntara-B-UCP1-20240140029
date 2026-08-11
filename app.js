// app.js
// Ini adalah "pintu masuk" aplikasi. Semua konfigurasi server dikumpulkan di sini.
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const requestLogger = require("./middleware/logger");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// ---- View Engine ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---- Middleware bawaan Express ----
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---- Session (untuk fitur login) ----
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 jam
    },
  })
);

// Supaya semua view (termasuk partial navbar) tahu status login user,
// tanpa harus manual passing di tiap res.render()
app.use((req, res, next) => {
  res.locals.isLoggedIn = !!(req.session && req.session.isLoggedIn);
  next();
});

// ---- Middleware custom ----
app.use(requestLogger);

// ---- Static files ----
app.use(express.static(path.join(__dirname, "public")));

// ---- Routing ----
app.use("/", webRoutes);
app.use("/api", apiRoutes);

// Route API (response JSON), semua diawali /api
app.use("/api", apiRoutes);

// ---- 404 handler untuk route yang benar-benar tidak dikenal ----
app.use((req, res) => {
  res.status(404).send("404 - Halaman tidak ditemukan");
});

app.listen(PORT, () => {
  console.log(`Server Toko Sembako Ariesta berjalan di http://localhost:${PORT}`);
});
