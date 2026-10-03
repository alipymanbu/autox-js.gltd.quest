(function () {
  'use strict';

  // 移动端折叠导航
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // 网盘按钮绑定（唯一口径：links.js 的 SITE_LINKS.download）
  var panUrl = window.SITE_LINKS && window.SITE_LINKS.download;
  document.querySelectorAll('[data-link="download"]').forEach(function (el) {
    el.addEventListener('click', function (ev) {
      if (panUrl) {
        ev.preventDefault();
        window.open(panUrl, '_blank', 'noopener');
      }
    });
  });

  // 返回顶部按钮：下滚后出现
  var topBtn = document.querySelector('.fbtn-top');
  if (topBtn) {
    var onScroll = function () {
      topBtn.classList.toggle('show', window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 渐显（尊重 prefers-reduced-motion）
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var faders = document.querySelectorAll('.fade');
  if (!reduced && 'IntersectionObserver' in window && faders.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('in'); });
  }
})();
