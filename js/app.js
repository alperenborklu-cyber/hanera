/**
 * HANERA — GÖLBAŞI, ANKARA
 * Application Script: Interactivity, translations, plan viewers, lightbox & modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initVillaPlans();
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
