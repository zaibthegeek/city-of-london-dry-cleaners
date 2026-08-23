'use strict';

/**
 * Single source of truth for site content.
 * Every price, address, phone number and service description here is taken
 * from the client's existing site at cityoflondondrycleaners.co.uk.
 */

const site = {
  name: 'City of London Dry Cleaners',
  shortName: 'City of London Dry Cleaners',
  founded: 1994,
  tagline: 'Dry cleaning, shirts and laundry for the City since 1994',
  domain: 'https://www.cityoflondondrycleaners.co.uk',
  email: 'info@cityoflondondrycleaners.co.uk',
  description:
    'City of London Dry Cleaners was founded in 1994 to collect, process and deliver high quality dry cleaning, shirt service and laundry in Canary Wharf.',
};

const headOffice = {
  name: 'Head Office',
  company: 'Timpson Ltd',
  lines: ['Timpson House', 'Claverton Road', 'Wythenshawe', 'Manchester M23 9TT'],
  phone: '0161 946 6200',
  phoneHref: '+441619466200',
};

const locations = [
  {
    id: 'canary-wharf',
    name: 'Canary Wharf',
    lines: ['Jubilee Link', 'Canada Place', 'Canary Wharf', 'London E14 5AH'],
    postcode: 'E14 5AH',
    phone: '020 7512 9215',
    phoneHref: '+442075129215',
    note: 'Tailor and seamstress on site',
    maps: 'https://www.google.com/maps/search/?api=1&query=City+of+London+Dry+Cleaners+Jubilee+Link+Canada+Place+Canary+Wharf+London+E14+5AH',
  },
  {
    id: 'london-bridge',
    name: 'London Bridge',
    lines: ['Western Arcade', 'London Bridge', 'London SE1 9GP'],
    postcode: 'SE1 9GP',
    phone: '020 7357 8800',
    phoneHref: '+442073578800',
    note: 'Collection and delivery counter',
    maps: 'https://www.google.com/maps/search/?api=1&query=City+of+London+Dry+Cleaners+Western+Arcade+London+Bridge+London+SE1+9GP',
  },
];

