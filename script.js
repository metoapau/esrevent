/**
 * ESR EVENT - Modern Event & Party Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCursorSpotlight();
  initCountdown();
  initGalleryFilter();
  initEventPlanner();
  initAudioSynthesizer();
  initPartyMode();
  initMobileMenu();
  initModals();
  initToast();
});

/* ==========================================================================
   1. Interactive Particle Canvas (Neon Nightlife Ambient)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width < 768 ? 35 : 75, 80);

  const colors = [
    'rgba(168, 85, 247, 0.7)',  // purple
    'rgba(236, 72, 153, 0.7)',  // pink
    'rgba(6, 182, 212, 0.6)',   // cyan
    'rgba(245, 158, 11, 0.5)'   // gold
  ];

  let mouse = { x: -1000, y: -1000, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.2 + 0.8;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion / attraction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 2.5;
        this.y -= (dy / dist) * force * 2.5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Cursor Spotlight (Smooth Glowing Torch Effect)
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight || window.innerWidth < 768) return;

  let mouseX = -500;
  let mouseY = -500;
  let curX = -500;
  let curY = -500;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    spotlight.style.left = `${curX}px`;
    spotlight.style.top = `${curY}px`;
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. Featured Event & Data Sync Engine
   ========================================================================== */
let countdownInterval = null;

function renderDynamicContent() {
  if (!window.ESR_STORE) return;
  const data = window.ESR_STORE.get();

  // 1. Render Hero Texts & Metrics
  if (data.hero) {
    const badgeEl = document.getElementById('dynamic-hero-badge');
    const titleLine1El = document.getElementById('dynamic-hero-title-l1');
    const titleHighlightEl = document.getElementById('dynamic-hero-title-hl');
    const titleLine2El = document.getElementById('dynamic-hero-title-l2');
    const subtitleEl = document.getElementById('dynamic-hero-subtitle');

    if (badgeEl) badgeEl.innerText = data.hero.badge || "WE DON'T DO ORDİNARY";
    if (titleLine1El) titleLine1El.innerText = data.hero.titleLine1 || "Sıradanlığı Unutun.";
    if (titleHighlightEl) titleHighlightEl.innerText = data.hero.titleHighlight || "Gecenin Ritmini";
    if (titleLine2El) titleLine2El.innerText = data.hero.titleLine2 || "ve Anları Tasarlıyoruz.";
    if (subtitleEl) subtitleEl.innerText = data.hero.subtitle || "";

    if (data.hero.metrics) {
      data.hero.metrics.forEach((m, idx) => {
        const valEl = document.getElementById(`dynamic-metric-val-${idx}`);
        const labelEl = document.getElementById(`dynamic-metric-label-${idx}`);
        if (valEl) valEl.innerText = m.value;
        if (labelEl) labelEl.innerText = m.label;
      });
    }
  }

  // 2. Render Featured Upcoming Event
  if (data.featuredEvent) {
    const f = data.featuredEvent;
    const titleEl = document.getElementById('dynamic-feat-title');
    const subEl = document.getElementById('dynamic-feat-subtitle');
    const descEl = document.getElementById('dynamic-feat-desc');
    const dateEl = document.getElementById('dynamic-feat-date');
    const venueEl = document.getElementById('dynamic-feat-venue');
    const lineupEl = document.getElementById('dynamic-feat-lineup');
    const capBarEl = document.getElementById('dynamic-feat-cap-bar');
    const capTextEl = document.getElementById('dynamic-feat-cap-text');
    const rsvpBtn = document.querySelector('.open-rsvp-modal');

    if (titleEl) titleEl.innerText = f.title;
    if (subEl) subEl.innerText = f.subtitle;
    if (descEl) descEl.innerText = f.description;
    if (dateEl) dateEl.innerText = `${f.date} • ${f.time}`;
    if (venueEl) venueEl.innerText = f.venue;
    if (lineupEl) lineupEl.innerText = f.lineup;
    if (capTextEl) capTextEl.innerText = f.capacityText;
    if (capBarEl) capBarEl.style.width = `${f.capacityPercent || 88}%`;
    if (rsvpBtn) rsvpBtn.setAttribute('data-event', `${f.title}: ${f.subtitle}`);

    // Update Countdown target
    startCountdown(f.targetDate);
  }

  // 3. Render Portfolio & Gallery
  if (data.portfolio && Array.isArray(data.portfolio)) {
    renderPortfolioGallery(data.portfolio);
  }

  // 4. Contact sync
  if (data.contact) {
    const phoneLink = document.querySelector('a[href^="tel:"]');
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (phoneLink) {
      phoneLink.href = `tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`;
      const phoneSpan = phoneLink.querySelector('.font-bold');
      if (phoneSpan) phoneSpan.innerText = data.contact.phone;
    }
    if (emailLink) {
      emailLink.href = `mailto:${data.contact.email}`;
      const emailSpan = emailLink.querySelector('.font-bold');
      if (emailSpan) emailSpan.innerText = data.contact.email;
    }
  }
}

