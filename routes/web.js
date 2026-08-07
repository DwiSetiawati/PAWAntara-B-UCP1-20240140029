// routes/web.js
// Semua route yang me-render HALAMAN (EJS), bukan API JSON.
// Kita pakai express.Router() supaya route rapi terpisah dari app.js utama.

const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET / -> Beranda: hero section + preview beberapa produk (misal 3 produk pertama)
router.get("/", (req, res) => {
  const previewProducts = products.slice(0, 3);
  res.render("index", {
    title: "Beranda - Toko Sembako Ariesta",
    previewProducts,
  });
});

// GET /produk -> daftar semua produk, mendukung filter lewat query string
// Contoh: /produk?kategori=sembako  atau  /produk?search=beras
router.get("/produk", (req, res) => {
  const { kategori, search } = req.query;
  let hasil = products;

  if (kategori) {
    hasil = hasil.filter(
      (p) => p.category.toLowerCase() === kategori.toLowerCase()
    );
  }

  if (search) {
    hasil = hasil.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Ambil daftar kategori unik untuk ditampilkan sebagai filter di halaman
  const kategoriList = [...new Set(products.map((p) => p.category))];

  res.render("produk", {
    title: "Produk - Toko Sembako Ariesta",
    products: hasil,
    kategoriList,
    kategoriAktif: kategori || "",
    searchAktif: search || "",
  });
});

// GET /produk/:id -> detail 1 produk berdasarkan id di URL (route dinamis)
router.get("/produk/:id", (req, res) => {
  // req.params.id selalu berupa string, makanya di-convert ke Number dulu
  const id = Number(req.params.id);
  const produk = products.find((p) => p.id === id);

  // Kalau id tidak valid / produk tidak ada, JANGAN biarkan server crash.
  // Tetap render halaman yang sama, tapi produk-nya null -> EJS akan
  // menampilkan pesan "Produk tidak ditemukan" (lihat views/produk-detail.ejs)
  res.render("produk-detail", {
    title: produk ? produk.name : "Produk Tidak Ditemukan",
    produk: produk || null,
  });
});

// GET /tanya-ai -> tampilan chat + form (logic balasan baru dikerjakan di Sprint 2)
router.get("/tanya-ai", (req, res) => {
  res.render("tanya-ai", {
    title: "Tanya AI - Toko Sembako Ariesta",
  });
});

module.exports = router;
