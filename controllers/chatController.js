const productModel = require("../models/productModel");

const rules = [
  {
    keywords: ["jam buka", "buka jam", "jam operasional", "tutup jam"],
    reply: "Toko kami buka setiap hari jam 07.00 - 20.00!",
  },
  {
    keywords: ["ongkir", "antar", "diantar", "kirim ke rumah", "delivery"],
    reply:
      "Bisa antar untuk area sekitar toko. Ongkir menyesuaikan jarak, silakan konfirmasi alamat lewat WhatsApp toko ya!",
  },
  {
    keywords: ["bayar", "pembayaran", "transfer", "cod", "qris"],
    reply:
      "Pembayaran bisa lewat cash (COD), transfer bank, atau QRIS. Fleksibel kok!",
  },
  {
    keywords: ["stok", "tersedia", "ada ga", "ada gak", "ready"],
    reply:
      "Untuk cek stok produk tertentu, coba kunjungi halaman Produk kami ya, datanya selalu ter-update!",
  },
  {
    keywords: ["halo", "hai", "hi", "pagi", "siang", "malam"],
    reply: "Halo juga! Ada yang bisa saya bantu seputar produk toko kami?",
  },
  {
    keywords: ["makasih", "terima kasih", "thanks"],
    reply: "Sama-sama! Senang bisa membantu.",
  },
];
