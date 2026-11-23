/**
 * HANERA — GÖLBAŞI, ANKARA
 * Application Script: Interactivity, translations, plan viewers, lightbox & modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initLanguageSwitcher();
  initVillaPlans();
  initAmenities();
  initGallery();
  initFaqAccordion();
  initFloatingContact();
  initModals();
  initFormSubmissions();
});


/* ==========================================================================
   1. HEADER SCROLL & SCROLLSPY
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const openBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!openBtn || !drawer) return;

  function toggleMenu(show) {
    if (show) {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   3. BILINGUAL LANGUAGE SWITCHER (TR / EN)
   ========================================================================== */
const i18n = {
  tr: {
    nav_corporate: 'Kurumsal',
    nav_story: 'Felsefe',
    nav_concept: 'Konsept',
    nav_amenities: 'Yaşam Alanları',
    nav_plans: 'Villalar & Planlar',
    nav_location: 'Konum',
    nav_gallery: 'Galeri',
    nav_faq: 'S.S.S.',
    nav_contact: 'İletişim',
    nav_catalogue: 'Katalog İndir',

    hero_eyebrow: 'GÖLBAŞI, ANKARA · İNSAN ODAKLI YAŞAM TOPLULUĞU',
    hero_title: 'Yaşamın Yeni Evresi.',
    hero_lead: 'Sadece bir ev değil; doğayla bütünleşen yeni bir yaşam. Modern insanın sağlık, üretim, aidiyet ve sükunet arayışını Mogan Gölü kıyısında buluşturuyoruz.',
    hero_cta_explore: 'Keşfedin',
    hero_cta_catalogue: 'E-Katalog',
    hero_cta_contact: 'Ziyaret Randevusu',

    corp_eyebrow: 'MİMARİ VE YATIRIM VİZYONU',
    corp_title: 'Yaşamı yeniden düşünmek.',
    corp_desc: 'Hanera, geleneksel konut anlayışının ötesine geçerek insan ölçeğini, doğanın bilgeliğini ve sürdürülebilir mimariyi buluşturan yeni nesil bir yaşam topluluğudur.',
    corp_card1_title: 'Doğayla Bütünleşme',
    corp_card1_desc: 'Toprakla, suyla ve mevsim döngüleriyle kesintisiz bağ kuran, güneş ışığını ve göl esintisini içeri davet eden mimari kurgu.',
    corp_card2_title: 'Kalıcı ve Değer Odaklı',
    corp_card2_desc: 'Doğal malzemeler, uzun ömürlü mühendislik ve nesiller boyu değerini koruyacak adanmış bir inşaat vizyonu.',

    story_eyebrow: 'İSMİN KÖKENİ & FELSEFE',
    story_title: 'Adanmış bir yaşam düşüncesi, yeni bir dönemin adıyla birleşir.',
    story_quote: '“HAN (Hanok: Yaşama ve yere adanmışlık) + ERA (Çağ, yeni bir başlangıç)”',
    story_p1: 'Mavi Bölgeler (Blue Zones) araştırmalarından ve Ikigai felsefesinden ilham alan Hanera; uzun, anlamlı ve sağlıklı bir yaşamın sırlarını Mogan Gölü kıyısında hayata geçiriyor.',
    story_p2: 'Doğal hareket, sade ve organik beslenme, güçlü komşuluk bağları ve insanın güne dingin bir amaçla başlamasını sağlayan gündelik ritüeller projenin özünü oluşturur.',

    concept_eyebrow: 'YAŞAM DÜŞÜNCESİ',
    concept_title: 'Dengeli bir hayatı oluşturan 4 temel deneyim.',
    concept_desc: 'Bedenin, zihnin ve topluluğun uyum içinde var olduğu bütünsel bir yaşam alanı.',

    amenities_eyebrow: 'YAŞAM OLANAKLARI',
    amenities_title: 'Bütünsel sağlık ve seçkin sosyal alanlar.',
    amenities_desc: 'Hanera Kulüp; sadece bir sosyal tesis değil, yenilenme ve sakin bir sosyalleşme merkezidir.',

    plans_eyebrow: 'VİLLA TİPLERİ & PLANLAR',
    plans_title: 'Mimari planları ve yerleşimi keşfedin.',
    plans_desc: 'Farklı aile ve yaşam gereksinimlerine göre titizlikle projelendirilmiş müstakil villa seçenekleri.',

    location_eyebrow: 'STRATEJİK KONUM',
    location_title: 'Gölün sükunetinde, başkentin tüm akslarına yakın.',
    location_desc: 'Mogan Gölü’nün kıyısında, Ankara’nın en saygın eğitim ve kültür kurumlarına komşu stratejik lokasyon.',

    gallery_eyebrow: 'GÖRSEL ARŞİV',
    gallery_title: 'Hanera yaşamından seçkin kareler.',

    faq_eyebrow: 'MERAK EDİLENLER',
    faq_title: 'Sıkça Sorulan Sorular',

    contact_eyebrow: 'İLETİŞİM & RANDEVU',
    contact_title: 'Hanera hakkında konuşalım.',
    contact_desc: 'Proje detayları, kat planları, fiyatlandırma ve kişiye özel ödeme seçenekleri için satış uzmanlarımızla iletişime geçin.',

    btn_submit_lead: 'Randevu Talebi Gönder',
    btn_download_plan: 'Kat Planı PDF İndir',
    btn_view_render: '3D Render',
    btn_view_blueprint: 'Mimari Plan',
    modal_catalogue_title: 'Dijital E-Kataloğu İndirin',
    modal_catalogue_desc: 'Hanera Gölbaşı projesinin villa tipleri, mimari planları, sosyal olanakları ve teknik şartnamesini içeren kapsamlı broşürü indirin.'
  },
  en: {
    nav_corporate: 'Corporate',
    nav_story: 'Philosophy',
    nav_concept: 'Concept',
    nav_amenities: 'Living Spaces',
    nav_plans: 'Villas & Plans',
    nav_location: 'Location',
    nav_gallery: 'Gallery',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',
    nav_catalogue: 'Download Brochure',

    hero_eyebrow: 'GÖLBAŞI, ANKARA · HUMAN-CENTRIC LIVING COMMUNITY',
    hero_title: 'A New Epoch of Living.',
    hero_lead: 'More than a home: a mindful way of living in harmony with nature. Bringing together health, purpose, belonging and serenity along the shores of Lake Mogan.',
    hero_cta_explore: 'Discover',
    hero_cta_catalogue: 'Brochure',
    hero_cta_contact: 'Private Visit',

    corp_eyebrow: 'ARCHITECTURAL & INVESTMENT VISION',
    corp_title: 'Rethinking life.',
    corp_desc: 'Transcend conventional housing with a new-generation community merging human scale, natural wisdom and timeless sustainable architecture.',
    corp_card1_title: 'Biophilic Integration',
    corp_card1_desc: 'Seamlessly connected with earth, water and changing seasons, inviting daylight and gentle lake breezes inside.',
    corp_card2_title: 'Timeless & Value-Driven',
    corp_card2_desc: 'Authentic materials, generational engineering and a dedicated construction philosophy that preserves enduring value.',

    story_eyebrow: 'ORIGIN & PHILOSOPHY',
    story_title: 'A dedicated way of living merges with a new era.',
    story_quote: '“HAN (Hanok: Devotion to life and place) + ERA (A new epoch, a new beginning)”',
    story_p1: 'Drawing inspiration from Blue Zones longevity research and the Japanese philosophy of Ikigai, Hanera brings the art of long and purposeful life to Lake Mogan.',
    story_p2: 'Natural daily movement, organic seasonal nourishment, authentic community connections and purposeful morning rituals define our essence.',

    concept_eyebrow: 'THE PHILOSOPHY',
    concept_title: '4 essential pillars of a balanced existence.',
    concept_desc: 'A holistic realm where body, mind, and community flourish in complete harmony.',

    amenities_eyebrow: 'LIFESTYLE AMENITIES',
    amenities_title: 'Holistic wellness and serene social spaces.',
    amenities_desc: 'Hanera Club is more than a clubhouse; it is a sanctuary for vitality and quiet togetherness.',

    plans_eyebrow: 'VILLA TYPOLOGIES & PLANS',
    plans_title: 'Explore the architectural floorplans and layout.',
    plans_desc: 'Meticulously crafted private residences designed for distinct family aspirations.',

    location_eyebrow: 'STRATEGIC LOCATION',
    location_title: 'In lake tranquility, connected to the capital’s key avenues.',
    location_desc: 'Situated by Lake Mogan, neighboring Ankara’s foremost universities, embassies and schools.',

    gallery_eyebrow: 'VISUAL ARCHIVE',
    gallery_title: 'Selected moments of life at Hanera.',

    faq_eyebrow: 'FREQUENTLY ASKED',
    faq_title: 'Frequently Asked Questions',

    contact_eyebrow: 'CONTACT & APPOINTMENT',
    contact_title: 'Let’s discuss Hanera.',
    contact_desc: 'Connect with our senior property advisors for floorplans, pricing, and tailored acquisition plans.',

    btn_submit_lead: 'Request Private Appointment',
    btn_download_plan: 'Download Floorplan PDF',
    btn_view_render: '3D Render',
    btn_view_blueprint: 'Architectural Plan',
    modal_catalogue_title: 'Download Digital Brochure',
    modal_catalogue_desc: 'Access the comprehensive brochure including villa specifications, floorplans, site layout, and private club amenities.'
  }
};

