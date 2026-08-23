'use strict';

const { site, headOffice, locations, services, priceGroups, credentials, process: steps, corporate } = require('./data');

const year = new Date().getFullYear();

/* ---------------- helpers ---------------- */

const money = (n) => '£' + n.toFixed(2);

function priceRow([name, value, isFrom]) {
  return `
          <li class="prow">
            <span class="prow__name">${name}</span>
            <span class="prow__dots" aria-hidden="true"></span>
            <span class="prow__price">${isFrom ? '<span class="prow__from">from</span>' : ''}${money(value)}</span>
          </li>`;
}

function priceTable(group) {
  return `
      <section class="ptable" id="${group.id}">
        <header class="ptable__head">
          <h3 class="ptable__title">${group.title}</h3>
        </header>
        <p class="ptable__note">${group.note}</p>
        <ul>${group.items.map(priceRow).join('')}
        </ul>
      </section>`;
}

function serviceCard(svc, i, arr) {
  const total = Array.isArray(arr) ? arr.length : 0;
  const wide = total > 3 && i === total - 1 && total % 3 === 1;
  return `
        <a class="svc reveal${wide ? ' svc--wide' : ''}" data-delay="${(i % 3) * 90}" href="/${svc.slug}">
          <div class="svc__media">
            <img src="/img/${svc.image}.webp" alt="${svc.alt}" width="1200" height="800" loading="lazy" decoding="async">
            <span class="svc__n">${String(i + 1).padStart(2, '0')}</span>
          </div>
          <div class="svc__body">
            <h3 class="svc__title">${svc.title}</h3>
            <p class="svc__text">${svc.card}</p>
            <span class="svc__more">Read more</span>
          </div>
        </a>`;
}

function locationCard(loc, i) {
  return `
        <article class="loc reveal" data-delay="${i * 100}">
          <h3 class="loc__name">${loc.name}</h3>
          <address class="loc__addr">${loc.lines.join('<br>')}</address>
          <span class="loc__note">${loc.note}</span>
          <a class="loc__tel" href="tel:${loc.phoneHref}">${loc.phone}</a>
          <div class="loc__links">
            <a class="tlink" href="${loc.maps}" target="_blank" rel="noopener">Get directions</a>
          </div>
        </article>`;
}

/* ---------------- chrome ---------------- */

function header(current) {
  const isSvc = services.some((s) => s.slug === current);
  const link = (href, label, key) =>
    `<a class="nav__link" href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`;

  return `
  <div class="topbar">
    <div class="container topbar__in">
      <span class="topbar__note">Two counters in the City, serving Canary Wharf and London Bridge since ${site.founded}</span>
      <div class="topbar__set">
        ${locations
          .map((l) => `<a href="tel:${l.phoneHref}">${l.name} <span aria-hidden="true">/</span> ${l.phone}</a>`)
          .join('')}
      </div>
    </div>
  </div>

  <header class="header">
    <div class="container header__in">
      <a class="brand" href="/" aria-label="${site.name}, home">
        <img src="/img/logo-navy.png" alt="${site.name}" width="1000" height="229" fetchpriority="high">
      </a>

      <nav class="nav" aria-label="Primary">
        ${link('/', 'Home', 'home')}
        <div class="nav__item nav__item--has">
          <a class="nav__link" href="/dry-cleaning"${isSvc ? ' aria-current="page"' : ''}>Services</a>
          <div class="submenu">
            ${services
              .map(
                (s) =>
                  `<a href="/${s.slug}"${current === s.slug ? ' aria-current="page"' : ''}>${s.navTitle}</a>`
              )
              .join('')}
          </div>
        </div>
        ${link('/price-list', 'Price List', 'price-list')}
        ${link('/contact-us', 'Contact', 'contact-us')}
      </nav>

      <div class="header__cta">
        <a class="btn" href="/contact-us">Get in touch</a>
      </div>

      <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer__top">
      <img src="/img/logo-white.png" alt="${site.name}" width="1000" height="229">
      <button class="drawer__close" type="button" aria-label="Close menu">&times;</button>
    </div>
    <nav aria-label="Mobile">
      <a href="/">Home</a>
      ${services.map((s) => `<a class="sub" href="/${s.slug}">${s.navTitle}</a>`).join('\n      ')}
      <a href="/price-list">Price List</a>
      <a href="/contact-us">Contact</a>
    </nav>
    <div class="drawer__foot">
      ${locations.map((l) => `<a href="tel:${l.phoneHref}">${l.name}: ${l.phone}</a>`).join('')}
      <a href="mailto:${site.email}">${site.email}</a>
    </div>
  </div>`;
}

