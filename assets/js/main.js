const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

const setMenuOpen = (open) => {
  navMenu?.classList.toggle('show-menu', open);
  navToggle?.setAttribute('aria-expanded', String(open));
  navToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
};

navToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  setMenuOpen(!navMenu?.classList.contains('show-menu'));
});
navClose?.addEventListener('click', () => setMenuOpen(false));
navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

document.addEventListener('click', (event) => {
  if (navMenu?.classList.contains('show-menu') && !navMenu.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) setMenuOpen(false);
});

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.querySelector('i').className = selectedIcon;
}

themeButton?.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.querySelector('i').classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', themeButton.querySelector('i').className);
});

const scrollHeader = () => {
  const header = document.getElementById('header');
  window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link?.classList.add('active-link');
    } else {
      link?.classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