let currentLang = 'tr';

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = btn.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        setLanguage(selected);
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const texts = i18n[lang];
  if (!texts) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key]) {
      el.innerHTML = texts[key];
    }
  });

  document.documentElement.lang = lang;
}

/* ==========================================================================
   4. VILLA PLANS & MASTERPLAN SWITCHER
   ========================================================================== */
const villaData = {
  masterplan: {
    title: 'Vaziyet Planı & Masterplan',
    subtitle: '110.000 m² Göl Cepheli Özel Yerleşim Alanı',
    specs: ['64 Bağımsız Parsel', 'Göl Kıyı Bandı', 'Hanera Sosyal Kulüp', 'Botanik Eko-Koridor'],
    desc: 'Mogan Gölü topoğrafyasına kusursuz uyum sağlayan kademeli yerleşim kurgusu sayesinde tüm villalar kesintisiz göl manzarası ve optimum gün ışığı alacak şekilde konumlandırılmıştır.',
    features: ['Geniş Müstakil Bahçeler', '24/7 Güvenlik & Konsiyerj', 'Özel Kıyı İskelesi & Yürüyüş Yolu', 'Yeraltı Otopark & Elektrikli Şarj'],
    blueprint: 'assets/images/plan-masterplan.svg',
    render: 'assets/images/hero-main.jpg'
  },
  mogan: {
    title: 'Villa Mogan (6+2)',
    subtitle: 'Kıyı Bandı Özel Müstakil Malikâne',
    specs: ['6+2 Oda & Süit', 'Brüt: 740 m²', 'Bahçe: 1.200 m²', 'Infinity Havuz'],
    desc: 'Göl kıyısına sıfır konumlanan Villa Mogan; 6.40 metre tavan yüksekliğine sahip salonu, özel spa & sauna süiti, iç avlusu ve 14 metrelik müstakil taşma havuzuyla sınırsız bir lüks standardı sunar.',
    features: ['Mogan Gölü Tam Panoraması', 'Gaggenau Gurme Ada Mutfak', 'Fin Sedir Saunası & Wellness Odası', '4 Araçlık Kapalı Otopark'],
    blueprint: 'assets/images/plan-villa-mogan.svg',
    render: 'assets/images/villa-mogan.jpg'
  },
  azure: {
    title: 'Villa Azure (5+1)',
    subtitle: 'Biyofilik Avlulu Prestij Villa',
    specs: ['5+1 Oda & Süit', 'Brüt: 560 m²', 'Bahçe: 950 m²', 'Özel Yüzme Havuzu'],
    desc: 'Evin tam merkezinde konumlanan cam avlulu iç bahçesiyle doğayı iç mekana taşıyan Villa Azure, geniş göl terasları, ebeveyn çalışma süiti ve akıllı iklimlendirme altyapısıyla dengeli bir aile yaşamı sunar.',
    features: ['Biyofilik İç Avlu & Bahçe', 'Geniş Göl Manzaralı Teraslar', 'Müstakil Yüzme Havuzu', 'Akıllı Ev & Güneş Enerjisi'],
    blueprint: 'assets/images/plan-villa-azure.svg',
    render: 'assets/images/villa-azure.jpg'
  },
  serene: {
    title: 'Villa Serene (4+1)',
    subtitle: 'Tek Katlı Bahçeli Bungalov Villa',
    specs: ['4+1 Tek Kat', 'Brüt: 420 m²', 'Bahçe: 800 m²', 'Gömme Ateş Çukuru'],
    desc: 'Merdivensiz, engelsiz ve akıcı tek katlı mimarisiyle öne çıkan Villa Serene, tüm odalardan bahçeye doğrudan açılan sürgülü cam cepheleri, gömme ateş çukuru ve organik bostan alanı ile dinginliğin zirvesini yaşatır.',
    features: ['Tek Kat Akıcı Yaşam', 'Doğrudan Bahçe & Havuz Erişimi', 'Doğal Şömineli Teras', 'Özel Permakültür Bostanı'],
    blueprint: 'assets/images/plan-villa-serene.svg',
    render: 'assets/images/villa-serene.jpg'
  },
  aura: {
    title: 'Villa Aura (4+1)',
    subtitle: 'Panoramik Dubleks Göl Villası',
    specs: ['4+1 Dubleks', 'Brüt: 360 m²', 'Bahçe: 650 m²', 'Göl Balkonları'],
    desc: 'Kompakt lüksü ve ferahlığı bir arada sunan Villa Aura; çift katlı galeri boşluğu, modern çizgileri, lake ve doğal taş detayları ile modern yaşam arayanlar için tasarlandı.',
    features: ['Çift Yükseklikli Galeri Salonu', 'Panoramik Göl Balkonları', 'Özel Peyzajlı Müstakil Bahçe', 'Yüksek Enerji Verimliliği'],
    blueprint: 'assets/images/plan-villa-aura.svg',
    render: 'assets/images/villa-aura.jpg'
  }
};

