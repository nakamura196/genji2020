import colors from 'vuetify/es5/util/colors'

const environment = process.env.NODE_ENV || 'local'
const env = require(`./env/${environment}.ts`)

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/genji2020/',
        },
      }
    : {}

const GOOGLE_ANALYTICS_ID = 'abc'

// path
const baseUrl = env.BASE_URL || ''
const baseDir = env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = 'デジタル源氏物語（AI画像検索版）'
env.siteName = siteName
const siteDesc = 'デジタル源氏物語（AI画像検索版）'
const siteKeywords = 'IIIF, 源氏物語'

// images
const iconImages = baseDir + 'img/icons/'
const ogpImages = basePath + 'img/ogp/' // cdnPath + 'img/ogp/'

// pwa
const shortName = 'dgenji'
const manifestIcon = 'img/icons/icon-512.png'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  env,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang,
    },
    titleTemplate: `%s - ${siteName}`,
    title: siteName,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no',
      },
      // SEO関連
      { hid: 'description', name: 'description', content: siteDesc },
      { hid: 'keywords', name: 'keywords', content: siteKeywords },
      // ogp関連
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: siteName,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:title', property: 'og:title', content: siteName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDesc,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogpImages}home.jpg`,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    link: [
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: iconImages + 'favicon-16.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: iconImages + 'favicon-32.png',
      },
      {
        rel: 'icon',
        sizes: '48x48',
        type: 'image/png',
        href: iconImages + 'favicon-48.png',
      },
      {
        rel: 'icon',
        sizes: '72x72',
        type: 'image/png',
        href: iconImages + 'favicon-72.png',
      },
      // apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: iconImages + 'apple-touch-icon.png',
      },
    ],
  },

  manifest: {
    lang,
    name: siteName,
    short_name: shortName,
    description: siteDesc,
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
  },
  icon: {
    iconFileName: manifestIcon,
  },

  loading: { color: '#E64A19', height: '5px' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/init-client' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  moment: {
    // ここにオプションが記述できる
    locales: ['ja'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    'nuxt-i18n',
    [
      '@nuxtjs/google-analytics',
      {
        id: GOOGLE_ANALYTICS_ID,
      },
    ],
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: baseUrl,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en_US', file: 'en.json' },
      { code: 'ja', iso: 'ja_JP', file: 'ja.json' },
    ],
    defaultLocale: 'ja',
    vueI18nLoader: true,
    lazy: true,
    langDir: 'lang/',
    // strategy: 'no_prefix'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },

  ...routerBase,

  generate: {
    //dir: 'docs'

    routes() {
      const baseUrl = process.env.BASE_URL

      const fs = require('fs')
      const res = JSON.parse(fs.readFileSync('static/nuxt.json'))

      const jsonData = {}

      const ids = []

      for (let key in res) {
        jsonData[key] = res[key]
        ids.push(key)
      }

      const arr = [
        'kyoto01',
        'kyoto02',
        'ndl02',
        'ndl03',
        'ndl04',
        'nijl',
        'utokyo',
      ]
      for (let i = 0; i < arr.length; i++) {
        const e = arr[i]
        const res = JSON.parse(
          fs.readFileSync('static/data/json/' + e + '.json')
        )
        for (let key in res) {
          jsonData[key] = res[key]
        }
      }

      const pages = []

      ids.map((id) => {
        const obj = jsonData[id]

        const sims = obj.arr
        const sims2 = {}

        for (const attr in sims) {
          const arr = []

          const obj2 = sims[attr]

          for (let i = 0; i < obj2.length; i++) {
            const sim = obj2[i]
            const obj = jsonData[sim.id]
            obj.score = sim.score
            arr.push(obj)
          }

          sims2[attr] = arr
        }

        const result = {
          item: obj,
          arr: sims2,
        }

        pages.push({
          route: `/item/${id}`,
          palyload: {
            result,
            nuxt: jsonData,
          },
        })
      })
      return pages
    },
  },
}
