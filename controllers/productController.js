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

function createProduct(req, res) {
  const { name, category, price, stock } = req.body;

  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({
      status: "error",
      message: "Field name, category, price, dan stock wajib diisi",
    });
  }

  if (isNaN(Number(price)) || isNaN(Number(stock))) {
    return res.status(400).json({
      status: "error",
      message: "Price dan stock harus berupa angka",
    });
  }

  const namaKapital = name.charAt(0).toUpperCase() + name.slice(1);
  const produkBaru = productModel.create({ name: namaKapital, category, price, stock });

  res.status(201).json({
    status: "success",
    message: "Produk ditambahkan",
    data: produkBaru,
  });
}

function updateProduct(req, res) {
  const id = Number(req.params.id);
  const { name, category, price, stock } = req.body;

  const priceInvalid = price !== undefined && isNaN(Number(price));
  const stockInvalid = stock !== undefined && isNaN(Number(stock));

  if (priceInvalid || stockInvalid) {
    return res.status(400).json({
      status: "error",
      message: "Price dan stock harus berupa angka",
    });
  }
  const namaKapital = name.charAt(0).toUpperCase() + name.slice(1);
  const produk = productModel.update(id, { name: namaKapital, category, price, stock });

  if (!produk) {
    return res.status(404).json({
      status: "error",
      message: "Produk tidak ditemukan",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Produk diperbarui",
    data: produk,
  });
}