function startCountdown(targetISO) {
  if (countdownInterval) clearInterval(countdownInterval);

  let targetDate = targetISO ? new Date(targetISO) : new Date(Date.now() + 18 * 24 * 60 * 60 * 1000);

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

function renderPortfolioGallery(items) {
  const container = document.getElementById('dynamic-gallery-grid');
  if (!container) return;

  container.innerHTML = '';

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'gallery-item glass-panel rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300';
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-stats', item.stats);
    card.setAttribute('data-description', item.description);

    card.innerHTML = `
      <div class="relative h-64 sm:h-72 w-full img-zoom-wrapper">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <span class="gallery-tag absolute top-4 left-4 badge-neon text-[11px]">${item.categoryLabel || item.category}</span>
        <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <span class="text-xs text-pink-400 font-semibold block">${item.subtitle || ''}</span>
            <h3 class="text-lg font-bold text-white font-syne">${item.title}</h3>
          </div>
          <div class="w-8 h-8 rounded-full bg-purple-600/80 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          </div>
        </div>
      </div>
    `;

    // Attach click for lightbox
    card.addEventListener('click', () => {
      const content = `
        <div class="relative rounded-2xl overflow-hidden bg-slate-900 border border-purple-500/30">
          <div class="relative h-72 sm:h-96 w-full overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <span class="absolute top-4 left-4 badge-neon text-xs">${item.categoryLabel || item.category}</span>
          </div>
          <div class="p-6 sm:p-8 -mt-10 relative">
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-syne">${item.title}</h3>
            <p class="text-purple-400 text-sm font-semibold mb-4 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ${item.stats}
            </p>
            <p class="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">${item.description}</p>
            <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <a href="#planla" onclick="window.closeModal()" class="btn-primary py-2.5 px-6 text-sm">
                Benzer Bir Etkinlik Planla
              </a>
              <a href="https://wa.me/905321234567?text=${encodeURIComponent(`Merhaba! ${item.title} etkinliği gibi bir organizasyon hakkında bilgi almak istiyorum.`)}" target="_blank" class="btn-secondary py-2.5 px-6 text-sm">
                WhatsApp İle Bilgi Al
              </a>
            </div>
          </div>
        </div>
      `;
      if (window.openModal) window.openModal(content);
    });

    container.appendChild(card);
  });
}

function initCountdown() {
  renderDynamicContent();
  window.addEventListener('esr_data_updated', renderDynamicContent);
  window.addEventListener('storage', renderDynamicContent);
}

/* ==========================================================================
   4. Portfolio & Event Gallery Filtering
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white'));
      filterBtns.forEach((b) => b.classList.add('text-slate-300', 'bg-white/5'));

      btn.classList.add('active', 'bg-gradient-to-r', 'from-purple-600', 'to-pink-600', 'text-white');
      btn.classList.remove('text-slate-300', 'bg-white/5');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. "Hayalindeki Etkinliği Yarat" Interactive Planner & Cost Estimator
   ========================================================================== */
