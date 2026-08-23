'use strict';

const { site, headOffice, locations, services, priceGroups, credentials, process: steps, corporate } = require('./data');

const year = new Date().getFullYear();
const money = (n) => '£' + n.toFixed(2);

/* ---------------- icons (inline, no icon font) ---------------- */
const ic = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7s6 6.7 6 10.4a6 6 0 11-12 0C6 9.4 12 2.7 12 2.7z"/></svg>',
  hanger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V7a2.5 2.5 0 112.5 2.5"/><path d="M12 8l9.2 6.4a1.6 1.6 0 01-.9 2.9H3.7a1.6 1.6 0 01-.9-2.9L12 8z"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
};
const featIcons = [ic.clock, ic.pin, ic.scissors, ic.drop];

/* ---------------- components ---------------- */

function serviceCard(svc) {
  return `
          <div class="col svc-col">
            <article class="card">
              <a class="card__media" href="/${svc.slug}" tabindex="-1" aria-hidden="true">
                <img src="/img/${svc.image}.webp" alt="" width="1200" height="800" loading="lazy" decoding="async">
              </a>
              <div class="card__body">
                <h3><a href="/${svc.slug}">${svc.title}</a></h3>
                <span class="card__rule"></span>
                <p>${svc.card}</p>
                <div><a class="btn btn--outline btn--sm" href="/${svc.slug}">Read more</a></div>
              </div>
            </article>
          </div>`;
}

function priceTable(group) {
  return `
        <div class="table-wrap">
          <table class="ptable">
            <caption>${group.note}</caption>
            <thead>
              <tr><th scope="col">${group.title}</th><th scope="col">Price</th></tr>
            </thead>
            <tbody>
              ${group.items
                .map(
                  ([name, value, isFrom]) =>
                    `<tr><td>${name}</td><td><span class="amt">${
                      isFrom ? '<span class="from">from</span>' : ''
                    }${money(value)}</span></td></tr>`
                )
                .join('\n              ')}
            </tbody>
          </table>
        </div>`;
}

function locationInfo(loc) {
  return `
            <ul class="info">
              <li>${ic.pin}<div><strong>Address</strong><address>${loc.lines.join(', ')}</address></div></li>
              <li>${ic.phone}<div><strong>Telephone</strong><a href="tel:${loc.phoneHref}">${loc.phone}</a></div></li>
              <li>${ic.hanger}<div><strong>At this branch</strong>${loc.note}</div></li>
            </ul>
            <div class="mt-2"><a class="btn btn--outline btn--sm" href="${loc.maps}" target="_blank" rel="noopener">Get directions</a></div>`;
}

