import path from 'path'
import { Configuration } from '@nuxt/types'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import dotenv from 'dotenv'

dotenv.config()

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/plugins/frappe-gantt/frappe-gantt.css' }
    ],
    script: [{ src: '/plugins/frappe-gantt/frappe-gantt.js' }]
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
    '@nuxtjs/tailwindcss'
  ],
  router: {
    middleware: ['auth']
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/apollo'
  ],
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/callback',
      home: '/gantt'
    },
    strategies: {
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['read:user', 'read:org', 'repo']
      }
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.github.com/graphql'
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  typescript: {
    typeCheck: {
      eslint: true
    }
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
            to: path.join(__dirname, 'static/plugins/frappe-gantt/')
          },
          {
            from: 'node_modules/frappe-gantt/dist/frappe-gantt.css',
            to: path.join(__dirname, 'static/plugins/frappe-gantt/')
          }
        ])
      )

      return config
    }
  }
}

export default config
