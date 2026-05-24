/* ═══════════════════════════════════════
   ATHELIA SOFT — JavaScript Principal
═══════════════════════════════════════ */

// ── Navbar y Banner ──
const navbar = document.getElementById('navbar');
const topBanner = document.querySelector('.top-banner');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const isMobile = window.innerWidth <= 600;
  const bannerHeight = isMobile ? 130 : 110;

  // Efecto scrolled
  navbar.classList.toggle('scrolled', currentScroll > 50);

  // Banner aparece y desaparece
  if (currentScroll > lastScroll && currentScroll > 100) {
    topBanner.classList.add('hidden');
    navbar.style.top = '0px';
  } else {
    topBanner.classList.remove('hidden');
    navbar.style.top = bannerHeight + 'px';
  }

  lastScroll = currentScroll;
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = '#' + section.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === current) {
      a.style.color = 'var(--purple)';
      a.style.background = 'var(--purple-pale)';
    }
  });
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Intersection Observer: fade-in on scroll ──
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animTargets = [
  '.mv-card', '.policy-card', '.feature-card', '.team-card',
  '.other-card', '.about-text', '.brand-card', '.product-hero-card',
  '.problem-box', '.solution-box', '.contact-info', '.contact-form',
  '.section-title', '.section-subtitle', '.section-tag'
];
animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
});

// ── Animated bus markers ──
const busMarkers = document.querySelectorAll('.bus-marker');
function moveBuses() {
  busMarkers.forEach(bus => {
    const newTop  = 20 + Math.random() * 60;
    const newLeft = 15 + Math.random() * 65;
    bus.style.top  = newTop  + '%';
    bus.style.left = newLeft + '%';
  });
}
setInterval(moveBuses, 3000);

// ── Contact form ──
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !email || !mensaje) {
    formMsg.textContent = '⚠️ Por favor completa todos los campos.';
    formMsg.style.color = '#e53e3e';
    return;
  }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  emailjs.sendForm(
    'service_ed61idd',
    'template_q1ph6ok',
    contactForm
  )
  .then(() => {
    formMsg.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
    formMsg.style.color = 'var(--purple)';
    contactForm.reset();
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  })
  .catch(() => {
    formMsg.textContent = 'Error al enviar, intenta de nuevo.';
    formMsg.style.color = '#e53e3e';
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
  });
});

// ── Counter animation ──
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const heroSection = document.querySelector('.hero');
const counterEls  = document.querySelectorAll('.stat-number');
let countersRun   = false;

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersRun) {
    countersRun = true;
    counterEls.forEach(el => {
      animateCounter(el, parseInt(el.textContent), 1800);
    });
  }
}, { threshold: 0.5 });

heroObserver.observe(heroSection);

// ── App tabs ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

console.log('%c Athelia Soft ', 'background:#4B2C7F;color:#EAB444;font-size:20px;font-weight:bold;padding:8px 16px;border-radius:8px;');
console.log('%c Sabiduría que se convierte en software inteligente. ', 'color:#4B2C7F;font-size:12px;');