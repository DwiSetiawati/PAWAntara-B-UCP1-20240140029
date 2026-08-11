const express = require("express");
const router = express.Router();

const pageController = require("../controllers/pageController");
const { requireLoginPage } = require("../middleware/auth");

router.get("/", pageController.renderBeranda);
router.get("/produk", pageController.renderProdukPage);
router.get("/produk/:id", pageController.renderProdukDetail);
router.get("/tanya-ai", pageController.renderTanyaAI);

router.get("/login", pageController.renderLogin);

router.get("/dashboard", requireLoginPage, pageController.renderDashboard);

module.exports = router;
