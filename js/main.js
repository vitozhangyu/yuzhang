// main.js - Handles dark mode, language toggle, smooth scroll, and animations

document.addEventListener('DOMContentLoaded', function () {
  // Dark mode toggle
  const darkToggle = document.getElementById('dark-toggle');
  darkToggle && darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });
  // Load dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }

  // Language toggle (EN/中文)
  const langToggle = document.getElementById('lang-toggle');
  let lang = localStorage.getItem('lang') || 'en';
  langToggle && langToggle.addEventListener('click', () => {
    lang = lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lang', lang);
    setLanguage(lang);
  });
  if (lang !== 'en') setLanguage(lang);

  // Simple language dictionary (expand as needed)
  const translations = {
    en: {
      homeTitle: "Hi, I'm Your Name",
      homeTagline: "A Passionate Designer Crafting Digital Experiences",
      about: "About Me",
      contact: "Contact Me",
      downloadCV: "Download CV",
      // ...add more as needed
    },
    zh: {
      homeTitle: "你好，我是Your Name",
      homeTagline: "热爱设计，专注数字体验",
      about: "关于我",
      contact: "联系我",
      downloadCV: "下载简历",
      // ...add more as needed
    }
  };
  function setLanguage(lang) {
    // Home page
    const homeTitle = document.getElementById('home-title');
    const homeTagline = document.getElementById('home-tagline');
    if (homeTitle) homeTitle.textContent = translations[lang].homeTitle;
    if (homeTagline) homeTagline.textContent = translations[lang].homeTagline;
    // About page
    const aboutH1 = document.querySelector('.about-section h1');
    if (aboutH1) aboutH1.textContent = translations[lang].about;
    const downloadBtn = document.querySelector('.btn');
    if (downloadBtn) downloadBtn.textContent = translations[lang].downloadCV;
    // Contact page
    const contactH1 = document.querySelector('.contact-section h1');
    if (contactH1) contactH1.textContent = translations[lang].contact;
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Scroll-triggered fade-in animation
  const fadeEls = document.querySelectorAll('.fade-in');
  function handleScroll() {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}); 