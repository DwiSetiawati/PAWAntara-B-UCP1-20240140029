const productModel = require("../models/productModel");

function renderBeranda(req, res) {
  const previewProducts = productModel.getAll().slice(0, 3);
  res.render("index", {
    title: "Beranda - Toko Sembako Ariesta",
    previewProducts,
  });
}

function renderProdukPage(req, res) {
  res.render("produk", {
    title: "Produk - Toko Sembako Ariesta",
  });
}