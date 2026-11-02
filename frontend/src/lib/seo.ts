export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://iimbhubaneswar.in';

export const siteMetadata = {
  name: 'The Indian Institute of Metals • Bhubaneswar Chapter',
  shortName: 'IIM Bhubaneswar',
  description:
    'Official portal of The Indian Institute of Metals (IIM) Bhubaneswar Chapter. Chartered in 1978 at CSIR-IMMT, advancing metallurgical engineering, mineral processing, green hydrogen DRI steelmaking, and materials innovation across Odisha.',
  url: SITE_URL,
  ogImage: '/assets/images/hero_green_steel.jpg',
  logo: '/assets/images/logo1.svg',
  locale: 'en_IN',
  address: {
    street: 'Room 112, Materials Division Block, CSIR-IMMT, Acharya Vihar',
    locality: 'Bhubaneswar',
    region: 'Odisha',
    postalCode: '751013',
    country: 'IN',
  },
  contact: {
    email: 'executive@iimbhubaneswar.in',
    phone: '+91-674-237-1234',
  },
  parentOrganization: {
    name: 'The Indian Institute of Metals (Head Office, Kolkata)',
    url: 'https://iim-india.net',
  },
};

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: siteMetadata.name,
    alternateName: ['IIM Bhubaneswar', 'IIM Bhubaneswar Chapter', 'The Indian Institute of Metals Bhubaneswar'],
    url: SITE_URL,
    logo: `${SITE_URL}${siteMetadata.logo}`,
    image: `${SITE_URL}${siteMetadata.ogImage}`,
    description: siteMetadata.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteMetadata.address.street,
      addressLocality: siteMetadata.address.locality,
      addressRegion: siteMetadata.address.region,
      postalCode: siteMetadata.address.postalCode,
      addressCountry: siteMetadata.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Secretariat Desk',
        email: siteMetadata.contact.email,
        telephone: siteMetadata.contact.phone,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'or'],
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: siteMetadata.parentOrganization.name,
      url: siteMetadata.parentOrganization.url,
    },
    foundingDate: '1978',
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: siteMetadata.name,
    alternateName: siteMetadata.shortName,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function getSymposiumEventSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: '18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
    description:
      'National technical symposium hosted by IIM Bhubaneswar Chapter at CSIR-IMMT, focusing on microalloying, dual-phase steels, and automotive sheet stampability challenges.',
    startDate: '2026-03-28T09:00:00+05:30',
    endDate: '2026-03-29T18:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'CSIR-IMMT Auditorium',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Acharya Vihar',
        addressLocality: 'Bhubaneswar',
        addressRegion: 'Odisha',
        postalCode: '751013',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteMetadata.name,
      url: SITE_URL,
    },
    image: [`${SITE_URL}/assets/images/hero_green_steel.jpg`],
  };
}
