'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const T = require('./src/templates');
const {
  layout, banner, ctaStrip, serviceCard, priceTable, locationInfo, mapEmbed, ic, featIcons, faqSection,
  site, headOffice, locations, services, priceGroups, credentials, steps, corporate,
} = T;
const { faqs } = require('./src/data');

const OUT = path.join(__dirname, 'dist');
const STATIC = path.join(__dirname, 'static');

const slides = [
  {
    img: 'slide-1',
    eyebrow: 'Established 1994',
    title: 'Dry Cleaning in the City of London',
    text: 'The highest quality shirt, dry cleaning and laundry service in Canary Wharf.',
    cta: ['/price-list', 'View our prices'],
  },
  {
    img: 'slide-2',
    eyebrow: 'Shirt service',
    title: 'Your shirts deserve the very best',
    text: 'Cuffs and collars pre-treated, stains spotted by hand, every shirt hand finished and returned packaged and protected.',
    cta: ['/shirt-service', 'About our shirt service'],
  },
  {
    img: 'slide-3',
    eyebrow: 'Laundry',
    title: 'Cleaned, folded and packaged',
    text: 'Bed linen and table linen, from sheets and duvets to tablecloths and napkins, cleaned to the highest standard.',
    cta: ['/laundry', 'About our laundry'],
  },
];

/* ---------------------------------------------------------------- home */

