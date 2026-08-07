// routes/api.js
// Route khusus REST API (response-nya JSON, bukan halaman HTML).
// Sprint 1: baru GET /api/products (read-only).
// Sprint 2: baru ditambah GET /:id, POST, PUT, DELETE + proteksi login.

const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /api/products -> kembalikan seluruh data produk dalam format JSON konsisten
// Format response mengikuti kontrak di PRD Bagian 7: { status, data }
router.get("/products", (req, res) => {
  res.status(200).json({
    status: "success",
    data: products,
  });
});

module.exports = router;
