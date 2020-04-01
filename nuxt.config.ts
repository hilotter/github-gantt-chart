import path from 'path'
import { Configuration } from '@nuxt/types'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import dotenv from 'dotenv'
import { commonHead, commonManifest } from './commonHead'

dotenv.config()

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: commonHead(),
  pwa: {
    manifest: commonManifest(),
    workbox: {
      offline: false,
      skipWaiting: true,
    },
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  router: {
    middleware: ['auth'],
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/apollo',
  ],
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/callback',
      home: '/gantt',
    },
    strategies: {
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['read:user', 'read:org', 'repo'],
      },
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.github.com/graphql',
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL!,
    START_DATE_STRING_TEMPLATE: process.env.START_DATE_STRING_TEMPLATE!,
    END_DATE_STRING_TEMPLATE: process.env.END_DATE_STRING_TEMPLATE!,
    PROGRESS_STRING_TEMPLATE: process.env.PROGRESS_STRING_TEMPLATE!,
    DEPENDENCIES_STRING_TEMPLATE: process.env.DEPENDENCIES_STRING_TEMPLATE!,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, _ctx) {
      config.plugins!.push(
        new CopyWebpackPlugin([
          {
            from: 'node_modules/frappe-gantt/dist/frappe-gantt.js',
            to: path.join(__dirname, 'static/plugins/frappe-gantt/'),
          },
          {
            from: 'node_modules/frappe-gantt/dist/frappe-gantt.css',
            to: path.join(__dirname, 'static/plugins/frappe-gantt/'),
          },
        ])
      )

      return config
    },
  },
}

export default config