function initVillaPlans() {
  const tabs = document.querySelectorAll('.plan-tab-btn');
  const planInfo = document.querySelector('.plan-info');
  const planImg = document.querySelector('.plan-visual-img');
  const toggleBlueprint = document.querySelector('.toggle-blueprint');
  const toggleRender = document.querySelector('.toggle-render');

  if (!tabs.length || !planInfo || !planImg) return;

  let activePlanKey = 'masterplan';
  let activeViewMode = 'blueprint';

  function updatePlanDisplay() {
    const data = villaData[activePlanKey];
    if (!data) return;

    planInfo.querySelector('.plan-title').textContent = data.title;
    planInfo.querySelector('.plan-subtitle').textContent = data.subtitle;
    planInfo.querySelector('.plan-description').textContent = data.desc;

    const specsContainer = planInfo.querySelector('.plan-specs-pills');
    specsContainer.innerHTML = data.specs.map(s => `<span class="spec-pill">${s}</span>`).join('');

    const featContainer = planInfo.querySelector('.plan-features-grid');
    featContainer.innerHTML = data.features.map(f => `
      <div class="plan-feature-item">
        <span>${f}</span>
      </div>
    `).join('');

    planImg.src = activeViewMode === 'blueprint' ? data.blueprint : data.render;
    planImg.alt = data.title;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activePlanKey = tab.getAttribute('data-plan');
      updatePlanDisplay();
    });
  });

  if (toggleBlueprint && toggleRender) {
    toggleBlueprint.addEventListener('click', () => {
      activeViewMode = 'blueprint';
      toggleBlueprint.classList.add('active');
      toggleRender.classList.remove('active');
      updatePlanDisplay();
    });

    toggleRender.addEventListener('click', () => {
      activeViewMode = 'render';
      toggleRender.classList.add('active');
      toggleBlueprint.classList.remove('active');
      updatePlanDisplay();
    });
  }

  updatePlanDisplay();
}

