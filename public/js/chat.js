// public/js/chat.js
document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");

  if (!chatForm) return;

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // FR-17: cegah reload halaman

    const pertanyaan = chatInput.value.trim();

    // Validasi dasar: jangan kirim pesan kosong
    if (!pertanyaan) {
      return;
    }

    addBubble(pertanyaan, "user");
    chatInput.value = "";

    // Bubble sementara "sedang mengetik..." biar terasa responsif
    const typingBubble = addBubble("Mengetik...", "bot");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pertanyaan }),
      });
      const data = await res.json();

      if (data.status === "success") {
        typingBubble.textContent = data.data.reply;
      } else {
        typingBubble.textContent = data.message || "Maaf, terjadi kesalahan.";
      }
    } catch (err) {
      typingBubble.textContent = "Gagal terhubung ke server, coba lagi ya.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
