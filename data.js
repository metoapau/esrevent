/**
 * ESR EVENT - Central Data Store & Synchronization Engine
 * Automatically handles persistence via localStorage with default seed data.
 */

const DEFAULT_SITE_DATA = {
  hero: {
    badge: "TÜRKİYE'NİN EN İDDİALI PARTİ VE ETKİNLİK DENEYİMİ",
    titleLine1: "Sıradanlığı Unutun.",
    titleHighlight: "Gecenin Ritmini",
    titleLine2: "ve Anları Tasarlıyoruz.",
    subtitle: "ESR Event; konsept partiler, devasa müzik festivalleri, lüks VIP kutlamalar ve sıra dışı prodüksiyonlarla hayallerinizi yaşayan birer efsaneye dönüştürür.",
    metrics: [
      { value: "500+", label: "Başarılı Organizasyon", color: "from-purple-400 to-pink-400" },
      { value: "85.000+", label: "Katılımcı Enerjisi", color: "from-pink-400 to-amber-300" },
      { value: "45+", label: "A-List Sanatçı & DJ", color: "from-cyan-400 to-purple-400" },
      { value: "%100", label: "Kusursuz Memnuniyet", color: "from-amber-300 to-pink-500" }
    ]
  },
  featuredEvent: {
    badge: "Sıradaki Mega Etkinlik",
    title: "ESR NEON HORIZON",
    subtitle: "Rooftop Electronic Session",
    description: "İstanbul Boğazı manzaralı ikonik terasta; uluslararası DJ lineup, lazer tünelleri, imza miksoloji kokteylleri ve 360 derece görsel şovlarla dolu benzersiz bir gece.",
    date: "24 Ekim 2026",
    time: "22:00",
    venue: "The Sky Club Rooftop, İstanbul",
    lineup: "DJ MARCO V & Special Guests",
    capacityPercent: 88,
    capacityText: "%88 Dolu (Son 12 Loca)",
    targetDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  portfolio: [
    {
      id: "ev-1",
      title: "Cyber Neon Rave",
      category: "party",
      categoryLabel: "Konsept Parti",
      subtitle: "Hangar Sessions #04",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      stats: "2.500+ Katılımcı • 5 DJ • Lazer Tüneli",
      description: "İstanbul'un en büyük endüstriyel hangarında gerçekleştirilen, 40 metrelik UV neon LED tüneli ve uluslararası DJ lineup ile unutulmaz bir gece."
    },
    {
      id: "ev-2",
      title: "Sunset Waves Festival",
      category: "festival",
      categoryLabel: "Festival",
      subtitle: "Bodrum Sahil Etabı",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
      stats: "6.000+ Katılımcı • 2 Sahne • Co2 & Ateş Şovu",
      description: "Bodrum sahilinde gün batımından sabaha kadar kesintisiz müzik, iki ayrı elektronik sahne ve özel plaj lounges."
    },
    {
      id: "ev-3",
      title: "Velvet Yacht Soirée",
      category: "vip",
      categoryLabel: "VIP Davet",
      subtitle: "İstanbul Boğazı",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      stats: "120 VIP Davetli • Özel Yat & Helikopter • Miksoloji Bar",
      description: "Lüks mega yatta Boğaz boyunca uzanan özel gün batımı kutlaması, canlı caz-sax performansı ve şampanya barları."
    },
    {
      id: "ev-4",
      title: "NextGen Summit & Gala",
      category: "corporate",
      categoryLabel: "Kurumsal Gala",
      subtitle: "Swissôtel The Bosphorus",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      stats: "800 Davetli • 360 Sahne • Canlı Sanatçı",
      description: "Teknoloji holdingi için tasarlanan interaktif fütüristik gala gecesi, holografik lansman şovları ve ödül seremonisi."
    },
    {
      id: "ev-5",
      title: "Pure White Oasis",
      category: "party",
      categoryLabel: "Konsept Parti",
      subtitle: "Çeşme Marina",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      stats: "1.800 Katılımcı • Beyaz Konsept • Akrobasi Şovu",
      description: "Tüm konukların beyaz giyindiği dev havuz başı partisi; su üstü yüzen sahneler, ateş şovları ve gece boyu house müzik."
    },
    {
      id: "ev-6",
      title: "Secret Villa Afterhours",
      category: "vip",
      categoryLabel: "VIP Özel Kutlama",
      subtitle: "Yalıkavak / Bodrum",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80",
      stats: "75 Seçkin Konuk • Özel Villa • Infinity Pool",
      description: "Bodrum tepelerindeki ultra lüks malikanede gün doğumuna kadar süren özel kutlama, imza şef tatları ve özel DJ seti."
    }
  ],
  contact: {
    phone: "+90 (532) 123 45 67",
    email: "info@esrevent.com",
    whatsapp: "905321234567",
    instagram: "esrevent",
    address: "Levent, İstanbul • Yalıkavak, Bodrum • Alaçatı, Çeşme"
  }
};

const STORAGE_KEY = 'esr_event_data_v1';

// Public API for fetching and storing site data
window.ESR_STORE = {
  get() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error, using defaults:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
  },
  
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('esr_data_updated', { detail: data }));
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('esr_data_updated', { detail: DEFAULT_SITE_DATA }));
    return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
  }
};
