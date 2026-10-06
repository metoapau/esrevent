# ESR EVENT - Premium Etkinlik & Parti Organizasyon Web Sitesi

**ESR Event** için özel olarak tasarlanmış, gece hayatı, festivaller, VIP kutlamalar ve lüks etkinlik prodüksiyonlarına hitap eden fütüristik ve göz alıcı web sitesi.

---

## 🌟 Öne Çıkan Özellikler ve Tasarım Detayları

1. **İlk Bakışta Büyüleyen Görsel Deneyim (Hero & Atmosfer)**:
   - **İnteraktif Partikül Ağı (`canvas`):** Fare hareketine duyarlı, neon renklerde bağlanan canlı partiküller.
   - **Karanlık Lüks / Gece Hayatı Estetiği:** Derin obsidian arka plan, cam (glassmorphism) paneller, neon pembe, mor ve turkuaz ışıltılar.
   - **Fare Işık Efekti (Cursor Spotlight):** Kullanıcının imlecini takip eden yumuşak neon projektör aurası.
   - **Canlı Sayaçlar:** 500+ Başarılı Etkinlik, 85.000+ Katılımcı, %100 Memnuniyet.

2. **🎵 Dahili Web Audio Ambiyans Synthesizer**:
   - Harici müzik dosyasına ihtiyaç duymadan, Web Audio API ile gerçek zamanlı derin deep-house akorları üreten ambiyans müzik motoru.
   - Navbar üzerindeki **"Ambiyans Sesi"** butonundan tek tıkla açılıp kapatılabilir.

3. **⚡ Parti Modu (Party Mode Toggle)**:
   - Navbar'daki şimşek ikonu tıklandığında ekran lazer flaşıyla aydınlanır ve dinamik parti ışık modu devreye girer.

4. **⏳ Yaklaşan Mega Etkinlik & Canlı Geri Sayım (Countdown Timer)**:
   - *ESR NEON HORIZON Rooftop Session* için gün, saat, dakika ve saniye geri sayımı.
   - VIP Kapasite doluluk göstergesi (%88 Dolu).
   - Tek tıkla VIP masa / loca rezervasyon talep penceresi (Modal).

5. **🛠️ "Hayalindeki Partiyi Yarat" - İnteraktif Parti Sihirbazı & Fiyat Hesaplayıcı**:
   - **Adım 1:** Etkinlik Türü (Konsept Parti, Açık Hava Festivali, VIP Özel Davet, Kurumsal Gala).
   - **Adım 2:** Katılımcı Sayısı (30 kişiden 2.500+ kişiye dinamik kaydırma çubuğu).
   - **Adım 3:** Ekstra Prodüksiyon (DJ & Ses, 360 LED Sahne, Lazerler, Kokteyl Barı, Dansçılar, 4K Drone).
   - **Adım 4:** Mekan Durumu.
   - Canlı bütçe tahmin aralığı hesaplar ve **"WhatsApp İle Bu Teklifi İlet"** butonu ile tüm seçimleri hazır mesaj olarak WhatsApp'a aktarır!

6. **📸 Filtrelenebilir Portföy & Lightbox Galeri**:
   - Kategoriler: *Tümü, Partiler, Festivaller, VIP Kutlamalar, Kurumsal*.
   - Her etkinliğe tıklandığında açılan yüksek çözünürlüklü detay modalı, katılımcı istatistikleri ve doğrudan teklif butonu.

7. **📱 %100 Mobil ve Tablet Uyumlu**:
   - Modern cam tasarımlı mobil çekmece menü (drawer navigation).
   - Dokunmatik ekran optimizasyonu.

8. **📬 Hızlı Teklif & Rezervasyon Formu**:
   - Bildirim tostları (Toast notifications).
   - Kurumsal iletişim, sosyal medya bağlantıları ve SSS akordeon bölümü.

---

## 🚀 Nasıl Çalıştırılır?

Hiçbir derleme aracına (Node.js/npm) ihtiyaç duymaz!

1. Dosya yöneticisinden `C:\Users\monster\.gemini\antigravity\scratch\esr-event\index.html` dosyasına çift tıklayarak doğrudan Chrome, Edge veya istediğiniz tarayıcıda açabilirsiniz.
2. Ya da yerel sunucu ile açmak isterseniz:
   ```powershell
   cd C:\Users\monster\.gemini\antigravity\scratch\esr-event
   python -m http.server 3000
   ```
   Ardından tarayıcınızdan `http://localhost:3000` adresine gidebilirsiniz.

---

## 📁 Dosya Yapısı

- `index.html`: Ana web sayfası şablonu, semantik yapılar ve Tailwind CDN bileşenleri.
- `styles.css`: Özel cam (glassmorphism), neon gradient, partikül ve animasyon stilleri.
- `script.js`: Ses sentezleyici, parçacık tuvali, geri sayım, filtreleme, fiyat sihirbazı ve modal mantığı.
- `README.md`: Proje dokümantasyonu.
