/* City of London Dry Cleaners - progressive enhancement only */
(function () {
  'use strict';

  /* ---- sticky header state ---- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile drawer ---- */
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');
  var closeBtn = document.querySelector('.drawer__close');

  function setDrawer(open) {
    if (!drawer || !burger) return;
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) first.focus();
    } else {
      burger.focus();
    }
  }

  if (burger) burger.addEventListener('click', function () {
    setDrawer(!drawer.classList.contains('is-open'));
  });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) setDrawer(false);
  });
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setDrawer(false);
    });
  }

  /* ---- scroll reveal ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---- contact form ---- */
  var form = document.getElementById('enquiry');
  if (!form) return;

  var success = document.getElementById('enquiry-success');
  var fields = ['name', 'email', 'phone', 'service', 'message'];

  function fieldError(el, msg) {
    var box = document.getElementById(el.id + '-err');
    if (box) box.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function validateOne(el) {
    var v = (el.value || '').trim();
    if (el.hasAttribute('required') && !v) {
      return fieldError(el, 'This field is required.');
    }
    if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      return fieldError(el, 'Please enter a valid email address.');
    }
    if (el.id === 'phone' && v && !/^[0-9+()\s-]{7,}$/.test(v)) {
      return fieldError(el, 'Please enter a valid phone number.');
    }
    return fieldError(el, '');
  }

  fields.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', function () { validateOne(el); });
    el.addEventListener('input', function () {
      if (el.getAttribute('aria-invalid') === 'true') validateOne(el);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* honeypot */
    var trap = document.getElementById('company-website');
    if (trap && trap.value) return;

    var ok = true;
    var firstBad = null;
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (!validateOne(el)) { ok = false; if (!firstBad) firstBad = el; }
    });
    if (!ok) { if (firstBad) firstBad.focus(); return; }

    var get = function (id) {
      var el = document.getElementById(id);
      return el ? (el.value || '').trim() : '';
    };

    var body = [
      'Name: ' + get('name'),
      'Email: ' + get('email'),
      'Phone: ' + get('phone'),
      'Service: ' + get('service'),
      'Preferred branch: ' + get('branch'),
      '',
      get('message')
    ].join('\n');

    var href = 'mailto:' + form.getAttribute('data-to') +
      '?subject=' + encodeURIComponent('Website enquiry: ' + get('service')) +
      '&body=' + encodeURIComponent(body);

    window.location.href = href;

    if (success) {
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus();
      success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  });
})();