/* ==========================================================================
   5. AMENITIES TAB SHOWCASE
   ========================================================================== */
const amenitiesData = {
  pool: {
    title: 'Mogan Panoramik Lagünü & Isıtmalı Havuz',
    desc: 'Dört mevsim kullanılabilen ısıtmalı lagün havuzu, göl manzarasıyla bütünleşen infinity kenarları ve güneşlenme teraslarıyla suyun yenileyici gücünü evinize getirir.',
    image: 'assets/images/amenity-pool.jpg',
    features: ['Açık Infinity Taşma Havuzu', 'Isıtmalı Kapalı Dinlenme Havuzu', 'Göl Kenarı Ahşap Güneşlenme Deck’i', 'Özel İskele & Kürek / Kayak İstasyonu']
  },
  spa: {
    title: 'Longevity Wellness Spa & Termal Bölge',
    desc: 'Yenilenme ritüelleri; Fin sedir saunası, buhar odası, tuz inhalasyon mağarası ve masaj süitleriyle hayat bulur.',
    image: 'assets/images/amenity-spa.jpg',
    features: ['Fin Sedir Ağacı Saunası', 'Kaya Tuzu İnhalasyon Odası', 'Cryotherapy / Soğuk Şok Havuzu', 'Özel Holistik Masaj Terapileri']
  },
  cafe: {
    title: 'Organik Kafe & Artisan Bistro',
    desc: 'Proje bostanından toplanan taze organik hasatlarla hazırlanan mevsimsel menüler, göl kıyısında keyifli komşuluk sohbetlerine ev sahipliği yapar.',
    image: 'assets/images/amenity-cafe.jpg',
    features: ['Farm-to-Table Organik Menü', 'Özel Şarküteri & Doğal Ürünler', 'Açık Hava Göl Terası', 'Doğal Bitki Çayları & Detoks Bar']
  },
  sports: {
    title: 'Fitness & Reformer Pilates Stüdyosu',
    desc: 'Fonksiyonel antrenman alanları ve reformer pilates stüdyosuyla sağlıklı yaşlanmayı destekleyen profesyonel hareket ortamı.',
    image: 'assets/images/amenity-sports.jpg',
    features: ['Akıllı Kardiyo Ekipmanları', 'Reformer Pilates Odası', 'Yoga & Meditasyon Alanı', 'Kişisel Eğitmen Desteği']
  },
  tennis: {
    title: 'Tenis & Padel Kortları',
    desc: 'Mogan Gölü’nün açık havasında, uluslararası standartlarda tenis kortu ve 2 adet panoramik padel kortu.',
    image: 'assets/images/amenity-tennis.jpg',
    features: ['1 Adet Standart Tenis Kortu', '2 Adet Panoramik Padel Kortu', 'Gece Aydınlatmalı Sahalar', 'Kulüp Evi & Ekipman İstasyonu']
  }
};