function initEventPlanner() {
  const form = document.getElementById('event-planner-form');
  if (!form) return;

  const eventTypeSelect = document.getElementById('plan-event-type');
  const guestCountInput = document.getElementById('plan-guests');
  const guestCountDisplay = document.getElementById('plan-guests-val');
  const serviceCheckboxes = document.querySelectorAll('.plan-service-cb');
  const venueSelect = document.getElementById('plan-venue');

  const estBudgetEl = document.getElementById('plan-estimated-budget');
  const summaryTypeEl = document.getElementById('plan-summary-type');
  const summaryGuestsEl = document.getElementById('plan-summary-guests');
  const summaryServicesCountEl = document.getElementById('plan-summary-services-count');
  const sendWhatsAppBtn = document.getElementById('plan-whatsapp-btn');

  // Base pricing models (EUR/TRY normalized representation)
  const basePrices = {
    'party': { base: 45000, perGuest: 320, name: 'Konsept Gece Partisi' },
    'festival': { base: 120000, perGuest: 250, name: 'Müzik Festivali & Açık Hava' },
    'vip': { base: 75000, perGuest: 650, name: 'VIP Özel Davet / Villa / Yat' },
    'corporate': { base: 90000, perGuest: 420, name: 'Kurumsal Gala & Lansman' }
  };

  const servicePrices = {
    'dj': 25000,
    'stage-led': 35000,
    'lasers': 20000,
    'cocktail': 28000,
    'dancers': 18000,
    'drone-media': 22000
  };

  function calculate() {
    const typeKey = eventTypeSelect.value || 'party';
    const typeData = basePrices[typeKey] || basePrices['party'];
    const guests = parseInt(guestCountInput.value, 10) || 150;

    if (guestCountDisplay) {
      guestCountDisplay.innerText = `${guests} Kişi`;
    }

    let extraServicesCost = 0;
    let selectedServices = [];

    serviceCheckboxes.forEach((cb) => {
      if (cb.checked) {
        const cost = servicePrices[cb.value] || 15000;
        extraServicesCost += cost;
        selectedServices.push(cb.getAttribute('data-label') || cb.value);
      }
    });

    let venueMultiplier = 1;
    if (venueSelect.value === 'esr-venue') venueMultiplier = 1.25;
    if (venueSelect.value === 'need-consulting') venueMultiplier = 1.1;

    const rawTotal = (typeData.base + (guests * typeData.perGuest) + extraServicesCost) * venueMultiplier;
    
    // Format range
    const minEst = Math.round(rawTotal * 0.9 / 1000) * 1000;
    const maxEst = Math.round(rawTotal * 1.15 / 1000) * 1000;

    const formattedRange = `${minEst.toLocaleString('tr-TR')} ₺ - ${maxEst.toLocaleString('tr-TR')} ₺`;

    if (estBudgetEl) estBudgetEl.innerText = formattedRange;
    if (summaryTypeEl) summaryTypeEl.innerText = typeData.name;
    if (summaryGuestsEl) summaryGuestsEl.innerText = `${guests} Katılımcı`;
    if (summaryServicesCountEl) summaryServicesCountEl.innerText = `${selectedServices.length} Ekstra Hizmet`;

    // WhatsApp Message URL Generator
    const venueText = venueSelect.options[venueSelect.selectedIndex].text;
    const msg = `Merhaba ESR Event Ekibi! 🥂 Web sitenizdeki Etkinlik Sihirbazı ile organizasyon planladım:\n\n` +
      `📌 Etkinlik Türü: ${typeData.name}\n` +
      `👥 Katılımcı: ${guests} Kişi\n` +
      `✨ Tercih Edilen Hizmetler: ${selectedServices.length > 0 ? selectedServices.join(', ') : 'Standart Paket'}\n` +
      `📍 Mekan Tercihi: ${venueText}\n` +
      `💳 Tahmini Bütçe Aralığı: ${formattedRange}\n\n` +
      `Tarih ve detayları görüşmek üzere randevu/teklif rica ediyorum.`;

    if (sendWhatsAppBtn) {
      sendWhatsAppBtn.href = `https://wa.me/905321234567?text=${encodeURIComponent(msg)}`;
    }
  }

  eventTypeSelect.addEventListener('change', calculate);
  guestCountInput.addEventListener('input', calculate);
  serviceCheckboxes.forEach((cb) => cb.addEventListener('change', calculate));
  venueSelect.addEventListener('change', calculate);

  // Initial calculation
  calculate();
}

/* ==========================================================================
   6. Ambient Deep-House Audio Synthesizer (Web Audio API)
   ========================================================================== */
