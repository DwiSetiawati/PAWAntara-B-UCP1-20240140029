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

  loadKategoriOptions(kategoriDariUrl).then(() => {
    loadProducts();
  });

  async function loadKategoriOptions(kategoriAktif) {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      const kategoriUnik = [...new Set(data.data.map((p) => p.category))];

      kategoriUnik.forEach((k) => {
        const option = document.createElement("option");
        option.value = k;
        option.textContent = k;
        if (k === kategoriAktif) option.selected = true;
        kategoriSelect.appendChild(option);
      });
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
    }
  }

  async function loadProducts() {
    container.innerHTML = '<p class="empty-state">Memuat produk...</p>';

    const kategori = kategoriSelect.value;
    const search = searchInput.value.trim();

    const params = new URLSearchParams();
    if (kategori) params.set("kategori", kategori);
    if (search) params.set("search", search);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      renderProducts(data.data);

      const newUrl = params.toString() ? `/produk?${params.toString()}` : "/produk";
      window.history.replaceState({}, "", newUrl);
    } catch (err) {
      container.innerHTML =
        '<p class="empty-state">Gagal memuat produk. Coba refresh halaman.</p>';
    }
  }
});
