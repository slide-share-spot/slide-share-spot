require('dotenv').config()
export default {
  srcDir: 'src/',
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingServiceId: process.env.messagingServiceId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    subscriptionKey: process.env.subscriptionKey,
    academicApiUrl:
      process.env.academicApiUrl ||
      'https://api.labs.cognitive.microsoft.com/academic/v1.0/',
    academicApiHeader: process.env.academicApiHeader || {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Ocp-Apim-Subscription-Key': process.env.subscriptionKey
    }
  },
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Slide Share Spot'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Slide Share Spot'
      },
      { hid: 'og:type', property: 'og:type', content: 'summary_large_image' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://slide-share-spot.herokuapp.com/'
      },
      { hid: 'og:title', property: 'og:title', content: 'Slide Share Spot' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Slide Share Spot'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://slide-share-spot.herokuapp.com/ogp.png'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    {
      src: '@/assets/scss/main.scss',
      lang: 'scss'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/firebaseSettings.js',
    { src: '~/plugins/persistedstate.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  }
}
