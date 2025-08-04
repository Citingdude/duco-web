import path from 'node:path'

// TODO: Fill in seo data
export default defineNuxtConfig({
  alias: {
    '~base': path.resolve(__dirname, '../base'),
  },

  extends: [
    '../base',
  ],

  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],
  schemaOrg: {
    identity: {
      'name': 'Duco Ventilation & Sun Control',
      '@type': 'LocalBusiness',
      'address': {
        addressCountry: 'Belgium',
        addressLocality: 'Veurne',
        addressRegion: 'West Flanders',
        postalCode: '8630',
        streetAddress: 'Handelsstraat 19',
      },
      'logo': '/logo.svg',
      'url': 'https://www.duco.eu',
    },
  },
  site: {
    title: 'Duco',
    description: 'Een gezond, comfortabel en energiezuinig binnenklimaat creëren op een natuurlijke manier? DUCO is trendsetter in ventilatie en zonwering. Ontdek ons volledige aanbod! systeem C en D.',
    url: 'https://wisemen.digital',
  },

  sitemap: {
    cacheMaxAgeSeconds: 1 * 60 * 60 * 24,
    experimentalCompression: true,
    experimentalWarmUp: true,
  },

})
