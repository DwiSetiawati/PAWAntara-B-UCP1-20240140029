# Toko Sembako Ariesta — Website & REST API

**Nama : Dwi Setiawati** 
**NIM : 20240140029** 
**Kelas : B** 

## Link Render
https://pawantara-b-ucp1-20240140029.onrender.com

## Deskripsi Singkat

Website toko sembako untuk UMKM "Toko Sembako Ariesta" milik Ibu Aries. Dibangun
dengan Node.js + Express.js (pola MVC: models/controllers/routes/views),
menggunakan EJS sebagai view engine. Menyediakan REST API CRUD produk lengkap
dengan autentikasi login admin berbasis session, serta fitur "Tanya AI" berupa
logika balasan dummy (keyword matching) yang diproses di backend — bukan API
AI pihak ketiga.

- **Sprint 1**: struktur halaman, styling responsif, server Express dasar, endpoint baca data.
- **Sprint 2**: REST API CRUD penuh, login admin (session + bcrypt), dashboard admin, fitur chat interaktif via Fetch API.

## Cara Menjalankan Project Secara Lokal

1. Install dependencies:
   ```bash
   npm install
   ```
2. Salin `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Isi `.env` dengan kredensial admin. Untuk membuat hash password baru:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('password_kamu', 10))"
   ```
   lalu tempel hasilnya ke `ADMIN_PASSWORD_HASH` di `.env`.
3. Jalankan server (mode development, auto-restart pakai nodemon):
   ```bash
   npm run dev
   ```
   atau jalankan biasa:
   ```bash
   npm start
   ```
4. Buka browser ke `http://localhost:3000`

**Kredensial admin untuk pengecekan (default):**
- Username: `admin`
- Password: `admin123`

## Struktur Folder (Pola MVC)

```
toko-sembako-ariesta/
├── app.js                    -> entry point server (setup Express, session, routing)
├── .env / .env.example       -> konfigurasi rahasia (kredensial admin, session secret)
├── .gitignore                -> konfigurasi untuk menyembunyikan file/folder sensitif
├── models/                   -> "Model": sumber data & logic data
│   ├── productModel.js         -> data produk in-memory + fungsi CRUD
│   └── userModel.js             -> validasi kredensial admin (bcrypt)
├── controllers/               -> "Controller": logic request/response
│   ├── pageController.js        -> render halaman EJS
│   ├── authController.js        -> login & logout
│   ├── productController.js     -> REST API CRUD produk
│   └── chatController.js        -> logic balasan dummy Tanya AI
├── middleware/
│   ├── logger.js                -> mencatat tiap request ke terminal
│   └── auth.js                  -> proteksi halaman & endpoint (session-based)
├── routes/                    -> "Route": pemetaan URL ke controller
│   ├── web.js                    -> route halaman
│   └── api.js                     -> route REST API
├── views/                     -> "View": template EJS
│   ├── partials/navbar.ejs & footer.ejs
│   ├── index.ejs, produk.ejs, produk-detail.ejs, tanya-ai.ejs
│   ├── login.ejs, dashboard.ejs
└── public/
    ├── css/style.css
    └── js/ (main.js, produk.js, login.js, dashboard.js, chat.js)
```

## Daftar Endpoint API

| Method | Endpoint | Deskripsi | Akses |
|---|---|---|---|
| POST | `/api/login` | Login admin/kasir dengan username & password | Publik |
| POST | `/api/logout` | Logout, menghapus sesi login | Login |
| GET | `/api/products` | Ambil semua produk (mendukung `?kategori=` & `?search=`) | Publik |
| GET | `/api/products/:id` | Ambil 1 produk berdasarkan ID | Publik |
| POST | `/api/products` | Tambah produk baru | Login |
| PUT | `/api/products/:id` | Update produk (harga/stok/nama/kategori) | Login |
| DELETE | `/api/products/:id` | Hapus produk | Login |
| POST | `/api/chat` | Kirim pertanyaan, terima balasan AI dummy | Publik |

