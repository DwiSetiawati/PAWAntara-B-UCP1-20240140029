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

const defaultReply =
  "Maaf, saya belum paham pertanyaan itu. Coba tanya soal jam buka, ongkir, cara pembayaran, atau stok produk ya!";

function findReply(pertanyaan) {
  const teks = pertanyaan.toLowerCase();

  const semuaProduk = productModel.getAll();
  const produkDitemukan = semuaProduk.find((p) =>
    teks.includes(p.name.toLowerCase().split(" ")[0].toLowerCase())
  );

  if (produkDitemukan && (teks.includes("harga") || teks.includes("berapa"))) {
    return `${produkDitemukan.name} harganya Rp ${produkDitemukan.price.toLocaleString(
      "id-ID"
    )}, stok tersedia ${produkDitemukan.stock}.`;
  }

  const aturanCocok = rules.find((rule) =>
    rule.keywords.some((kw) => teks.includes(kw))
  );

  return aturanCocok ? aturanCocok.reply : defaultReply;
}

function chat(req, res) {
  const { pertanyaan } = req.body;

  if (!pertanyaan || pertanyaan.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Pertanyaan tidak boleh kosong",
    });
  }

  const reply = findReply(pertanyaan);

  res.status(200).json({
    status: "success",
    data: { reply },
  });
}

module.exports = { chat };
