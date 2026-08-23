'use strict';

const fs = require('fs');
const path = require('path');
const T = require('./src/templates');
const {
  layout, ctaBand, serviceCard, locationCard, priceTable, money,
  site, headOffice, locations, services, priceGroups, credentials, steps, corporate,
} = T;

const OUT = path.join(__dirname, 'dist');
const STATIC = path.join(__dirname, 'static');

/* ---------------------------------------------------------------- home */

function homePage() {
  const body = `
  <section class="hero">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="container hero__in">
      <span class="eyebrow eyebrow--light">Established ${site.founded} &middot; Canary Wharf &amp; London Bridge</span>
      <h1 class="display h1">Dry cleaning for the<br><em>City of London</em></h1>
      <p class="hero__lede">${site.description}</p>
      <div class="btn-row">
        <a class="btn btn--gold" href="#services">Our services</a>
        <a class="btn btn--light" href="/price-list">View price list</a>
      </div>

      <div class="creds">
        <ul class="creds__grid">
          ${credentials.map((c) => `<li>
            <span class="creds__fig">${c.figure}</span>
            <span class="creds__lab">${c.label}</span>
          </li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="split__aside reveal">
        <span class="eyebrow">What we do</span>
        <h2 class="display h2">What do you expect from a dry cleaner?</h2>
        <hr class="rule">
      </div>
      <div class="reveal" data-delay="120">
        <p class="lede">Expertise, reliability, care, convenience, flexibility, comprehensive services, attention to detail? Welcome to the world of City of London Dry Cleaners.</p>
        <p class="mt-2">We are proud to be the dry cleaner of choice to a loyal list of customers who appreciate us for what we do. Whatever the cleaning requirement, we have the experienced personnel and the up-to-the-minute technology.</p>
        <p>Apart from the usual dry cleaning items such as suits, dresses and trousers, we also clean household items such as curtains and upholstery, and we have a specialist section for designer wear and wedding dresses. Our facilities allow us to clean in perchloroethylene, hydrocarbon and aqueous.</p>
        <div class="mt-2"><a class="tlink" href="/dry-cleaning">More on dry cleaning</a></div>
      </div>
    </div>
  </section>

  <section class="section section--cream" id="services">
    <div class="container">
      <div class="center reveal" style="max-width:640px;margin-inline:auto">
        <span class="eyebrow">Our services</span>
        <h2 class="display h2">Seven services, one standard</h2>
        <hr class="rule rule--center">
        <p>From a business shirt to a wedding dress, every piece is inspected by hand and cleaned by the method the cloth actually needs.</p>
      </div>
      <div class="svc-grid mt-3">
${services.map(serviceCard).join('')}
      </div>
    </div>
  </section>

  <section class="band">
    <div class="band__bg" style="background-image:url('/img/corporate-band.webp')" aria-hidden="true"></div>
    <div class="container split">
      <div class="reveal">
        <span class="eyebrow eyebrow--light">${corporate.eyebrow}</span>
        <h2 class="display h2">${corporate.title}</h2>
        <hr class="rule">
      </div>
      <div class="reveal" data-delay="120">
        ${corporate.body.map((p) => `<p class="lede">${p}</p>`).join('\n        ')}
        <ul class="tags">
          ${corporate.sectors.map((s) => `<li>${s}</li>`).join('\n          ')}
        </ul>
        <div class="btn-row mt-3"><a class="btn btn--gold" href="/contact-us">Discuss a corporate account</a></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="center reveal" style="max-width:600px;margin-inline:auto">
        <span class="eyebrow">The process</span>
        <h2 class="display h2">How a garment moves through the shop</h2>
        <hr class="rule rule--center">
      </div>
      <ul class="steps mt-3">
        ${steps.map((s, i) => `<li class="step reveal" data-delay="${i * 80}">
          <span class="step__n">${s.n}</span>
          <h3 class="step__t">${s.title}</h3>
          <p class="step__x">${s.text}</p>
        </li>`).join('\n        ')}
      </ul>
    </div>
  </section>

  <section class="section section--cream">
    <div class="container split">
      <div class="reveal">
        <span class="eyebrow">Price list</span>
        <h2 class="display h2">Published in full, nothing hidden</h2>
        <hr class="rule">
        <p>Every price we charge is on the site. Alterations are quoted at the counter once the tailor has seen the piece.</p>
        <div class="mt-2"><a class="btn" href="/price-list">See the full price list</a></div>
      </div>
      <div class="reveal" data-delay="120">
        <ul>
          ${[
            ['Two piece suit, cleaned and pressed', 23.49, true],
            ['Shirt, hand finished', 3.99, false],
            ['Dress', 16.99, true],
            ['Full coat', 23.49, true],
            ['Duvet', 35.99, true],
            ['Trousers shortened by the tailor', 24.0, true],
          ].map(T.priceRow).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="center reveal" style="max-width:600px;margin-inline:auto">
        <span class="eyebrow">Find us</span>
        <h2 class="display h2">Two counters in the City</h2>
        <hr class="rule rule--center">
      </div>
      <div class="loc-grid mt-3">
${locations.map(locationCard).join('')}
      </div>
    </div>
  </section>

${ctaBand()}`;

  return layout({
    title: `${site.name} | Dry Cleaning in Canary Wharf & London Bridge`,
    description: site.description,
    path: '/',
    body,
  });
}

/* ------------------------------------------------------------ services */

function servicePage(svc) {
  const others = services.filter((s) => s.slug !== svc.slug).slice(0, 3);
  const group = svc.priceGroup ? priceGroups.find((g) => g.id === svc.priceGroup) : null;

  const body = `
  <section class="hero hero--page">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="container hero__in">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span aria-hidden="true">/</span>${svc.title}
      </nav>
      <h1 class="display h1">${svc.title}</h1>
      <p class="hero__lede">${svc.lede}</p>
    </div>
  </section>

  <section class="section">
    <div class="container detail">
      <div class="detail__media reveal">
        <img src="/img/${svc.image}.webp" alt="${svc.alt}" width="1200" height="800" fetchpriority="high" decoding="async">
      </div>
      <div class="reveal" data-delay="120">
        <span class="eyebrow">What we do</span>
        <h2 class="display h3">${svc.title}</h2>
        <hr class="rule">
        ${svc.body.map((p, i) => `<p${i === 0 ? ' class="lede"' : ''}>${p}</p>`).join('\n        ')}
        <ul class="checks mt-2">
          ${svc.points.map((p) => `<li>${p}</li>`).join('\n          ')}
        </ul>
        <div class="btn-row mt-3">
          <a class="btn" href="/contact-us">Enquire about ${svc.title.toLowerCase()}</a>
        </div>
      </div>
    </div>
  </section>

  ${group ? `
  <section class="section section--cream section--tight">
    <div class="container container--narrow">
      <div class="center reveal">
        <span class="eyebrow">Prices</span>
        <h2 class="display h2">${group.title} prices</h2>
        <hr class="rule rule--center">
      </div>
      <div class="mt-3 reveal" data-delay="90">
        ${priceTable(group)}
        <div class="center mt-3"><a class="btn btn--ghost" href="/price-list">View the full price list</a></div>
      </div>
    </div>
  </section>` : ''}

  <section class="section section--tight${group ? '' : ' section--cream'}">
    <div class="container">
      <span class="eyebrow">Also from us</span>
      <h2 class="display h3" style="margin-bottom:2rem">Other services</h2>
      <div class="rel-grid">
        ${others.map((s) => `<a class="rel" href="/${s.slug}">${s.title}</a>`).join('\n        ')}
      </div>
    </div>
  </section>

${ctaBand()}`;

  return layout({
    title: `${svc.title} | ${site.name}`,
    description: svc.lede,
    path: '/' + svc.slug,
    body,
  });
}

/* ---------------------------------------------------------- price list */

function pricePage() {
  const half = Math.ceil(priceGroups.length / 2);
  const colA = priceGroups.slice(0, 1);
  const colB = priceGroups.slice(1);

  const body = `
  <section class="hero hero--page">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="container hero__in">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>Price List</nav>
      <h1 class="display h1">Price list</h1>
      <p class="hero__lede">Every price we publish, in full. Bring anything unusual to the counter and we will quote it before we start.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="price-cols">
        <div class="reveal">
          ${colA.map(priceTable).join('')}
        </div>
        <div class="reveal" data-delay="120">
          ${colB.map(priceTable).join('')}
        </div>
      </div>

      <div class="mt-3" style="border-top:1px solid var(--line);padding-top:2rem;max-width:70ch">
        <p class="form__note">Prices marked <em>from</em> are a starting price and vary with the garment, the cloth and the finish required. Specialist cleaning, curtains, upholstery, suede and leather are quoted individually, as the piece and the fabric decide the method. Please call ${locations[0].name} on ${locations[0].phone} or ${locations[1].name} on ${locations[1].phone} for a quotation.</p>
      </div>
    </div>
  </section>

${ctaBand()}`;

  return layout({
    title: `Price List | ${site.name}`,
    description:
      'Full published price list for dry cleaning, shirt service, laundry, repairs and alterations at City of London Dry Cleaners, Canary Wharf and London Bridge.',
    path: '/price-list',
    body,
  });
}

/* ------------------------------------------------------------- contact */

function contactPage() {
  const body = `
  <section class="hero hero--page">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="container hero__in">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>Contact</nav>
      <h1 class="display h1">Contact us</h1>
      <p class="hero__lede">You can reach us through the form, by email, by phone, or by walking into either shop. We will be happy to help.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="loc-grid">
${locations.map(locationCard).join('')}
      </div>
    </div>
  </section>

  <section class="section section--cream section--tight">
    <div class="container split">
      <div class="reveal">
        <span class="eyebrow">Make an enquiry</span>
        <h2 class="display h2">Tell us what needs cleaning</h2>
        <hr class="rule">
        <p>Fill in the form and we will come back to you as soon as possible. If it is urgent, please call the branch directly.</p>

        <div class="mt-3">
          <h3 class="eyebrow" style="margin-bottom:.8rem">Email</h3>
          <a class="tlink" href="mailto:${site.email}">${site.email}</a>
        </div>

        <div class="mt-3">
          <h3 class="eyebrow" style="margin-bottom:.8rem">${headOffice.name}</h3>
          <address style="font-style:normal;line-height:1.85">
            ${headOffice.company}<br>
            ${headOffice.lines.join('<br>')}<br>
            <a class="loc__tel" href="tel:${headOffice.phoneHref}">${headOffice.phone}</a>
          </address>
        </div>
      </div>

      <div class="reveal" data-delay="120">
        <form class="form" id="enquiry" data-to="${site.email}" novalidate>
          <div class="form__row">
            <div class="field">
              <label for="name">Your name <span class="req" aria-hidden="true">*</span></label>
              <input id="name" name="name" type="text" autocomplete="name" required aria-describedby="name-err">
              <p class="field__err" id="name-err" role="alert"></p>
            </div>
            <div class="field">
              <label for="email">Email <span class="req" aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err">
              <p class="field__err" id="email-err" role="alert"></p>
            </div>
          </div>

          <div class="form__row">
            <div class="field">
              <label for="phone">Telephone <span class="req" aria-hidden="true">*</span></label>
              <input id="phone" name="phone" type="tel" autocomplete="tel" required aria-describedby="phone-err">
              <p class="field__err" id="phone-err" role="alert"></p>
            </div>
            <div class="field">
              <label for="branch">Preferred branch</label>
              <select id="branch" name="branch">
                ${locations.map((l) => `<option value="${l.name}">${l.name}</option>`).join('\n                ')}
                <option value="Either">Either branch</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="service">Service required <span class="req" aria-hidden="true">*</span></label>
            <select id="service" name="service" required aria-describedby="service-err">
              <option value="">Please choose</option>
              ${services.map((s) => `<option value="${s.title}">${s.title}</option>`).join('\n              ')}
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

          <div class="btn-row">
            <button class="btn" type="submit">Send enquiry</button>
          </div>
          <p class="form__note">Fields marked with an asterisk are required. Your details are used only to answer your enquiry.</p>
        </form>

        <div class="form__ok" id="enquiry-success" hidden>
          <h3 class="h4">Thank you</h3>
          <p>Your email client should now be open with your enquiry ready to send. If nothing happened, please email us directly at <a href="mailto:${site.email}" style="color:var(--gold)">${site.email}</a> or call your nearest branch.</p>
        </div>
      </div>
    </div>
  </section>`;

  return layout({
    title: `Contact Us | ${site.name}`,
    description:
      'Contact City of London Dry Cleaners. Canary Wharf 020 7512 9215, London Bridge 020 7357 8800, or email info@cityoflondondrycleaners.co.uk.',
    path: '/contact-us',
    body,
  });
}

/* --------------------------------------------------------------- build */

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

function write(rel, html) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return rel + '  (' + Math.round(html.length / 1024) + ' kB)';
}

function run() {
  fs.rmSync(OUT, { recursive: true, force: true });
  copyDir(STATIC, OUT);

  const written = [];
  written.push(write('index.html', homePage()));
  for (const svc of services) written.push(write(svc.slug + '.html', servicePage(svc)));
  written.push(write('price-list.html', pricePage()));
  written.push(write('contact-us.html', contactPage()));

  /* sitemap + robots */
  const urls = ['/', ...services.map((s) => '/' + s.slug), '/price-list', '/contact-us'];
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${site.domain}${u === '/' ? '' : u}/</loc><lastmod>${today}</lastmod><priority>${
            u === '/' ? '1.0' : '0.8'
          }</priority></url>`
      )
      .join('\n') +
    `\n</urlset>\n`;
  written.push(write('sitemap.xml', sitemap));
  written.push(write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`));

  console.log('Built ' + written.length + ' files into dist/');
  written.forEach((w) => console.log('  ' + w));
}

run();
