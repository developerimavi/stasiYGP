# Design System — Homepage Paroki YGP (v2)

Rancangan ini mengambil **hanya gaya visual dan animasi** dari artifact "Animasi
Frontend Homepage Stasi YGP". Seluruh struktur yang sudah ada tetap dipakai apa
adanya.

**Aturan dasar rancangan ini:**

- Semua komponen existing tetap dipakai — `HeroSlider`, `MassScheduleSection`,
  `AnnouncementSection`, `LatestArticlesSection`, `LiturgicalTodayCard`,
  `WelcomeModal`. Tidak ada yang dibuang atau diganti.
- Semua query dan data existing tetap dipakai. Tidak ada perubahan skema
  database, tidak ada kolom baru.
- Susunan section homepage tidak berubah.
- Yang diambil dari artifact **hanya**: palet warna, tipografi, ritme spasi,
  dan animasi.
- Data contoh di artifact (jadwal misa, nama stasi, teks hero) **diabaikan** —
  itu hanya placeholder. Data asli sudah benar dan tetap dipakai.

---

## 1. Arah desain

Sekarang situs memakai gaya *terang, lembut, kartu-kartu hijau-krem*. Artifact
mengusulkan arah yang berbeda: **gelap, sinematik, tenang** — teks serif besar,
banyak ruang kosong, aksen emas tipis, dan gerak yang halus (bukan ramai).

| | Sekarang | Usulan artifact |
|---|---|---|
| Latar | krem terang (`#fdfcf9`) | malam hangat (`#0F0C09`) |
| Aksen | hijau paroki + emas | emas tunggal (`#C8A567`) |
| Judul | Fraunces | Cormorant Garamond (300, italic untuk penekanan) |
| Body | Plus Jakarta | Karla |
| Layout | kartu ber-shadow di grid | baris berpembatas garis tipis, full-bleed |
| Gerak | nyaris tidak ada | reveal saat scroll, parallax, veil pembuka |

Rekomendasi: **terapkan arah baru hanya pada homepage** dulu. Halaman dalam
(artikel, wilayah, profil) tetap seperti sekarang, supaya perubahan bisa dinilai
tanpa membongkar seluruh situs.

---

## 2. Token

### Warna

```css
--ink:        #0F0C09;  /* latar utama (gelap) */
--ink-soft:   #171310;  /* teks di atas latar terang */
--paper:      #EDE7DC;  /* latar terang / teks di atas gelap */
--accent:     #C8A567;  /* emas — garis, angka, penekanan */
--accent-ink: #8A6A2E;  /* emas gelap, dipakai di atas latar terang */
```

Opasitas yang dipakai berulang (jangan bikin nilai baru tanpa alasan):

```
teks di atas gelap    : rgba(237,231,220, .62)  body
                        rgba(237,231,220, .55)  eyebrow
                        rgba(237,231,220, .42)  caption
                        rgba(237,231,220, .08)  garis pembatas
teks di atas terang   : rgba(23,19,16, .55)     body
                        rgba(23,19,16, .35)     nomor urut
                        rgba(23,19,16, .14)     garis pembatas
hover baris (terang)  : rgba(200,165,103, .14)
```

Empat pilihan aksen yang disediakan artifact bila ingin diganti:
`#C8A567` (emas) · `#A8552F` (terakota) · `#8C8271` (taupe) · `#6E7F6A` (sage).

### Tipografi

```
Display : 'Cormorant Garamond', serif — weight 300
Body    : 'Karla', sans-serif
```

| Peran | Ukuran | Detail |
|---|---|---|
| Hero H1 | `clamp(48px, 5.6vw, 92px)` | `line-height:.96`, `letter-spacing:-.015em` |
| Section H2 | `clamp(36px, 4.4vw, 64px)` | `line-height:1.02`, `max-width:16ch` |
| Jam / angka besar | `38px` display | angka diberi warna `--accent-ink` |
| Body | `16px` / `line-height:1.75` | `max-width:40ch` |
| Body kecil | `14px` / `line-height:1.8` | `max-width:32ch` |
| Eyebrow | `10–11px` | `letter-spacing:.3em–.42em`, uppercase |