function ctaBand() {
  return `
  <section class="section section--tight cta">
    <div class="container cta__in">
      <div>
        <span class="eyebrow">Contact</span>
        <h2 class="display h2">Come and see us</h2>
        <p class="lede mt-1" style="max-width:52ch">Drop in at Canary Wharf or London Bridge, or send us a note and we will come back to you.</p>
      </div>
      <div class="btn-row">
        <a class="btn" href="/contact-us">Make an enquiry</a>
        <a class="btn btn--ghost" href="/price-list">View prices</a>
      </div>
    </div>
  </section>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <img class="footer__logo" src="/img/logo-white.png" alt="${site.name}" width="1000" height="229" loading="lazy">
          <p style="max-width:34ch">${site.description}</p>
        </div>

        <div>
          <h3>Services</h3>
          <ul>
            ${services.map((s) => `<li><a href="/${s.slug}">${s.navTitle}</a></li>`).join('\n            ')}
          </ul>
        </div>

        <div>
          <h3>Information</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/price-list">Price List</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="mailto:${site.email}">${site.email}</a></li>
          </ul>
        </div>

        <div>
          <h3>Find us</h3>
          ${locations
            .map(
              (l) => `<address style="margin-bottom:1.4rem">
            <strong style="color:#fff;font-weight:500">${l.name}</strong><br>
            ${l.lines.join(', ')}<br>
            <a class="footer__tel" href="tel:${l.phoneHref}">${l.phone}</a>
          </address>`
            )
            .join('\n          ')}
          <h3 style="margin-top:2rem">${headOffice.name}</h3>
          <address>
            ${headOffice.company}, ${headOffice.lines.join(', ')}<br>
            <a href="tel:${headOffice.phoneHref}">${headOffice.phone}</a>
          </address>
        </div>
      </div>

      <div class="footer__bar">
        <span>&copy; ${year} ${site.name}. All rights reserved.</span>
        <span>Established ${site.founded} &middot; Canary Wharf &middot; London Bridge</span>
      </div>
    </div>
  </footer>`;
}

/* ---------------- structured data ---------------- */

function jsonLd(path) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': site.domain + '/#org',
      name: site.name,
      url: site.domain,
      email: site.email,
      foundingDate: String(site.founded),
      description: site.description,
      logo: site.domain + '/img/logo-navy.png',
    },
    ...locations.map((l) => ({
      '@type': 'DryCleaningOrLaundry',
      '@id': site.domain + '/#' + l.id,
      name: site.name + ' - ' + l.name,
      parentOrganization: { '@id': site.domain + '/#org' },
      telephone: l.phone,
      email: site.email,
      url: site.domain,
      address: {
        '@type': 'PostalAddress',
        streetAddress: l.lines.slice(0, -1).join(', '),
        addressLocality: 'London',
        postalCode: l.postcode,
        addressCountry: 'GB',
      },
      areaServed: 'London',
    })),
  ];
  if (path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': site.domain + '/#website',
      url: site.domain,
      name: site.name,
      publisher: { '@id': site.domain + '/#org' },
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/* ---------------- document ---------------- */

function layout({ title, description, path, body, bodyClass = '' }) {
  const canonical = site.domain + (path === '/' ? '' : path);
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0F2038">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/logo-navy.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap">
<link rel="stylesheet" href="/css/site.css">

<script type="application/ld+json">${jsonLd(path)}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
${header(path === '/' ? 'home' : path.replace(/^\//, ''))}
<main id="main">
${body}
</main>
${footer()}
<script src="/js/site.js" defer></script>
</body>
</html>
`;
}

module.exports = {
  layout, header, footer, ctaBand,
  serviceCard, locationCard, priceTable, priceRow, money,
  site, headOffice, locations, services, priceGroups, credentials, steps, corporate,
};
