/* ==========================================================================
   Portfolio – Manuel Verdón
   main.js
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Data
   -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title:     'Zonix Play',
    shortDesc: 'Cliente IPTV multiplataforma de alto rendimiento con Flutter',
    fullDesc:  'Aplicación IPTV moderna para Android y Windows construida con Flutter. Permite reproducir contenido con las propias credenciales del usuario, sincronización en la nube mediante Supabase, almacenamiento local con Hive y una UI premium con diseño glassmorphism. Motor de vídeo basado en MediaKit con backend libmpv para máxima calidad de reproducción.',
    tech:      ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'MediaKit', 'Hive'],
    category:  'App Móvil / Desktop',
    gradient:  'linear-gradient(135deg, #0d1117, #1a1f2e)',
    image:     'https://raw.githubusercontent.com/VerdonTO05/iptv_pro/master/assets/images/logo.png',
    github:    'https://github.com/VerdonTO05/iptv_pro',
    demo:      null,
  },
  {
    title:     'MoveOs',
    shortDesc: 'Plataforma web para gestión de actividades y eventos comunitarios',
    fullDesc:  'Plataforma web completa que centraliza la gestión, publicación y participación en actividades, talleres y eventos educativos. Backend en PHP con arquitectura MVC, autenticación con bcrypt y control de acceso por roles, base de datos MySQL con triggers automáticos y auditoría de operaciones. Flujos de aprobación para administradores, sistema de solicitudes de usuarios e interfaz responsive construida con SCSS.',
    tech:      ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'SCSS', 'Figma', 'Jira', 'Git'],
    category:  'Full Stack',
    gradient:  'linear-gradient(135deg, #0d1a14, #0f1f1a)',
    image:     'https://raw.githubusercontent.com/VerdonTO05/Proyecto-Final-MoveOs-Grupo-5/main/root-proyect/public/assets/img/ico/icono.svg',
    github:    'https://github.com/VerdonTO05/Proyecto-Final-MoveOs-Grupo-5',
    demo:      null,
  },
];

/* --------------------------------------------------------------------------
   2. SVG Icons (inline, avoids external dependency)
   -------------------------------------------------------------------------- */

const ICONS = {
  eye:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
};

/* --------------------------------------------------------------------------
   3. Typewriter Effect
   -------------------------------------------------------------------------- */

const ROLES = [
  'Desarrollador Web',
  'Estudiante de DAW',
  'Apasionado del Código',
  'Creador de Soluciones',
];

function initTypewriter() {
  const el = document.getElementById('tw-text');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused   = false;

  function tick() {
    const word = ROLES[wordIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      return setTimeout(tick, 2200);
    }

    if (!isDeleting) {
      el.textContent = word.slice(0, ++charIndex);
      if (charIndex === word.length) isPaused = true;
    } else {
      el.textContent = word.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % ROLES.length;
      }
    }

    setTimeout(tick, isDeleting ? 40 : 80);
  }

  tick();
}

/* --------------------------------------------------------------------------
   4. Navigation
   -------------------------------------------------------------------------- */

const SECTION_IDS = ['about', 'projects', 'skills', 'contact'];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function updateActiveNav() {
  const scrollY  = window.scrollY + 200;
  let activeId   = SECTION_IDS[0];

  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) activeId = id;
  });

  document.querySelectorAll('[data-section]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === activeId);
  });
}

function initNavigation() {
  // Scroll-to buttons in nav and hero
  document.querySelectorAll('[data-scroll]').forEach(btn =>
    btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll))
  );

  // Nav links (desktop + mobile)
  document.querySelectorAll('.nav-link, .mobile-link').forEach(btn =>
    btn.addEventListener('click', () => {
      scrollToSection(btn.dataset.section);
      closeMobileMenu();
    })
  );

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* --------------------------------------------------------------------------
   5. Mobile Menu (Hamburger)
   -------------------------------------------------------------------------- */

function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    setHamburgerState(isOpen);
  });
}

function setHamburgerState(open) {
  const lines = ['hl1', 'hl2', 'hl3'].map(id => document.getElementById(id));
  if (open) {
    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    lines[1].style.opacity   = '0';
    lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    lines[0].style.transform = lines[2].style.transform = '';
    lines[1].style.opacity   = '';
  }
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  setHamburgerState(false);
}

/* --------------------------------------------------------------------------
   6. Project Cards
   -------------------------------------------------------------------------- */

function buildProjectCard(project, index) {
  const card = document.createElement('div');
  card.className          = 'project-card scroll-reveal';
  card.style.transitionDelay = `${index * 0.08}s`;

  const bannerInner = project.image
    ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
    : project.icon || '';

  card.innerHTML = `
    <div class="project-banner" style="background: ${project.gradient}">${bannerInner}</div>
    <div class="project-body">
      <div class="project-head">
        <span class="project-title">${project.title}</span>
        <span class="badge">${project.category}</span>
      </div>
      <p class="project-desc">${project.shortDesc}</p>
      <div class="tech-tags">
        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="project-cta">${ICONS.eye} Ver detalles</div>
    </div>`;

  card.addEventListener('click', () => openModal(project));
  return card;
}

function initProjects() {
  const grid = document.getElementById('projects-grid');
  PROJECTS.forEach((project, i) => grid.appendChild(buildProjectCard(project, i)));
}

/* --------------------------------------------------------------------------
   7. Modal
   -------------------------------------------------------------------------- */

function openModal(project) {
  const modalBanner = document.getElementById('modal-banner');
  modalBanner.style.background = project.gradient;
  modalBanner.innerHTML = project.image
    ? `<img src="${project.image}" alt="${project.title}">`
    : project.icon || '';
  document.getElementById('modal-title').textContent       = project.title;
  document.getElementById('modal-category').textContent    = project.category;
  document.getElementById('modal-desc').textContent        = project.fullDesc;

  document.getElementById('modal-chips').innerHTML =
    project.tech.map(t => `<span class="chip">${t}</span>`).join('');

  document.getElementById('modal-actions').innerHTML =
    `<a href="${project.github}" class="btn-ghost" target="_blank" rel="noopener">${ICONS.github} Código fuente</a>` +
    (project.demo ? `<a href="${project.demo}" class="btn-ghost" target="_blank" rel="noopener">Demo en vivo</a>` : '');

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* --------------------------------------------------------------------------
   8. Scroll Reveal
   -------------------------------------------------------------------------- */

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseFloat(entry.target.style.transitionDelay || '0') * 1000;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   9. Contact Card Hover Colors
   -------------------------------------------------------------------------- */

function initContactCards() {
  document.querySelectorAll('.contact-card').forEach(card => {
    const hoverColor = card.dataset.hoverBorder || 'rgba(129, 140, 248, 0.25)';
    card.addEventListener('mouseenter', () => card.style.borderColor = hoverColor);
    card.addEventListener('mouseleave', () => card.style.borderColor = 'rgba(255, 255, 255, 0.06)');
  });
}

/* --------------------------------------------------------------------------
   10. Init
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavigation();
  initHamburger();
  initProjects();
  initModal();
  initScrollReveal();
  initContactCards();
});