const services = [
  {
    slug: 'dry-cleaning',
    title: 'Dry Cleaning',
    navTitle: 'Dry Cleaning',
    lede: 'Suits, dresses and tailoring cleaned in perchloroethylene, hydrocarbon or aqueous, whichever the cloth calls for.',
    card: 'Whatever the cleaning requirement, we have the experienced personnel and the up-to-the-minute technology.',
    image: 'dry-cleaning',
    alt: 'Cleaned garments hanging in protective covers on the rail',
    body: [
      'What do you expect from a dry cleaner? Expertise, reliability, care, convenience, flexibility, comprehensive services, attention to detail? Welcome to the world of City of London Dry Cleaners.',
      'We are proud to be the dry cleaner of choice to a loyal list of customers who appreciate us for what we do. Whatever the cleaning requirement, we have the experienced personnel and the up-to-the-minute technology.',
      'Apart from the usual dry cleaning items such as suits, dresses and trousers, we also clean household items such as curtains and upholstery, and we have a specialist section for designer wear and wedding dresses. Our facilities allow us to clean in perchloroethylene, hydrocarbon and aqueous.',
    ],
    points: [
      'Suits, jackets, trousers, dresses and coats',
      'Three solvent systems: perchloroethylene, hydrocarbon and aqueous',
      'A specialist section for designer wear and wedding dresses',
      'Household pieces including curtains and upholstery',
    ],
    priceGroup: 'dry-cleaning',
  },
  {
    slug: 'shirt-service',
    title: 'Shirt Service',
    navTitle: 'Shirt Service',
    lede: 'Collars and cuffs pre-treated, stains spotted by hand, your choice of starch, every shirt hand finished.',
    card: 'Your shirts, be they for business or special social occasions, deserve the very best.',
    image: 'shirt-service',
    alt: 'A freshly pressed blue shirt being finished by hand',
    body: [
      'Your shirts, be they for business or special social occasions, deserve the very best. We believe our shirt service is the finest you can have. We partner with Empire Laundry, who pride themselves on offering the best service available in London.',
      'Our shirt service starts with special attention to cuffs and collars, which are pre-treated, as well as spotting and treating stains. We offer starch light, medium or heavy, or no starch at all.',
      'All shirts are hand finished, hung or folded as you prefer, and returned to you packaged and protected.',
    ],
    points: [
      'Cuffs and collars pre-treated before every wash',
      'Stains spotted and treated by hand',
      'Starch light, medium, heavy or none at all',
      'Hand finished, then hung or folded to your preference',
    ],
    priceGroup: 'shirts',
  },
  {
    slug: 'laundry',
    title: 'Laundry',
    navTitle: 'Laundry',
    lede: 'Bed linen and table linen cleaned to standard, precisely folded and protectively packaged.',
    card: 'Every item of household linen cleaned to the highest standard, then precisely folded and protectively packaged.',
    image: 'laundry',
    alt: 'Commercial laundry drum at the Canary Wharf plant',
    body: [
      'What a great feeling, slipping between freshly laundered sheets for a blissful night’s sleep.',
      'Our partner Empire Laundry are masters of their art, ensuring every item of household linen, bed linen and table linen, be it sheets, pillowcases, duvets, tablecloths or table napkins, is cleaned to the highest standard, then precisely folded and protectively packaged before being returned to you.',
    ],
    points: [
      'Bed linen: sheets, pillowcases and duvets',
      'Table linen: tablecloths and napkins',
      'Cleaned in partnership with Empire Laundry',
      'Precisely folded and protectively packaged',
    ],
    priceGroup: 'laundry',
  },
  {
    slug: 'curtains-upholstery',
    title: 'Curtains & Upholstery',
    navTitle: 'Curtains / Upholstery',
    lede: 'Lifting the accumulated dust of everyday wear to bring colour and texture back to a room.',
    card: 'An effective way to refresh colour and texture affected by the accumulated dust and dirt of everyday wear.',
    image: 'curtains',
    alt: 'Curtains drawn back from a bright window',
    body: [
      'Dry cleaning curtains and loose upholstery is an effective way to refresh colour and texture affected by the accumulated dust and dirt of everyday wear, enhancing and brightening their setting.',
      'City of London Dry Cleaners offers curtain cleaning and upholstery cleaning for all fabric types. Our skilled artisans can restore the beauty of your favourite curtains and can even extend the life of upholstery.',
    ],
    points: [
      'Curtain cleaning for all fabric types',
      'Loose upholstery cleaned and refreshed',
      'Colour and texture restored',
      'Handled by skilled artisans',
    ],
    priceGroup: null,
  },
  {
    slug: 'suede-leather-cleaning',
    title: 'Suede & Leather',
    navTitle: 'Suede & Leather Cleaning',
    lede: 'Natural oils, suppleness and nap restored as near to original condition as the hide allows.',
    card: 'Our technicians take careful measures to retain the original state of your suede and leather during cleaning.',
    image: 'suede-leather',
    alt: 'Detail of a leather jacket after cleaning and re-oiling',
    body: [
      'Our suede and leather cleaning has to be carefully handled by experts. Suede and leather have natural oils and, if not taken proper care of while cleaning, their texture can be harmed.',
      'Our technicians take careful measures to retain the original state of your suede and leather during cleaning. We clean carefully to the highest standards, treating the garment to restore colour, suppleness, oils and nap to as near the original condition as possible.',
    ],
    points: [
      'Handled by specialist leather technicians',
      'Natural oils and suppleness restored',
      'Colour and nap brought back toward original',
      'Suitable for jackets, coats and skirts',
    ],
    priceGroup: null,
  },
  {
    slug: 'specialist-cleaning',
    title: 'Specialist Cleaning',
    navTitle: 'Specialist Cleaning',
    lede: 'Wedding dresses, designer suits and gowns, given the attention and the solvent they actually need.',
    card: 'Whether it is a wedding dress, a designer suit or a gown, we can give it the special attention it deserves.',
    image: 'specialist',
    alt: 'A wedding dress being laced and inspected by hand',
    body: [
      'Whether it is a wedding dress, a designer suit or a gown, we can give it the special attention it deserves. As we have the complete range of textile care solvents and the latest cleaning facilities, we have the most appropriate cleaning methods for your garments.',
      'We offer a specialist wedding dress cleaning service. You can rely on us to handle your precious wedding dress with the utmost care. Our dedicated staff take special care and attention while cleaning your wedding dress.',
    ],
    points: [
      'Wedding dress cleaning by dedicated staff',
      'Designer suits and gowns',
      'The complete range of textile care solvents',
      'Cleaning method matched to the garment',
    ],
    priceGroup: null,
  },
  {
    slug: 'tailoring-repairs-alterations',
    title: 'Tailoring, Repairs & Alterations',
    navTitle: 'Tailoring, Repairs & Alterations',
    lede: 'A tailor and seamstress on site at Canary Wharf, for everything from a hem to a designer adjustment.',
    card: 'We have a tailor and seamstress on site in our Canary Wharf location.',
    image: 'tailoring',
    alt: 'Shirts and thread at the on-site tailoring bench',
    body: [
      'At City of London Dry Cleaners we have a tailor and seamstress on site in our Canary Wharf location.',
      'Whether it is a simple shortening of a hem or a pair of trousers, invisibly mending a tear, or a major adjustment to a designer item, the same dedication goes into our work.',
      'There is attention to detail in any alteration, be it shortening or lengthening jackets, sleeves, trousers, skirts or dresses, adjusting waist size, or even just moving buttons.',
    ],
    points: [
      'Tailor and seamstress on site at Canary Wharf',
      'Hems shortened and lengthened',
      'Invisible mending of tears and holes',
      'Waists adjusted, zips replaced, buttons moved',
    ],
    priceGroup: 'alterations',
  },
];

