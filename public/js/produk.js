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

  function renderProducts(products) {
    if (products.length === 0) {
      container.innerHTML =
        '<p class="empty-state">Tidak ada produk yang cocok dengan filter kamu.</p>';
      return;
    }

    container.innerHTML = products
      .map(
        (p) => `
        <article class="product-card">
          <h3>${escapeHtml(p.name)}</h3>
          <p class="product-category">${escapeHtml(p.category)}</p>
          <p class="product-price">Rp ${p.price.toLocaleString("id-ID")}</p>
          <p class="product-stock">Stok: ${p.stock}</p>
          <a href="/produk/${p.id}" class="btn-secondary">Lihat Detail</a>
        </article>
      `
      )
      .join("");
  }

  filterForm.addEventListener("submit", function (e) {
    e.preventDefault(); // FR-17: cegah reload halaman
    loadProducts();
  });

  resetBtn.addEventListener("click", function () {
    filterForm.reset();
    loadProducts();
  });

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});