function homePage() {
  const body = `
  <section class="slider" aria-roledescription="carousel" aria-label="Featured services">
    <div class="slider__stage">
      ${slides
        .map(
          (s, i) => `
      <div class="slide${i === 0 ? ' is-active' : ''}" style="background-image:url('/img/${s.img}.webp')"
           role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}"${i === 0 ? '' : ' aria-hidden="true"'}>
        <div class="container">
          <div class="slide__in">
            <span class="slide__eyebrow">${s.eyebrow}</span>
            ${i === 0 ? '<h1>' : '<h2>'}${s.title}${i === 0 ? '</h1>' : '</h2>'}
            <p>${s.text}</p>
            <div class="btn-group">
              <a class="btn" href="/contact-us">Request a quote</a>
              <a class="btn btn--light" href="${s.cta[0]}">${s.cta[1]}</a>
            </div>
          </div>
        </div>
      </div>`
        )
        .join('')}
      <button class="slider__arrow slider__arrow--prev" type="button" aria-label="Previous slide">${ic.chevL}</button>
      <button class="slider__arrow slider__arrow--next" type="button" aria-label="Next slide">${ic.chevR}</button>
      <div class="slider__dots" role="tablist" aria-label="Choose slide">
        ${slides
          .map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}"></button>`)
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="row">
        ${credentials
          .map(
            (c, i) => `<div class="col col-3">
          <div class="feat">
            <div class="feat__icon">${featIcons[i]}</div>
            <h3>${c.figure}</h3>
            <p>${c.label}</p>
          </div>
        </div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--grey">
    <div class="container">
      <div class="row">
        <div class="col col-6">
          <div class="sec-head">
            <h2>What do you expect from a dry cleaner?</h2>
            <span class="bar"></span>
          </div>
          <p class="lead">Expertise, reliability, care, convenience, flexibility, comprehensive services, attention to detail? Welcome to the world of City of London Dry Cleaners.</p>
          <p>We are proud to be the dry cleaner of choice to a loyal list of customers who appreciate us for what we do. Whatever the cleaning requirement, we have the experienced personnel and the up-to-the-minute technology.</p>
          <p>Apart from the usual dry cleaning items such as suits, dresses and trousers, we also clean household items such as curtains and upholstery, and we have a specialist section for designer wear and wedding dresses. Our facilities allow us to clean in perchloroethylene, hydrocarbon and aqueous.</p>
          <div class="btn-group mt-2"><a class="btn" href="/dry-cleaning">More about dry cleaning</a></div>
        </div>
        <div class="col col-6">
          <div class="sec-head">
            <h2>How we work</h2>
            <span class="bar"></span>
          </div>
          <ul class="info">
            ${steps
              .map(
                (s) => `<li>${ic.hanger}<div><strong>${s.n}. ${s.title}</strong>${s.text}</div></li>`
              )
              .join('\n            ')}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="services">
    <div class="container">
      <div class="sec-head sec-head--center">
        <h2>Our Services</h2>
        <span class="bar"></span>
        <p>Everything we clean, from a business shirt to a wedding dress, curtains to a leather jacket.</p>
      </div>
      <div class="row">
${services.map(serviceCard).join('')}${serviceCard({
  slug: 'contact-us',
  title: 'Contact Us',
  image: 'contact',
  alt: 'Contact City of London Dry Cleaners',
  card: 'You can contact us through our online contact form, by email, by phone, or by visiting one of our shops. We will be happy to help.',
})}
      </div>
    </div>
  </section>

  <section class="banner" style="background-image:url('/img/corporate-band.webp')">
    <div class="container" style="position:relative;z-index:2;padding-block:24px">
      <div class="row">
        <div class="col col-8">
          <div class="sec-head sec-head--light">
            <h2>${corporate.title}</h2>
            <span class="bar"></span>
          </div>
          ${corporate.body.map((p) => `<p style="color:rgba(255,255,255,.88)">${p}</p>`).join('\n          ')}
          <p style="color:#fff;font-weight:600;margin-top:18px">${corporate.sectors.join(' &middot; ')}</p>
          <div class="btn-group mt-2"><a class="btn btn--white" href="/corporate-accounts">Corporate accounts</a>
            <a class="btn btn--light" href="/contact-us">Talk to us</a></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--grey">
    <div class="container">
      <div class="sec-head sec-head--center">
        <h2>Price List</h2>
        <span class="bar"></span>
        <p>Every price we charge is published on the site. Alterations are quoted at the counter once the tailor has seen the piece.</p>
      </div>
      <div class="row">
        <div class="col col-6">${priceTable(priceGroups[0])}</div>
        <div class="col col-6">
          ${priceTable(priceGroups[1])}
          ${priceTable(priceGroups[2])}
        </div>
      </div>
      <div style="text-align:center"><a class="btn" href="/price-list">See the full price list</a></div>
    </div>
  </section>

${faqSection()}

  <section class="section">
    <div class="container">
      <div class="sec-head sec-head--center">
        <h2>Where To Find Us</h2>
        <span class="bar"></span>
        <p>Two counters in the City. Walk in at either, or call the branch direct.</p>
      </div>
      <div class="row">
        ${locations
          .map(
            (l) => `<div class="col col-6">
          <div class="panel">
            <div class="panel__head"><h3>${l.name}</h3></div>
            <div class="panel__body">
              ${locationInfo(l)}
            </div>
          </div>
          ${mapEmbed(l)}
        </div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

${ctaStrip()}`;

  return layout({
    title: `${site.name} | Dry Cleaning in Canary Wharf & London Bridge`,
    description: site.description,
    path: '/',
    body,
  });
}

/* ---------------------------------------------- shared right sidebar */

function sidebar(current) {
  return `
        <div class="col col-4 sidebar">
          <div class="panel">
            <div class="panel__head"><h3>Our Services</h3></div>
            <ul class="sidelist">
              ${services
                .map(
                  (s) =>
                    `<li><a href="/${s.slug}"${current === s.slug ? ' aria-current="page"' : ''}>${s.navTitle}</a></li>`
                )
                .join('\n              ')}
            </ul>
          </div>

          <div class="panel panel--blue">
            <div class="panel__head"><h3>Request a quote</h3></div>
            <div class="panel__body">
              <p>Call the branch direct, or send us the details and we will come back to you.</p>
              <ul class="info">
                ${locations
                  .map(
                    (l) =>
                      `<li>${ic.phone}<div><strong>${l.name}</strong><a href="tel:${l.phoneHref}">${l.phone}</a></div></li>`
                  )
                  .join('\n                ')}
                <li>${ic.mail}<div><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></div></li>
              </ul>
              <div class="mt-2"><a class="btn btn--block" href="/contact-us">Contact us</a></div>
            </div>
          </div>

          <div class="panel">
            <div class="panel__head"><h3>Price List</h3></div>
            <div class="panel__body">
              <p>All our published prices for dry cleaning, shirts, laundry and alterations.</p>
              <a class="btn btn--outline btn--block" href="/price-list">View prices</a>
            </div>
          </div>
        </div>`;
}

/* ------------------------------------------------------------ services */

function servicePage(svc) {
  const group = svc.priceGroup ? priceGroups.find((g) => g.id === svc.priceGroup) : null;

  const body = `
${banner(svc.title, svc.title, svc.image)}

  <section class="section">
    <div class="container">
      <div class="row">
        <div class="col col-8">
          <img src="/img/${svc.image}.webp" alt="${svc.alt}" width="1200" height="800"
               style="border:1px solid var(--line);border-radius:var(--radius);margin-bottom:28px" fetchpriority="high">

          <div class="sec-head">
            <h2>${svc.title}</h2>
            <span class="bar"></span>
          </div>
          ${svc.body.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('\n          ')}

          <div class="panel mt-2">
            <div class="panel__head"><h3>What this includes</h3></div>
            <div class="panel__body">
              <ul class="checks">
                ${svc.points.map((p) => `<li>${p}</li>`).join('\n                ')}
              </ul>
            </div>
          </div>

          ${group ? `
          <div class="sec-head" style="margin-top:36px">
            <h2>${group.title} Prices</h2>
            <span class="bar"></span>
          </div>
          ${priceTable(group)}
          <a class="btn btn--outline" href="/price-list">View the full price list</a>` : ''}
        </div>
${sidebar(svc.slug)}
      </div>
    </div>
  </section>

${ctaStrip()}`;

  return layout({
    title: `${svc.title} | ${site.name}`,
    description: svc.lede,
    path: '/' + svc.slug,
    pageName: svc.title,
    body,
  });
}

/* ---------------------------------------------------------- price list */

function pricePage() {
  const body = `
${banner('Price List', 'Price List', 'dry-cleaning')}

  <section class="section">
    <div class="container">
      <div class="row">
        <div class="col col-8">
          <div class="sec-head">
            <h2>Our Published Prices</h2>
            <span class="bar"></span>
            <p>Every price we charge, in full. Bring anything unusual to the counter and we will quote it before we start.</p>
          </div>

          <div class="pfilter" id="pfilter" hidden>
            <label class="sr-only" for="pfilter-input">Search the price list</label>
            <span class="pfilter__icon" aria-hidden="true">${ic.search}</span>
            <input id="pfilter-input" type="search" placeholder="Search for an item, for example suit, shirt, duvet" autocomplete="off">
            <button class="pfilter__clear" id="pfilter-clear" type="button" aria-label="Clear search" hidden>&times;</button>
          </div>
          <p class="pfilter__count" id="pfilter-count" role="status" aria-live="polite"></p>

          ${priceGroups.map(priceTable).join('\n          ')}

          <div class="alert">
            <h3>A note on pricing</h3>
            <p>Prices marked <em>from</em> are a starting price and vary with the garment, the cloth and the finish required. Specialist cleaning, curtains, upholstery, suede and leather are quoted individually, as the piece and the fabric decide the method.</p>
            <p class="mb-0">Please call ${locations[0].name} on <a href="tel:${locations[0].phoneHref}">${locations[0].phone}</a> or ${locations[1].name} on <a href="tel:${locations[1].phoneHref}">${locations[1].phone}</a> for a quotation.</p>
          </div>
        </div>
${sidebar('price-list')}
      </div>
    </div>
  </section>

${ctaStrip()}`;

  return layout({
    title: `Price List | ${site.name}`,
    description:
      'Full published price list for dry cleaning, shirt service, laundry, repairs and alterations at City of London Dry Cleaners, Canary Wharf and London Bridge.',
    path: '/price-list',
    pageName: 'Price List',
    body,
  });
}

/* ------------------------------------------------------------- contact */

function contactPage() {
  const body = `
${banner('Contact Us', 'Contact Us', 'shirt-service')}

  <section class="section">
    <div class="container">
      <div class="sec-head sec-head--center">
        <h2>Our Shops</h2>
        <span class="bar"></span>
        <p>You can contact us through the form below, by email, by phone, or by visiting one of our shops. We will be happy to help.</p>
      </div>
      <div class="row">
        ${locations
          .map(
            (l) => `<div class="col col-6">
          <div class="panel">
            <div class="panel__head"><h3>${l.name}</h3></div>
            <div class="panel__body">${locationInfo(l)}</div>
          </div>
          ${mapEmbed(l)}
        </div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--grey">
    <div class="container">
      <div class="row">
        <div class="col col-8">
          <div class="sec-head">
            <h2>Make An Enquiry</h2>
            <span class="bar"></span>
            <p>Fill in the form and we will be in touch as soon as possible. If it is urgent, please call the branch directly.</p>
          </div>

          <form id="enquiry" data-to="${site.email}" novalidate>
            <div class="row">
              <div class="col col-6">
                <div class="field">
                  <label for="name">Your name <span class="req" aria-hidden="true">*</span></label>
                  <input id="name" name="name" type="text" autocomplete="name" required aria-describedby="name-err">
                  <p class="field__err" id="name-err" role="alert"></p>
                </div>
              </div>
              <div class="col col-6">
                <div class="field">
                  <label for="email">Email <span class="req" aria-hidden="true">*</span></label>
                  <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err">
                  <p class="field__err" id="email-err" role="alert"></p>
                </div>
              </div>
              <div class="col col-6">
                <div class="field">
                  <label for="phone">Telephone <span class="req" aria-hidden="true">*</span></label>
                  <input id="phone" name="phone" type="tel" autocomplete="tel" required aria-describedby="phone-err">
                  <p class="field__err" id="phone-err" role="alert"></p>
                </div>
              </div>
              <div class="col col-6">
                <div class="field">
                  <label for="branch">Preferred branch</label>
                  <select id="branch" name="branch">
                    ${locations.map((l) => `<option value="${l.name}">${l.name}</option>`).join('\n                    ')}
                    <option value="Either">Either branch</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label for="service">Service required <span class="req" aria-hidden="true">*</span></label>
              <select id="service" name="service" required aria-describedby="service-err">
                <option value="">Please choose</option>
                ${services.map((s) => `<option value="${s.title}">${s.title}</option>`).join('\n                ')}
                <option value="Corporate account">Corporate account</option>
                <option value="Something else">Something else</option>
              </select>
              <p class="field__err" id="service-err" role="alert"></p>
            </div>

            <div class="field">
              <label for="message">Your message <span class="req" aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required aria-describedby="message-err"></textarea>
              <p class="field__err" id="message-err" role="alert"></p>
            </div>

            <div class="sr-only" aria-hidden="true">
              <label for="company-website">Leave this field empty</label>
              <input id="company-website" name="company-website" type="text" tabindex="-1" autocomplete="off">
            </div>

            <button class="btn" type="submit">Send enquiry</button>
            <p class="form-note">Fields marked with an asterisk are required. Your details are used only to answer your enquiry.</p>
          </form>

          <div class="alert" id="enquiry-success" hidden>
            <h3>Thank you</h3>
            <p class="mb-0">Your email client should now be open with your enquiry ready to send. If nothing happened, please email us directly at <a href="mailto:${site.email}">${site.email}</a> or call your nearest branch.</p>
          </div>
        </div>

        <div class="col col-4 sidebar">
          <div class="panel">
            <div class="panel__head"><h3>Head Office</h3></div>
            <div class="panel__body">
              <ul class="info">
                <li>${ic.pin}<div><strong>${headOffice.company}</strong><address>${headOffice.lines.join(', ')}</address></div></li>
                <li>${ic.phone}<div><strong>Telephone</strong><a href="tel:${headOffice.phoneHref}">${headOffice.phone}</a></div></li>
                <li>${ic.mail}<div><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></div></li>
              </ul>
            </div>
          </div>

          <div class="panel">
            <div class="panel__head"><h3>Our Services</h3></div>
            <ul class="sidelist">
              ${services.map((s) => `<li><a href="/${s.slug}">${s.navTitle}</a></li>`).join('\n              ')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  return layout({
    title: `Contact Us | ${site.name}`,
    description:
      'Contact City of London Dry Cleaners. Canary Wharf 020 7512 9215, London Bridge 020 7357 8800, or email info@cityoflondondrycleaners.co.uk.',
    path: '/contact-us',
    pageName: 'Contact Us',
    body,
  });
}

/* -------------------------------------------------- corporate accounts */

function corporatePage() {
  const body = `
${banner('Corporate Accounts', 'Corporate Accounts', 'shirt-service')}

  <section class="section">
    <div class="container">
      <div class="row">
        <div class="col col-8">
          <div class="sec-head">
            <h2>${corporate.title}</h2>
            <span class="bar"></span>
          </div>
          ${corporate.body.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('\n          ')}

          <img src="/img/corporate-band.webp" alt="Business attire prepared for collection"
               width="2000" height="700"
               style="border:1px solid var(--line);border-radius:var(--radius);margin:28px 0">

          <div class="sec-head" style="margin-top:8px">
            <h2>Who We Look After</h2>
            <span class="bar"></span>
          </div>
          <div class="row">
            ${corporate.sectors
              .map(
                (sec) => `<div class="col col-4"><div class="sector">${ic.hanger}<span>${sec}</span></div></div>`
              )
              .join('\n            ')}
          </div>

          <div class="panel mt-2" style="margin-top:34px">
            <div class="panel__head"><h3>What an account gives you</h3></div>
            <div class="panel__body">
              <ul class="checks">
                <li>Dry cleaning, shirt service, laundry and alterations on one account</li>
                <li>Collecting, processing and delivering, as we have done since 1994</li>
                <li>Two counters in the City: Canary Wharf and London Bridge</li>
                <li>A tailor and seamstress on site at Canary Wharf for repairs and alterations</li>
                <li>Three solvent systems, chosen for the cloth: perchloroethylene, hydrocarbon and aqueous</li>
              </ul>
            </div>
          </div>

          <div class="btn-group mt-2">
            <a class="btn" href="/contact-us">Discuss an account</a>
            <a class="btn btn--outline" href="/price-list">View prices</a>
          </div>
        </div>
${sidebar('corporate-accounts')}
      </div>
    </div>
  </section>

${ctaStrip()}`;

  return layout({
    title: `Corporate Accounts | ${site.name}`,
    description:
      'Corporate cleaning and executive services from City of London Dry Cleaners for restaurants, hotels, health clubs, beauty salons, retail and offices in Canary Wharf and London Bridge.',
    path: '/corporate-accounts',
    pageName: 'Corporate Accounts',
    body,
  });
}

/* ------------------------------------------------------------------ 404 */

function notFoundPage() {
  const body = `
${banner('Page Not Found', 'Page Not Found', 'dry-cleaning')}

  <section class="section">
    <div class="container">
      <div class="row">
        <div class="col col-8">
          <div class="sec-head">
            <h2>We could not find that page</h2>
            <span class="bar"></span>
            <p>The page may have moved, or the address may have been mistyped. Everything we do is listed below, or call either shop and we will point you the right way.</p>
          </div>
          <div class="row">
            ${services
              .map(
                (sv) => `<div class="col col-6"><div class="sector"><a href="/${sv.slug}">${ic.hanger}<span>${sv.title}</span></a></div></div>`
              )
              .join('\n            ')}
          </div>
          <div class="btn-group mt-2">
            <a class="btn" href="/">Back to the home page</a>
            <a class="btn btn--outline" href="/contact-us">Contact us</a>
          </div>
        </div>
${sidebar('404')}
      </div>
    </div>
  </section>

${ctaStrip()}`;

  return layout({
    title: `Page Not Found | ${site.name}`,
    description: 'The page you were looking for could not be found.',
    path: '/404',
    pageName: 'Page Not Found',
    body,
  });
}

/* --------------------------------------------------------------- build */

/**
 * Content-hashed asset pipeline.
 *
 * Every css/js/img file is emitted as name.<hash>.ext and every reference to it
 * is rewritten. This is what makes the long immutable Cache-Control header in
 * vercel.json safe: the URL changes whenever the bytes change, so a returning
 * visitor can never be served a stale stylesheet against fresh markup.
 */
function shortHash(buf) {
  return crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
}

function applyManifest(str, manifest) {
  // longest keys first so /img/logo-navy.png is not clipped by a shorter key
  const keys = Object.keys(manifest).sort((a, b) => b.length - a.length);
  for (const k of keys) str = str.split(k).join(manifest[k]);
  return str;
}

function emitHashed(dir, file, contents, manifest) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const name = base + '.' + shortHash(contents) + ext;
  fs.mkdirSync(path.join(OUT, dir), { recursive: true });
  fs.writeFileSync(path.join(OUT, dir, name), contents);
  manifest['/' + dir + '/' + file] = '/' + dir + '/' + name;
  return name;
}

function buildAssets() {
  const manifest = {};

  // 1. images first, because the stylesheet references them
  const imgDir = path.join(STATIC, 'img');
  for (const f of fs.readdirSync(imgDir)) {
    emitHashed('img', f, fs.readFileSync(path.join(imgDir, f)), manifest);
  }

  // 2. stylesheet, with its image references rewritten before hashing
  const css = applyManifest(fs.readFileSync(path.join(STATIC, 'css', 'site.css'), 'utf8'), manifest);
  emitHashed('css', 'site.css', css, manifest);

  // 3. script
  emitHashed('js', 'site.js', fs.readFileSync(path.join(STATIC, 'js', 'site.js')), manifest);

  // 4. anything else at the static root (favicon) stays at a stable URL
  for (const e of fs.readdirSync(STATIC, { withFileTypes: true })) {
    if (e.isDirectory()) continue;
    fs.copyFileSync(path.join(STATIC, e.name), path.join(OUT, e.name));
  }

  return manifest;
}

let MANIFEST = {};

function write(rel, html) {
  const out = applyManifest(html, MANIFEST);
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  return rel + '  (' + Math.round(out.length / 1024) + ' kB)';
}

function run() {
  fs.rmSync(OUT, { recursive: true, force: true });
  MANIFEST = buildAssets();

  const written = [];
  written.push(write('index.html', homePage()));
  for (const svc of services) written.push(write(svc.slug + '.html', servicePage(svc)));
  written.push(write('price-list.html', pricePage()));
  written.push(write('contact-us.html', contactPage()));
  written.push(write('corporate-accounts.html', corporatePage()));
  written.push(write('404.html', notFoundPage()));

  const urls = ['/', ...services.map((s) => '/' + s.slug), '/price-list', '/corporate-accounts', '/contact-us'];
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${site.domain}${u === '/' ? '' : u}/</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n') +
    `\n</urlset>\n`;
  written.push(write('sitemap.xml', sitemap));
  written.push(write('robots.txt', site.isLiveDomain
    ? `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`
    : `# Preview deployment. Kept out of search so it cannot compete with the\n# client's live site. Set SITE_URL to the real domain to allow indexing.\nUser-agent: *\nDisallow: /\n`));

  /* Guard: a stale-cache bug shipped once already. Fail the build if any
     asset reference escapes the content hash. */
  const unhashed = [];
  for (const f of fs.readdirSync(OUT)) {
    if (!f.endsWith('.html')) continue;
    const html = fs.readFileSync(path.join(OUT, f), 'utf8');
    for (const ref of html.match(/\/(?:css|js|img)\/[A-Za-z0-9._-]+/g) || []) {
      if (!/\.[0-9a-f]{8}\.(css|js|webp|png|jpg|svg)$/.test(ref)) unhashed.push(f + ' -> ' + ref);
    }
  }
  if (unhashed.length) {
    console.error('Unhashed asset references found:');
    unhashed.forEach((u) => console.error('  ' + u));
    throw new Error(unhashed.length + ' unhashed asset reference(s); immutable caching would serve stale files.');
  }

  console.log('Built ' + written.length + ' pages into dist/');
  written.forEach((w) => console.log('  ' + w));
  console.log('Hashed assets: ' + Object.keys(MANIFEST).length);
}

run();