/* Prices exactly as published on the client's current price list. */
const priceGroups = [
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    note: 'Prices shown are the standard starting price for each garment type.',
    items: [
      ['Suits', 23.49, true],
      ['Three piece suits', 28.49, true],
      ['Jackets', 14.99, true],
      ['Trousers', 10.99, true],
      ['Waistcoats', 9.49, true],
      ['Ties', 6.99, true],
      ['Skirts', 10.49, true],
      ['Skirts, pleated', 16.99, true],
      ['Skirts, long', 13.99, true],
      ['Dresses', 16.99, true],
      ['Dresses, silk', 20.49, false],
      ['Silk blouse', 13.49, false],
      ['Evening dresses', 33.49, true],
      ['Three quarter coats', 21.99, true],
      ['Full coats', 23.49, true],
      ['Raincoats', 24.49, true],
      ['Puffer coat', 38.99, true],
    ],
  },
  {
    id: 'shirts',
    title: 'Shirt Service',
    note: 'Gents and ladies shirts. Starch light, medium, heavy or none, at no extra charge.',
    items: [
      ['Shirts', 3.99, false],
      ['Boxed shirts', 4.99, false],
    ],
  },
  {
    id: 'laundry',
    title: 'Laundry Service',
    note: 'Household bed linen and table linen, cleaned, folded and packaged.',
    items: [
      ['Duvet', 35.99, true],
      ['Duvet covers', 10.49, true],
      ['Sheets', 6.99, true],
      ['Pillow case covers', 3.49, true],
    ],
  },
  {
    id: 'alterations',
    title: 'Repairs & Alterations',
    note: 'Carried out by the tailor and seamstress on site at Canary Wharf.',
    items: [
      ['Trousers shorten', 24.0, true],
      ['Waist taken in or let out', 24.0, true],
      ['Trousers zip', 24.0, true],
      ['Jacket sleeves shorten', 40.0, true],
      ['Jacket zip', 42.0, true],
      ['Coats shorten', 42.0, true],
      ['Skirt shorten', 24.0, true],
      ['Dress re-hem', 18.0, true],
      ['Dress zip', 36.0, true],
      ['Dress stitch seam / button detail', 10.0, true],
      ['Buttons', 6.0, true],
      ['Pockets', 18.0, true],
      ['Split seams', 12.0, true],
      ['Rehems', 15.0, true],
      ['Hole repair by patch', 15.0, true],
    ],
  },
];

/* Grounded in the client's own copy. No invented claims. */
const credentials = [
  {
    figure: 'Established 1994',
    label: 'Collecting, processing and delivering for Canary Wharf since 1994.',
  },
  {
    figure: 'Two City counters',
    label: 'Canary Wharf and London Bridge, both open to walk-ins.',
  },
  {
    figure: 'Tailor on site',
    label: 'A tailor and seamstress at Canary Wharf for repairs and alterations.',
  },
  {
    figure: 'Three solvent systems',
    label: 'Perchloroethylene, hydrocarbon and aqueous, chosen for the cloth.',
  },
];

const process = [
  {
    n: '01',
    title: 'Bring it in',
    text: 'Drop your pieces at Canary Wharf or London Bridge. Corporate accounts can arrange collection and delivery.',
  },
  {
    n: '02',
    title: 'Inspected and spotted',
    text: 'Every garment is checked by hand. Cuffs and collars are pre-treated, and stains are spotted individually before cleaning.',
  },
  {
    n: '03',
    title: 'Cleaned to the cloth',
    text: 'Perchloroethylene, hydrocarbon or aqueous. The solvent is chosen for the fabric in front of us, not for convenience.',
  },
  {
    n: '04',
    title: 'Hand finished',
    text: 'Finished by hand, then hung or folded as you prefer and returned packaged and protected.',
  },
];

const corporate = {
  eyebrow: 'Corporate',
  title: 'Corporate Cleaning &amp; Executive Services Available',
  body: [
    'For establishments in the public eye such as restaurants, hotels, health clubs, beauty salons, delivery services and retail, you have got to be seen to be pristine.',
    'But even out of public view in offices, the reception and the boardroom give out instant signals about how you value your business, and subsequently your clients’ business.',
  ],
  sectors: ['Restaurants', 'Hotels', 'Health clubs', 'Beauty salons', 'Delivery services', 'Retail', 'Offices'],
};

module.exports = { site, headOffice, locations, services, priceGroups, credentials, process, corporate };