function mapEmbed(loc) {
  /* postcode first so Google centres on the shop rather than the district */
  const q = encodeURIComponent(loc.postcode + ', ' + loc.lines.join(', ') + ', London, UK');
  return `<div class="map-wrap"><iframe class="map" src="https://maps.google.com/maps?q=${q}&z=16&output=embed" title="Map showing ${site.name}, ${loc.name}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
}

/* ---------------- chrome ---------------- */

function header(current) {
  const isSvc = services.some((s) => s.slug === current);
  return `
  <div class="utility">
    <div class="container utility__in">
      <ul class="utility__list utility__list--phones">
        ${locations
          .map((l) => `<li>${ic.phone}<span>${l.name}</span> <a href="tel:${l.phoneHref}">${l.phone}</a></li>`)
          .join('\n        ')}
      </ul>
      <ul class="utility__list utility__list--email">
        <li>${ic.mail}<a href="mailto:${site.email}">${site.email}</a></li>
      </ul>
    </div>
  </div>

  <header class="header">
    <div class="container header__in">
      <a class="brand" href="/" aria-label="${site.name}, home">
        <img src="/img/logo-navy.png" alt="${site.name}" width="1000" height="229" fetchpriority="high">
      </a>

      <nav aria-label="Primary">
        <ul class="nav">
          <li><a href="/"${current === 'home' ? ' aria-current="page"' : ''}>Home</a></li>
          <li class="${isSvc ? 'on' : ''}">
            <a href="/dry-cleaning" aria-haspopup="true">Services <span class="caret" aria-hidden="true"></span></a>
            <div class="dropdown">
              ${services
                .map((s) => `<a href="/${s.slug}"${current === s.slug ? ' aria-current="page"' : ''}>${s.navTitle}</a>`)
                .join('\n              ')}
            </div>
          </li>
          <li><a href="/price-list"${current === 'price-list' ? ' aria-current="page"' : ''}>Price List</a></li>
          <li><a href="/contact-us"${current === 'contact-us' ? ' aria-current="page"' : ''}>Contact</a></li>
        </ul>
      </nav>

      <div class="header__btn"><a class="btn" href="/contact-us">Request a quote</a></div>

      <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <nav class="mnav" id="mnav" aria-label="Mobile">
      <a href="/">Home</a>
      ${services.map((s) => `<a class="sub" href="/${s.slug}">${s.navTitle}</a>`).join('\n      ')}
      <a href="/price-list">Price List</a>
      <a href="/contact-us">Contact</a>
      <a class="mnav__mail" href="mailto:${site.email}">${site.email}</a>
      <div class="mnav__cta"><a class="btn btn--block" href="/contact-us">Request a quote</a></div>
    </nav>
  </header>`;
}

function banner(title, crumb, bgImage) {
  return `
  <section class="banner"${bgImage ? ` style="background-image:url('/img/${bgImage}.webp')"` : ''}>
    <div class="container banner__in">
      <h1>${title}</h1>
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span aria-hidden="true">&rsaquo;</span>${crumb}
      </nav>
    </div>
  </section>`;
}

function ctaStrip() {
  return `
  <section class="cta-strip">
    <div class="container cta-strip__in">
      <div>
        <h2>Need something cleaned?</h2>
        <p>Call Canary Wharf on ${locations[0].phone} or London Bridge on ${locations[1].phone}.</p>
      </div>
      <div class="btn-group">
        <a class="btn btn--white" href="/contact-us">Request a quote</a>
        <a class="btn btn--light" href="/price-list">View prices</a>
      </div>
    </div>
  </section>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col col-3">
          <img class="footer__logo" src="/img/logo-white.png" alt="${site.name}" width="1000" height="229" loading="lazy">
          <p>${site.description}</p>
        </div>

        <div class="col col-3">
          <h3>Our Services</h3>
          <ul>
            ${services.map((s) => `<li><a href="/${s.slug}">${s.navTitle}</a></li>`).join('\n            ')}
          </ul>
        </div>

        <div class="col col-3">
          <h3>Information</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/price-list">Price List</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="mailto:${site.email}">${site.email}</a></li>
          </ul>
          <h3 style="margin-top:28px">Head Office</h3>
          <address>${headOffice.company}, ${headOffice.lines.join(', ')}<br>
            <a href="tel:${headOffice.phoneHref}">${headOffice.phone}</a></address>
        </div>

        <div class="col col-3">
          <h3>Our Shops</h3>
          ${locations
            .map(
              (l) => `<address><strong>${l.name}</strong><br>${l.lines.join(', ')}<br>
            <a href="tel:${l.phoneHref}">${l.phone}</a></address>`
            )
            .join('\n          ')}
        </div>
      </div>
    </div>
    <div class="footer__bar">
      <div class="container">
        <span>&copy; ${year} ${site.name}. All rights reserved.</span>
        <span>Established ${site.founded} &middot; Canary Wharf &middot; London Bridge</span>
      </div>
    </div>
  </footer>`;
}

function callBar() {
  return `
  <div class="callbar" id="callbar">
    <div class="callbar__grid">
      ${locations
        .map(
          (l) => `<a class="callbar__item" href="tel:${l.phoneHref}" aria-label="Call our ${l.name} shop on ${l.phone}">
        <span class="callbar__icon" aria-hidden="true">${ic.phone}</span>
        <span class="callbar__txt"><strong>${l.name}</strong><small>${l.postcode}</small></span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>`;
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
    graph.push({ '@type': 'WebSite', '@id': site.domain + '/#website', url: site.domain, name: site.name, publisher: { '@id': site.domain + '/#org' } });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/* ---------------- document ---------------- */

function layout({ title, description, path, body }) {
  const canonical = site.domain + (path === '/' ? '' : path);
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#1665A8">

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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap">
<link rel="stylesheet" href="/css/site.css">

<script type="application/ld+json">${jsonLd(path)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(path === '/' ? 'home' : path.replace(/^\//, ''))}
<main id="main">
${body}
</main>
${footer()}
${callBar()}
<script src="/js/site.js" defer></script>
</body>
</html>
`;
}

module.exports = {
  layout, header, footer, banner, ctaStrip, callBar,
  serviceCard, priceTable, locationInfo, mapEmbed, money, ic, featIcons,
  site, headOffice, locations, services, priceGroups, credentials, steps, corporate,
};
