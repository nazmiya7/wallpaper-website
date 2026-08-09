// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── MOBILE NAV ──────────────────────────────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMobileNav() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
document.getElementById('mobile-nav-close').addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);

// Close on mobile nav link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ─── INTERSECTION OBSERVER — FADE UP ─────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ─── TESTIMONIAL CAROUSEL ────────────────────────────────────────────────────
const track = document.getElementById('testimonials-track');
const dots = document.querySelectorAll('.testi-dot');
let current = 0;
let autoplayTimer;

function goToSlide(idx) {
  current = (idx + dots.length) % dots.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === current);
    d.setAttribute('aria-selected', i === current ? 'true' : 'false');
  });
}

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    clearInterval(autoplayTimer);
    goToSlide(idx);
    startAutoplay();
  });
});

function startAutoplay() {
  autoplayTimer = setInterval(() => goToSlide(current + 1), 4500);
}
startAutoplay();

// Pause autoplay on hover
const carouselEl = document.querySelector('.testimonials-carousel');
if (carouselEl) {
  carouselEl.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  carouselEl.addEventListener('mouseleave', startAutoplay);

  // Touch swipe for testimonials
  let touchStartX = 0;
  carouselEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  carouselEl.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      clearInterval(autoplayTimer);
      goToSlide(diff > 0 ? current + 1 : current - 1);
      startAutoplay();
    }
  }, { passive: true });
}

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── STAGGERED GRID ANIMATIONS ───────────────────────────────────────────────
function staggerChildren(container, selector, baseDelay = 100) {
  const children = container.querySelectorAll(selector);
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * baseDelay}ms`;
  });
}

const grids = [
  { selector: '.categories-grid', child: '.cat-card' },
  { selector: '.why-grid', child: '.why-card' },
  { selector: '.arrivals-grid', child: '.arrival-card' },
];
grids.forEach(({ selector, child }) => {
  const el = document.querySelector(selector);
  if (el) staggerChildren(el, child);
});

// ─── PREFERS REDUCED MOTION ───────────────────────────────────────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.fade-up').forEach(el => {
    el.classList.add('visible');
  });
  document.querySelectorAll('[style*="transition-delay"]').forEach(el => {
    el.style.transitionDelay = '0ms';
  });
}
