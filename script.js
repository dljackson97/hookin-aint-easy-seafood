// Hookin' Ain't Easy Seafood Company — small, framework-free enhancements (mockup build)

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal — progressive enhancement, content is fully visible without JS
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// One-time promo toast, bottom-right, shows once per browser ever (localStorage),
// regardless of whether it's manually closed or the visitor just navigates away.
// The mobile sticky contact bar stays hidden until the toast has been shown
// and dismissed, so the two never stack up and clutter the bottom of the screen,
// unless the toast has already been seen on a prior visit, in which case the
// bar is free to show right away since the toast won't appear again.
const promoToast = document.getElementById('promoToast');
const promoClose = document.getElementById('promoToastClose');
const stickyCall = document.querySelector('.sticky-call');

function revealStickyCall() {
  if (stickyCall) stickyCall.classList.add('show');
  document.body.classList.add('sticky-call-visible');
}

if (promoToast) {
  const seenKey = 'hookinAintEasyPromoSeen';
  if (!localStorage.getItem(seenKey)) {
    localStorage.setItem(seenKey, '1');
    setTimeout(() => promoToast.classList.add('show'), 3200);
  } else {
    revealStickyCall();
  }
  if (promoClose) {
    promoClose.addEventListener('click', () => {
      promoToast.classList.remove('show');
      revealStickyCall();
    });
  }
} else {
  revealStickyCall();
}