function initAudioSynthesizer() {
  const toggleBtn = document.getElementById('ambient-sound-toggle');
  const soundWave = document.getElementById('sound-wave-icon');
  const soundText = document.getElementById('sound-btn-text');

  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let stepInterval = null;

  // Chord progression frequencies (F# minor - D - A - E deep house atmospheric chords)
  const chords = [
    [185.00, 220.00, 277.18, 370.00], // F#m7
    [146.83, 220.00, 293.66, 370.00], // Dmaj7
    [220.00, 277.18, 329.63, 440.00], // Amaj
    [164.81, 246.94, 329.63, 392.00]  // Em7
  ];

  function startGroove() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let chordIdx = 0;

    function playChord() {
      if (!isPlaying) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 1.2);
        filter.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 3.4);

        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 4.0);
      });

      // Subtle warm sub-bass pulse
      const subOsc = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(currentChord[0] / 2, audioCtx.currentTime);
      subGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      subOsc.connect(subGain);
      subGain.connect(audioCtx.destination);
      subOsc.start(audioCtx.currentTime);
      subOsc.stop(audioCtx.currentTime + 1.9);
    }

    playChord();
    stepInterval = setInterval(playChord, 3800);
  }

  function stopGroove() {
    if (stepInterval) {
      clearInterval(stepInterval);
      stepInterval = null;
    }
    if (audioCtx) {
      audioCtx.suspend();
    }
  }

  toggleBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      startGroove();
      if (soundWave) soundWave.classList.remove('sound-paused');
      if (soundText) soundText.innerText = 'Çalıyor (Durdur)';
      showToast('🎵 ESR Lounge Ambiyansı Başlatıldı', 'info');
    } else {
      stopGroove();
      if (soundWave) soundWave.classList.add('sound-paused');
      if (soundText) soundText.innerText = 'Ambiyans Sesi';
    }
  });
}

/* ==========================================================================
   7. Party Mode (Laser & Pulse Effects)
   ========================================================================== */
function initPartyMode() {
  const partyBtn = document.getElementById('party-mode-toggle');
  if (!partyBtn) return;

  let partyActive = false;

  partyBtn.addEventListener('click', () => {
    partyActive = !partyActive;
    document.body.classList.toggle('party-mode', partyActive);

    if (partyActive) {
      partyBtn.classList.add('bg-pink-600', 'text-white', 'shadow-lg', 'shadow-pink-500/50');
      showToast('⚡ PARTİ MODU AÇIK! Geceye hoş geldiniz.', 'success');
      createLaserFlash();
    } else {
      partyBtn.classList.remove('bg-pink-600', 'text-white', 'shadow-lg', 'shadow-pink-500/50');
      showToast('Parti Modu Kapatıldı.', 'info');
    }
  });

  function createLaserFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 80%)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.7s ease-out';
    document.body.appendChild(flash);

    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 700);
    }, 100);
  }
}

