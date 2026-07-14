/* =========================================================
   Sachin Deep Cleaning — interactivity
   - Theme toggle (light/dark) with localStorage persistence
   - Mobile sticky call/whatsapp bar (injected on every page)
   - Mobile menu, footer year, FAQ accordion, scroll reveal
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  // The button is normally present in the HTML header; if not, inject one.
  var btn = document.getElementById('themeToggle');
  var nav = document.querySelector('.nav');
  if (!btn && nav) {
    btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.id = 'themeToggle';
    btn.type = 'button';
    nav.appendChild(btn);
  }
  if (btn) {
    function syncIcon() {
      var t = document.documentElement.getAttribute('data-theme') || 'light';
      btn.textContent = t === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    syncIcon();
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') || 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncIcon();
    });
  }

  /* ---------- Mobile sticky call / whatsapp bar ---------- */
  if (!document.getElementById('mobileBar')) {
    var bar = document.createElement('div');
    bar.className = 'mobile-bar';
    bar.id = 'mobileBar';
    bar.innerHTML =
      '<a href="tel:+919267905943" class="mb-btn mb-call" aria-label="Call Sachin Deep Cleaning">' +
        '<span class="mb-icon">📞</span><span>Call</span></a>' +
      '<a href="https://wa.me/919267905943" target="_blank" rel="noopener" class="mb-btn mb-wa" aria-label="Chat on WhatsApp">' +
        '<span class="mb-icon">💬</span><span>WhatsApp</span></a>';
    document.body.appendChild(bar);
  }

  /* ---------- Mobile menu toggle ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      q.parentElement.classList.toggle('open');
    });
  });

  /* ---------- Scroll reveal (progressive enhancement) ---------- */
  var els = document.querySelectorAll('.card, .feature, .step, .section-head, .faq-item, .two-col > div, .service-list li');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduceMotion) {
    els.forEach(function (e) { e.classList.add('visible'); });
  } else {
    els.forEach(function (e) { e.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }
})();
