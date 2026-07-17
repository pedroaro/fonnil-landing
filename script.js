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

/* ============================================================
   Contact flow — verify human, then open a prefilled mailto.
   Static-site friendly: no server, so this is a lightweight
   bot gate (math challenge + honeypot + minimum dwell time).
   ============================================================ */
const CONTACT_EMAIL = 'adelgado0809@gmail.com';

const MAIL_TEMPLATES = {
  demo: {
    subject: "I'd like to book a demo",
    body:
      "Hi Fonnil team,\n\n" +
      "I would like to book a demo of Fonnil Talent. Here is my contact information:\n\n" +
      "<put your contact information here>\n" +
      "(Name, practice / organization, role, phone, best time to reach you)\n\n" +
      "Looking forward to seeing it on our open roles.\n\nThanks!"
  },
  chill: {
    subject: "Wanted to reach out 👋",
    body:
      "Hey Fonnil,\n\n" +
      "No big agenda — just wanted to reach out and start a conversation about how you " +
      "could help our team. Here's how to get back to me:\n\n" +
      "<put your contact information here>\n" +
      "(Name, what you're working on, and the best way to reach you)\n\n" +
      "Talk soon!"
  }
};

const pageLoadedAt = Date.now();
const overlay   = document.getElementById('verifyOverlay');
const qLabel    = document.getElementById('verifyQLabel');
const answerEl  = document.getElementById('verifyAnswer');
const honeypot  = document.getElementById('verifyHp');
const errorEl   = document.getElementById('verifyError');
const submitBtn = document.getElementById('verifySubmit');
const closeBtn  = document.getElementById('verifyClose');

let currentKind = 'demo';
let expectedAnswer = 0;
let lastTrigger = null;

function buildMailto(kind) {
  const t = MAIL_TEMPLATES[kind] || MAIL_TEMPLATES.demo;
  return 'mailto:' + CONTACT_EMAIL +
    '?subject=' + encodeURIComponent(t.subject) +
    '&body=' + encodeURIComponent(t.body);
}

function newChallenge() {
  const a = Math.floor(Math.random() * 8) + 2;   // 2..9
  const b = Math.floor(Math.random() * 8) + 2;   // 2..9
  expectedAnswer = a + b;
  qLabel.textContent = `What is ${a} + ${b}?`;
}

function openVerify(kind, triggerEl) {
  currentKind = kind;
  lastTrigger = triggerEl || null;
  newChallenge();
  answerEl.value = '';
  honeypot.value = '';
  errorEl.textContent = '';
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => answerEl.focus(), 60);
}

function closeVerify() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  if (lastTrigger) lastTrigger.focus();
}

function submitVerify() {
  // Honeypot filled → almost certainly a bot. Fail silently.
  if (honeypot.value.trim() !== '') { closeVerify(); return; }
  // Too fast to be a real person reading the page.
  if (Date.now() - pageLoadedAt < 1500) {
    errorEl.textContent = 'Please take a moment, then try again.';
    return;
  }
  if (parseInt(answerEl.value, 10) !== expectedAnswer) {
    errorEl.textContent = "That doesn't look right — give it another go.";
    newChallenge();
    answerEl.value = '';
    answerEl.focus();
    return;
  }
  // Passed — open the user's mail client in a new tab with a prefilled message.
  window.open(buildMailto(currentKind), '_blank', 'noopener');
  closeVerify();
}

// Wire every contact CTA to the verification flow
document.querySelectorAll('[data-contact]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openVerify(el.getAttribute('data-contact'), el);
  });
});

if (overlay) {
  submitBtn.addEventListener('click', submitVerify);
  closeBtn.addEventListener('click', closeVerify);
  answerEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitVerify(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeVerify(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeVerify();
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
