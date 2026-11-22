const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

const setMenuOpen = (open) => {
  navMenu?.classList.toggle('show-menu', open);
  navToggle?.setAttribute('aria-expanded', String(open));
  navToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (open) navMenu?.querySelector('.nav__link')?.focus();
};
navToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  setMenuOpen(!navMenu?.classList.contains('show-menu'));
});
navClose?.addEventListener('click', () => { setMenuOpen(false); navToggle?.focus(); });
navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('click', (event) => {
  if (navMenu?.classList.contains('show-menu') && !navMenu.contains(event.target) && !navToggle?.contains(event.target)) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navMenu?.classList.contains('show-menu')) { setMenuOpen(false); navToggle?.focus(); }
});
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) setMenuOpen(false);
});

const themeButton = document.getElementById('theme-button');
const themeIcon = themeButton?.querySelector('i');
const savedTheme = localStorage.getItem('selected-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-theme');
themeIcon?.classList.toggle('ri-sun-line', savedTheme === 'dark');
themeIcon?.classList.toggle('ri-moon-line', savedTheme !== 'dark');
themeButton?.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-theme');
  themeIcon?.classList.toggle('ri-sun-line', dark);
  themeIcon?.classList.toggle('ri-moon-line', !dark);
  localStorage.setItem('selected-theme', dark ? 'dark' : 'light');
});

const header = document.getElementById('header');
const sections = [...document.querySelectorAll('main section[id]')];
const updateScrollUI = () => {
  header?.classList.toggle('scroll-header', window.scrollY >= 50);
  const currentY = window.scrollY + (header?.offsetHeight || 64) + 30;
  let active = sections[0]?.id;
  for (const section of sections) {
    if (currentY >= section.offsetTop) active = section.id;
  }
  navLinks.forEach(link => {
    const current = link.getAttribute('href') === '#' + active;
    link.classList.toggle('active-link', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 24px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('show'));
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