Eyebrow selalu uppercase + tracking lebar; itu satu-satunya elemen yang
"berteriak". Sisanya dibiarkan tenang.

### Ruang & garis

```
padding section   : 130px 56px   (desktop)
max-width konten  : 1240px
gap grid          : 32px
pembatas          : 1px solid <warna .12–.14 alpha>
```

Tidak ada `border-radius` dan **tidak ada shadow** di arah baru ini — kedalaman
dibangun lewat kontras dan garis, bukan kartu melayang. Ini perbedaan paling
besar dari tampilan sekarang.

---

## 3. Motion

Semua durasi dikalikan variabel `--m` supaya tempo bisa disetel global:

```
Pelan 1.35   Sedang 1 (default)   Cepat 0.7
```

Easing yang dipakai:

```
masuk / reveal   cubic-bezier(.22, 1, .36, 1)   — cepat lalu melambat
veil / wipe      cubic-bezier(.78, 0, .22, 1)   — tegas di dua ujung
hover            cubic-bezier(.4, 0, .2, 1)
```

### Keyframes

| Nama | Fungsi |
|---|---|
| `veilUp` | tirai pembuka naik ke atas (`translateY(-101%)`) |
| `wipeIn` | tirai transisi antar-halaman naik dari bawah |
| `lineUp` | baris judul naik dari balik mask (`118%` → `0`) |
| `fadeUp` | naik 22px sambil muncul |
| `fadeIn` | muncul tanpa gerak |
| `hairline` / `hairlineY` | garis tumbuh dari kiri / atas |
| `photoReveal` | foto hero tersingkap |
| `zoomOut` | foto mengendur dari sedikit ter-zoom |
| `cueDrop` | panah "scroll" turun-naik berulang |
| `emberPulse` | titik aksen berdenyut pelan |

### Urutan pembuka (angka sebelum dikali `--m`)

```
0ms      tirai krem menutup layar, logo + garis muncul
1400ms   tirai krem naik
1520ms   tirai gelap naik  → hero terlihat
1600ms   eyebrow + garis hero
1700ms   baris judul 1     ─┐
1820ms   baris judul 2      ├ jeda 120ms antar baris
1940ms   baris judul 3     ─┘
2180ms   paragraf hero
1900ms   header
2700ms   state veil dimatikan
```

### Reveal saat scroll

`IntersectionObserver` pada `threshold: 0.18`. Elemen awal:
`opacity:0; transform:translateY(26px)`. Saat masuk viewport diberi transisi
`700ms` dengan delay bertingkat `index * 80ms`, lalu observer dilepas
(sekali jalan, tidak animasi ulang saat scroll balik).

### Parallax (desktop, `> 900px`)

Satu `requestAnimationFrame` loop, peredaman `0.08` — bukan mengikuti kursor
mentah, tapi menyusul dengan lembut:

```
foto hero   : x = -mouse,  y = scroll*0.30 - mouse
glow        : marginTop = scroll*-0.12 + mouse*1.4
teks hero   : x = mouse*0.35, y = scroll*0.14,
              opacity = 1 - scroll/620   (memudar saat scroll)
nav shell   : opacity 1 saat scroll > 80px (latar blur muncul)
```

Rentang mouse: ±28px horizontal, ±18px vertikal. Di layar ≤900px parallax mati
total.

