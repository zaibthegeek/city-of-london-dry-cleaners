/* City of London Dry Cleaners - progressive enhancement only */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- mobile nav ---------------- */
  var burger = document.querySelector('.burger');
  var mnav = document.getElementById('mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mnav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* ---------------- sticky call bar ----------------
     Visible only between the hero and the footer, so it never competes with
     the hero buttons and never sits on top of the footer's own numbers. */
  var callbar = document.getElementById('callbar');
  if (callbar) {
    var hero = document.querySelector('.slider') || document.querySelector('.banner');
    var foot = document.querySelector('.footer');
    var pastHero = !hero;
    var atFooter = false;

    var sync = function () {
      callbar.classList.toggle('is-visible', pastHero && !atFooter);
    };

    if ('IntersectionObserver' in window) {
      if (hero) {
        new IntersectionObserver(function (entries) {
          pastHero = !entries[0].isIntersecting;
          sync();
        }, { threshold: 0 }).observe(hero);
      }
      if (foot) {
        new IntersectionObserver(function (entries) {
          atFooter = entries[0].isIntersecting;
          sync();
        }, { threshold: 0 }).observe(foot);
      }
    } else {
      window.addEventListener('scroll', function () {
        pastHero = window.scrollY > (hero ? hero.offsetHeight : 400);
        var d = document.documentElement;
        atFooter = window.innerHeight + window.scrollY >= d.scrollHeight - (foot ? foot.offsetHeight : 0);
        sync();
      }, { passive: true });
    }
    sync();
  }

  /* ---------------- slider ---------------- */
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = [].slice.call(slider.querySelectorAll('.slide'));
    var dots = [].slice.call(slider.querySelectorAll('.slider__dots button'));
    var prev = slider.querySelector('.slider__arrow--prev');
    var next = slider.querySelector('.slider__arrow--next');
    var index = 0;
    var timer = null;
    var DELAY = 6500;

    function show(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === index;
        s.classList.toggle('is-active', on);
        if (on) s.removeAttribute('aria-hidden');
        else s.setAttribute('aria-hidden', 'true');
      });
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', String(i === index));
      });
    }

    function start() {
      if (reduce || slides.length < 2) return;
      stop();
      timer = setInterval(function () { show(index + 1); }, DELAY);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (prev) prev.addEventListener('click', function () { show(index - 1); start(); });
    if (next) next.addEventListener('click', function () { show(index + 1); start(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); start(); });
    });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { show(index - 1); start(); }
      if (e.key === 'ArrowRight') { show(index + 1); start(); }
    });

    show(0);
    start();
  }

  /* ---------------- contact form ---------------- */
  var form = document.getElementById('enquiry');
  if (!form) return;

  var success = document.getElementById('enquiry-success');
  var fields = ['name', 'email', 'phone', 'service', 'message'];

  function setError(el, msg) {
    var box = document.getElementById(el.id + '-err');
    if (box) box.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function validate(el) {
    var v = (el.value || '').trim();
    if (el.hasAttribute('required') && !v) return setError(el, 'This field is required.');
    if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      return setError(el, 'Please enter a valid email address.');
    }
    if (el.id === 'phone' && v && !/^[0-9+()\s-]{7,}$/.test(v)) {
      return setError(el, 'Please enter a valid phone number.');
    }
    return setError(el, '');
  }

  fields.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', function () { validate(el); });
    el.addEventListener('input', function () {
      if (el.getAttribute('aria-invalid') === 'true') validate(el);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var trap = document.getElementById('company-website');
    if (trap && trap.value) return;

    var ok = true, firstBad = null;
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (!validate(el)) { ok = false; if (!firstBad) firstBad = el; }
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

    window.location.href = 'mailto:' + form.getAttribute('data-to') +
      '?subject=' + encodeURIComponent('Website enquiry: ' + get('service')) +
      '&body=' + encodeURIComponent(body);

    if (success) {
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus();
    }
  });
})();
