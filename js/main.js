/* ==========================================================================
   Portfolio – Manuel Verdón
   main.js
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Data
   -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title:     'Chat en Tiempo Real',
    shortDesc: 'Mensajería instantánea con WebSockets bidireccional',
    fullDesc:  'Aplicación de chat en tiempo real desarrollada con WebSockets que permite comunicación bidireccional entre múltiples usuarios de forma instantánea. Incluye salas de chat, indicador de escritura en vivo y persistencia de mensajes en el servidor.',
    tech:      ['JavaScript', 'WebSockets', 'PHP', 'HTML', 'CSS'],
    category:  'Full Stack',
    gradient:  'linear-gradient(135deg, rgba(129,140,248,0.25), rgba(99,102,241,0.15))',
    icon:      '💬',
    github:    '#',
    demo:      null,
  },
  {
    title:     'Gestor de Tareas',
    shortDesc: 'Sistema CRUD completo con PHP y base de datos',
    fullDesc:  'Aplicación web para la gestión de proyectos y tareas con operaciones CRUD completas. Backend en PHP con autenticación de usuarios, gestión de sesiones y base de datos relacional. Interfaz dinámica construida con JavaScript vanilla.',
    tech:      ['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
    category:  'Full Stack',
    gradient:  'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(16,185,129,0.15))',
    icon:      '✅',
    github:    '#',
    demo:      null,
  },
  {
    title:     'API REST con Java',
    shortDesc: 'Servicio backend RESTful para gestión de recursos',
    fullDesc:  'API RESTful desarrollada en Java que expone endpoints para CRUD de recursos. Implementa correctamente los códigos de estado HTTP, manejo estructurado de errores y serialización JSON. Documentada con colección de requests de prueba.',
    tech:      ['Java', 'REST', 'JSON', 'HTTP'],
    category:  'Backend',
    gradient:  'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(239,68,68,0.15))',
    icon:      '⚡',
    github:    '#',
    demo:      null,
  },
  {
    title:     'Scripts de Automatización',
    shortDesc: 'Herramientas Python para procesamiento de datos',
    fullDesc:  'Conjunto de scripts Python para automatizar tareas repetitivas: lectura y transformación de ficheros, procesamiento de datos en distintos formatos (CSV, JSON) y generación automática de informes. Diseño modular y reutilizable.',
    tech:      ['Python', 'CSV', 'JSON', 'Automatización'],
    category:  'Scripting',
    gradient:  'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.15))',
    icon:      '🐍',
    github:    '#',
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

  card.innerHTML = `
    <div class="project-banner" style="background: ${project.gradient}">${project.icon}</div>
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
  document.getElementById('modal-banner').style.background = project.gradient;
  document.getElementById('modal-banner').textContent      = project.icon;
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
