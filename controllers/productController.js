const productModel = require("../models/productModel");

function getAllProducts(req, res) {
  const { kategori, search } = req.query;
  const data = productModel.getAll({ kategori, search });

  res.status(200).json({
    status: "success",
    data,
  });
}