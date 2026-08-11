const productModel = require("../models/productModel");

function getAllProducts(req, res) {
  const { kategori, search } = req.query;
  const data = productModel.getAll({ kategori, search });

  res.status(200).json({
    status: "success",
    data,
  });
}

function getProductById(req, res) {
  const id = Number(req.params.id);
  const produk = productModel.getById(id);

  if (!produk) {
    return res.status(404).json({
      status: "error",
      message: "Produk tidak ditemukan",
    });
  }

  res.status(200).json({
    status: "success",
    data: produk,
  });
}