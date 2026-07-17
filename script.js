// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// Brand logo scrolls all the way to the top
const brand = document.getElementById('brandTop');
if (brand) {
  brand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Subtle header shadow on scroll
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 8) header.style.boxShadow = '0 6px 24px -18px rgba(23,40,27,.4)';
  else header.style.boxShadow = 'none';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