/* ==========================================================================
   8. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuDrawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !menuDrawer) return;

  function toggleMenu(show) {
    if (show) {
      menuDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    } else {
      menuDrawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   9. Modals & Lightbox System
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('general-modal');
  const modalContent = document.getElementById('modal-inner-content');
  const closeModalBtns = document.querySelectorAll('.close-modal-trigger');

  if (!modalBackdrop) return;

  window.openModal = function (htmlContent) {
    if (modalContent) modalContent.innerHTML = htmlContent;
    modalBackdrop.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop.classList.remove('opacity-0');
      modalBackdrop.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    modalBackdrop.classList.remove('opacity-100');
    modalBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      modalBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  };

  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', window.closeModal);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      window.closeModal();
    }
  });

  // Attach event click handlers to portfolio items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.querySelector('h3')?.innerText || 'ESR Event';
      const category = item.querySelector('.gallery-tag')?.innerText || 'Etkinlik';
      const desc = item.getAttribute('data-description') || 'Unutulmaz görsel şovlar, özel DJ performansı ve büyüleyici mekan tasarımı.';
      const img = item.querySelector('img')?.src || '';
      const stats = item.getAttribute('data-stats') || '1.200+ Katılımcı • 6 DJ Performansı • 360° Sahne';

      const content = `
        <div class="relative rounded-2xl overflow-hidden bg-slate-900 border border-purple-500/30">
          <div class="relative h-72 sm:h-96 w-full overflow-hidden">
            <img src="${img}" alt="${title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <span class="absolute top-4 left-4 badge-neon text-xs">${category}</span>
          </div>
          <div class="p-6 sm:p-8 -mt-10 relative">
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-syne">${title}</h3>
            <p class="text-purple-400 text-sm font-semibold mb-4 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ${stats}
            </p>
            <p class="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">${desc}</p>
            <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <a href="#planla" onclick="window.closeModal()" class="btn-primary py-2.5 px-6 text-sm">
                Benzer Bir Etkinlik Planla
              </a>
              <a href="https://wa.me/905321234567?text=${encodeURIComponent(`Merhaba! ${title} etkinliği gibi bir organizasyon hakkında bilgi almak istiyorum.`)}" target="_blank" class="btn-secondary py-2.5 px-6 text-sm">
                WhatsApp İle Bilgi Al
              </a>
            </div>
          </div>
        </div>
      `;
      window.openModal(content);
    });
  });

  // VIP Reservation Modal trigger
  const rsvpBtns = document.querySelectorAll('.open-rsvp-modal');
  rsvpBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventName = btn.getAttribute('data-event') || 'ESR NEON HORIZON Session';
      const content = `
        <div class="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-pink-500/30">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
            <span class="text-xs font-bold text-pink-400 uppercase tracking-widest">VIP Rezervasyon & Loca</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2 font-syne">${eventName}</h3>
          <p class="text-slate-400 text-sm mb-6">VIP masa ve loca talebinizi iletin, etkinlik direktörümüz 15 dakika içinde onay için arasın.</p>
          
          <form id="rsvp-submit-form" class="space-y-4" onsubmit="handleRsvpSubmit(event)">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Ad Soyad</label>
              <input type="text" required placeholder="Örn: Ece Sarper" class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Telefon No</label>
                <input type="tel" required placeholder="0532 ..." class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Kişi Sayısı (Loca/Masa)</label>
                <select class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none">
                  <option>Bistro Masa (2-4 Kişi)</option>
                  <option>VIP Loca (6-8 Kişi)</option>
                  <option>Backstage / DJ Arkası (Özel)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Özel İstekler / Not</label>
              <textarea rows="2" placeholder="Şampanya servisi, doğum günü kutlaması vb." class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"></textarea>
            </div>
            <button type="submit" class="w-full btn-primary py-3.5 text-sm font-bold mt-2">
              Rezervasyon Talebini Onayla
            </button>
          </form>
        </div>
      `;
      window.openModal(content);
    });
  });

  // Video Showreel Modal trigger
  const showreelBtns = document.querySelectorAll('.open-showreel-modal');
  showreelBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = `
        <div class="p-2 sm:p-4 bg-slate-900 rounded-2xl border border-purple-500/30">
          <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'); filter: brightness(0.6);"></div>
            <div class="relative text-center p-6 z-10">
              <div class="w-20 h-20 rounded-full bg-purple-600/80 border border-purple-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <h3 class="text-2xl font-bold text-white font-syne mb-2">ESR EVENT SHOWREEL 2026</h3>
              <p class="text-slate-300 text-sm max-w-md mx-auto">Festivaller, konsept gece kulübü prodüksiyonları ve özel kutlamaların nabzını tutun.</p>
              <div class="mt-6 flex justify-center gap-3">
                <span class="badge-neon">4K Prodüksiyon</span>
                <span class="badge-neon">360° Sahne</span>
              </div>
            </div>
          </div>
        </div>
      `;
      window.openModal(content);
    });
  });
}

// Global handler for RSVP form submit
window.handleRsvpSubmit = function (e) {
  e.preventDefault();
  window.closeModal();
  showToast('🎉 Rezervasyon talebiniz alındı! VIP koordinatörümüz sizinle iletişime geçiyor.', 'success');
};

// Global handler for Contact form submit
window.handleContactSubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  form.reset();
  showToast('✨ Mesajınız iletildi! En kısa sürede geri dönüş yapacağız.', 'success');
};

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function initToast() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none';
  document.body.appendChild(container);

  window.showToast = function (message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-sm font-medium border ${
      type === 'success'
        ? 'bg-slate-900/90 border-emerald-500/50 text-emerald-300 shadow-emerald-500/20'
        : 'bg-slate-900/90 border-purple-500/50 text-purple-200 shadow-purple-500/20'
    }`;

    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-2 text-slate-400 hover:text-white" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };
}
