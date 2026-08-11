document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("productContainer");
  const filterForm = document.getElementById("filterForm");
  const kategoriSelect = document.getElementById("kategori");
  const searchInput = document.getElementById("search");
  const resetBtn = document.getElementById("resetFilterBtn");

  const urlParams = new URLSearchParams(window.location.search);
  const kategoriDariUrl = urlParams.get("kategori") || "";
  const searchDariUrl = urlParams.get("search") || "";
  searchInput.value = searchDariUrl;
});