### Aksesibilitas

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 1ms !important;
      animation-delay: 0ms !important;
      transition-duration: 1ms !important; }
}
```

Wajib ada. Semua animasi di atas hanya dekorasi — halaman harus tetap terbaca
penuh tanpanya.

---

## 4. Peta gaya artifact → komponen existing

Komponen di kolom tengah **tidak diganti** — hanya diberi gaya dan animasi baru.
Data di kolom kanan sudah benar dan tidak disentuh.

| Gaya dari artifact | Diterapkan pada (tetap) | Sumber data (tetap) |
|---|---|---|
| Hero (foto + judul + parallax) | `HeroSlider` | `getHeroSlides()` |
| Baris jadwal berpembatas | `MassScheduleSection` | `getAllMassSchedules()` |
| Blok kutipan tenang | `LiturgicalTodayCard` | `getEffectiveToday()` |
| Kartu warta | `AnnouncementSection`, `LatestArticlesSection` | `getLatestAnnouncements(3)`, `getLatestArticles(6)` |
| — | `WelcomeModal` | `getWelcomeSlides()` |
| Section "Kontak" & "Motion spec" | *tidak dipakai* | — |

Dua section terakhir artifact memang tidak punya padanan di homepage kita:
"Kontak" sudah ada di footer, dan "Motion spec" hanya halaman dokumentasi
internal artifact. Keduanya diabaikan.

Modal sambutan (`WelcomeModal`) tidak ada di artifact — pertahankan seperti
sekarang, tampilkan setelah tirai pembuka selesai (± 2700ms × `--m`) supaya
tidak bertabrakan.

### Catatan penting per section

**Jadwal** — artifact menampilkan baris datar bernomor (`01`, `02`, …) dengan
hover menggeser padding kiri. Versi kita sudah dikelompokkan per kapel
(IMAVI / YGP), dan itu **harus dipertahankan** karena mencerminkan data
sebenarnya. Terapkan gaya barisnya, tapi tetap dalam dua kelompok.

**Hero** — artifact memakai satu foto statis dengan parallax. Kita memakai
slider multi-slide. Pertahankan slider; terapkan parallax hanya pada slide
yang sedang aktif, dan `photoReveal` saat slide berganti.

**Countdown misa** — artifact punya hitung mundur ke misa berikutnya, tapi itu
dihitung dari jadwal hard-coded miliknya. Data kita menyimpan `day_label`
sebagai teks bebas ("Senin – Kamis", "3rd Saturday", "Jumat Pertama"), yang
tidak bisa dihitung tanpa menebak-nebak. Karena rancangan ini tidak menambah
kolom baru, **fitur countdown tidak diambil**. Sisa gaya section jadwal tetap
dipakai.

---

## 5. Urutan pengerjaan yang disarankan

1. **Token dulu** — masukkan palet, dua font, dan `--m` ke `globals.css`.
   Belum mengubah tampilan apa pun.
2. **Hero** (`HeroSlider`) — dampak visual terbesar. Termasuk tirai pembuka.
3. **Reveal on scroll** — satu hook `useReveal()` yang dipakai semua section.
4. **Jadwal** (`MassScheduleSection`) — kartu jadi baris, pengelompokan kapel
   tetap.
5. **Kalender liturgi** (`LiturgicalTodayCard`) — jadi blok kutipan tenang.
6. **Warta** (`AnnouncementSection`, `LatestArticlesSection`) — paling ringan,
   terakhir.

Setiap langkah bisa dinilai dan di-*rollback* sendiri-sendiri.

---

## 6. Hal yang perlu diputuskan sebelum mulai

- **Gelap total atau campur?** Arah artifact gelap sepenuhnya. Situs sekarang
  terang dan sudah dikenal jemaat — perlu keputusan apakah homepage boleh
  berbeda jauh dari halaman dalamnya.
- **Ganti font?** Cormorant + Karla menggantikan Fraunces + Plus Jakarta.
  Ini mengubah karakter seluruh situs bila diterapkan global.
- **Header dua baris** yang baru dibuat ("Gereja Katolik / Paroki Yohanes
  Gabriel Perboyre") perlu disesuaikan warnanya untuk latar gelap.
- **Tirai pembuka** muncul tiap kali halaman dibuka. Pertimbangkan menyimpan
  penanda di `sessionStorage` agar hanya tampil sekali per kunjungan —
  kalau tidak, akan terasa lambat bagi pengunjung yang sering kembali.