function initAmenities() {
  const buttons = document.querySelectorAll('.amenity-tab-btn');
  const showcase = document.querySelector('.amenity-card-showcase');
  if (!buttons.length || !showcase) return;

  const titleEl = showcase.querySelector('.amenity-title');
  const descEl = showcase.querySelector('.amenity-desc');
  const imgEl = showcase.querySelector('.amenity-img');
  const listEl = showcase.querySelector('.amenity-feature-list');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-amenity');
      const data = amenitiesData[key];
      if (!data) return;

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      imgEl.src = data.image;
      imgEl.alt = data.title;
      listEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    });
  });
}

/* ==========================================================================
   6. GALLERY FILTERS & FULLSCREEN LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');
  if (!galleryItems.length || !lightbox) return;

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');

  let currentItems = Array.from(galleryItems);
  let currentIndex = 0;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      currentItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
    });
  });

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = currentItems.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    const item = currentItems[currentIndex];
    if (!item) return;
    const img = item.querySelector('img');
    const title = item.querySelector('h4') ? item.querySelector('h4').textContent : '';

    lbImg.src = img.src;
    lbCaption.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    openLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    openLightbox();
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', showNext);
  if (lbPrev) lbPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. FLOATING QUICK CONTACT DRAWER
   ========================================================================== */
function initFloatingContact() {
  const floatBtn = document.querySelector('.floating-contact-btn');
  const drawer = document.querySelector('.floating-contact-drawer');
  const drawerClose = document.querySelector('.drawer-close');

  if (!floatBtn || !drawer) return;

  floatBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    drawer.classList.toggle('active');
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('active') && !drawer.contains(e.target) && e.target !== floatBtn) {
      drawer.classList.remove('active');
    }
  });
}

/* ==========================================================================
   9. MODALS
   ========================================================================== */
function initModals() {
  const catalogueTriggers = document.querySelectorAll('[data-open-catalogue]');
  const legalTriggers = document.querySelectorAll('[data-open-legal]');
  const catalogueModal = document.querySelector('#catalogueModal');
  const legalModal = document.querySelector('#legalModal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  catalogueTriggers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(catalogueModal);
  }));

  legalTriggers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(legalModal);
  }));

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(catalogueModal);
      closeModal(legalModal);
    });
  });

  [catalogueModal, legalModal].forEach(m => {
    if (!m) return;
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(catalogueModal);
      closeModal(legalModal);
    }
  });
}

/* ==========================================================================
   10. LEAD FORM SUBMISSIONS
   ========================================================================== */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form[data-lead-form]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Gönderiliyor...';

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 36px 20px;">
            <div style="font-family: var(--font-editorial); font-size: 2.2rem; color: var(--c-forest); margin-bottom: 8px;">Talebiniz Alındı</div>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;">Hanera satış danışmanımız en kısa sürede sizinle iletişime geçecektir. Teşekkür ederiz.</p>
          </div>
        `;
      }, 900);
    });
  });
}
