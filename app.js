// app.js
// Ini adalah "pintu masuk" aplikasi. Semua konfigurasi server dikumpulkan di sini.

const express = require("express");
const path = require("path");

const requestLogger = require("./middleware/logger");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// ---- View Engine ----
// Kita pakai EJS supaya bisa render HTML dinamis dari data server (bukan HTML statis).
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---- Middleware bawaan Express ----
// Supaya bisa membaca data form (application/x-www-form-urlencoded) dan JSON body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---- Middleware custom (FR-08) ----
// Mencatat setiap request yang masuk ke terminal
app.use(requestLogger);

// ---- Static files ----
// File CSS/JS/gambar di folder public/ bisa diakses langsung lewat browser
// Contoh: public/css/style.css -> diakses di /css/style.css
app.use(express.static(path.join(__dirname, "public")));

// ---- Routing ----
// Route halaman (render EJS)
app.use("/", webRoutes);

// Route API (response JSON), semua diawali /api
app.use("/api", apiRoutes);

// ---- 404 handler untuk route yang benar-benar tidak dikenal ----
app.use((req, res) => {
  res.status(404).send("404 - Halaman tidak ditemukan");
});

app.listen(PORT, () => {
  console.log(`Server Toko Sembako Ariesta berjalan di http://localhost:${PORT}`);
});
