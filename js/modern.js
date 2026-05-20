(function () {
  'use strict';

  /* ── Page Loader ───────────────────────────────────── */
  window.addEventListener('load', function () {
    var loader = document.querySelector('.page-loader');
    if (loader) setTimeout(function () { loader.classList.add('hidden'); }, 250);
  });

  /* ── Scroll Progress Bar ───────────────────────────── */
  var bar = document.querySelector('.scroll-progress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var s = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (h > 0 ? (s / h) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ── Navbar: transparent → glass on scroll ─────────── */
  var navBar    = document.querySelector('.nav-bar');
  var topbarEl  = document.querySelector('.topbar-glass-hero');
  var TOPBAR_H  = 40; // topbar pixel height on desktop

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (!navBar) return;

    /* Shift navbar to top once topbar has scrolled away */
    if (y >= TOPBAR_H) {
      document.body.classList.add('topbar-scrolled');
      if (topbarEl) topbarEl.classList.add('scrolled-away');
    } else {
      document.body.classList.remove('topbar-scrolled');
      if (topbarEl) topbarEl.classList.remove('scrolled-away');
    }

    /* Glass effect after 80 px */
    if (y > 80) {
      navBar.classList.add('nav-scrolled');
      navBar.classList.remove('nav-transparent');
    } else {
      navBar.classList.remove('nav-scrolled');
      navBar.classList.add('nav-transparent');
    }
  }

  if (navBar) {
    onScroll(); // run once on load
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Intersection Observer: scroll animations ──────── */
  var targets = document.querySelectorAll('[data-animate]');
  if (targets.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      /* Fallback for old browsers */
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ── Subtle mouse-parallax on ambient blobs ────────── */
  var blobs = document.querySelectorAll('.ambient-blob');
  if (blobs.length) {
    document.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth  / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      blobs.forEach(function (b, i) {
        var f = (i + 1) * 12;
        b.style.transform = 'translate(' + (dx * f) + 'px,' + (dy * f) + 'px)';
      });
    }, { passive: true });
  }

})();