Semua response API mengikuti format konsisten `{ status, message?, data? }`.
Endpoint yang butuh login akan menolak request tanpa sesi login dengan
response `{ "status": "error", "message": "Unauthorized, silakan login terlebih dahulu" }` dan HTTP status `401`.

## Penjelasan Tampilan (UI)

- **Navbar**: sticky, menu berubah otomatis — menampilkan "Login Admin" untuk pengunjung biasa, atau "Dashboard" + "Logout" kalau sudah login. Hamburger menu aktif di layar mobile (< 768px).
- **Beranda**: hero section + preview 3 produk terlaris (server-rendered dari model).
- **Produk (publik)**: halaman ini mengambil data produk secara dinamis lewat Fetch API ke `GET /api/products`, termasuk filter kategori & pencarian nama — semua tanpa reload halaman.
- **Detail Produk**: route dinamis `/produk/:id`, menampilkan pesan "Produk Tidak Ditemukan" untuk ID yang tidak valid/tidak ada.
- **Login**: form username & password dengan validasi dasar di frontend, mengirim request lewat Fetch API ke `POST /api/login`. Sesi login disimpan lewat cookie (express-session).
- **Dashboard** (hanya bisa diakses setelah login): form tambah/edit produk serta tabel produk yang bisa diedit/dihapus, semuanya lewat Fetch API tanpa reload halaman. Kalau sesi login habis di tengah jalan, sistem otomatis mengarahkan kembali ke halaman login.
- **Tanya AI**: chat bubble interaktif, mengirim pertanyaan ke `POST /api/chat` dan menampilkan balasan dari backend secara dinamis di DOM.

## Screenshot Aplikasi

**1. Halaman Beranda & Katalog Produk**  
*(Tampilan utama untuk pembeli)*  
<img width="1920" height="1080" alt="Halaman Beranda" src="https://github.com/user-attachments/assets/69dfa161-e357-4dcc-ba26-a2e5ed69d41f" />
<img width="1920" height="1080" alt="Katalog Produk" src="https://github.com/user-attachments/assets/c690dfe2-f70b-4755-a0b7-92ca42b98f5a" />

**2. Halaman Login & Dashboard Admin**  
*(Sistem manajemen produk dengan autentikasi)*  
<img width="1920" height="1080" alt="Halaman Login" src="https://github.com/user-attachments/assets/7a56ef10-213f-4ea3-9c97-f1dba6b50060" />
<img width="1920" height="1080" alt="Dashboard Admin" src="https://github.com/user-attachments/assets/c7f3eee0-25e3-4a5f-a247-cf6432ea76fc" />

**3. Fitur Interaktif Tanya AI**  
*(Fitur chat dengan respon otomatis dari sistem)*  
<img width="1920" height="1080" alt="Tanya ai" src="https://github.com/user-attachments/assets/ed22c8bc-aa0b-4bc2-bd45-ec1670e9ad49" />

**4. Tampilan Responsif (Mobile View)**  
*(Menu navigasi dan tata letak yang menyesuaikan layar HP)*  
<img width="1920" height="1080" alt="responsif" src="https://github.com/user-attachments/assets/b0c840d3-615e-499d-bbf0-bf2801ad0b61" />

## Keamanan & Validasi

- Password admin disimpan sebagai **hash bcrypt** (bukan plain text), dan disimpan di `.env` (tidak ikut ter-push ke Git).
- Semua endpoint mutasi produk (POST/PUT/DELETE) diverifikasi status login-nya **di server** lewat middleware `requireLoginApi` — bukan cuma disembunyikan di frontend, sehingga tetap ditolak walau di-hit langsung lewat Postman tanpa login.
- Validasi input dilakukan di **dua sisi**: di frontend (JS) untuk mencegah submit form kosong/tidak valid demi UX, dan di backend (controller) sebagai penjaga terakhir sebelum data disimpan.
