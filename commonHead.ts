import { MetaInfo } from 'vue-meta'

export const SITE_NAME = process.env.SITE_NAME || 'Gantt Chart'
export const DESCRIPTION =
  process.env.SITE_DESCRIPTION || 'Show gantt-chart from github issues'
export const SITE_URL = process.env.BASE_URL!
export const TITLE = `${SITE_NAME}`
export const KEYWORDS =
  process.env.SITE_KEYWORDS || 'github, issue, gantt, chart, schedule'
export const OGIMG_URL = `${SITE_URL}/logo.jpg`
export const TITLE_TEMPLATE = `%s`

export const commonHead = (): MetaInfo => {
  return {
    titleTemplate: TITLE_TEMPLATE,
    title: TITLE,
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/ fb#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: DESCRIPTION },
      {
        hid: 'keywords',
        name: 'keywords',
        content: KEYWORDS,
        'xml:lang': 'en',
        lang: 'en'
      },
      { hid: 'og:site_name', name: 'og:site_name', content: SITE_NAME },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', content: TITLE },
      { hid: 'og:description', name: 'og:description', content: DESCRIPTION },
      { hid: 'og:image', name: 'og:image', content: OGIMG_URL },
      { hid: 'og:url', name: 'og:url', content: SITE_URL },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'application-name', content: SITE_NAME }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/plugins/frappe-gantt/frappe-gantt.css' }
    ],
    script: [{ src: '/plugins/frappe-gantt/frappe-gantt.js' }]
  }
}
export const commonManifest = function() {
  return {
    name: SITE_NAME,
    lang: 'en',
    short_name: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    start_url: '/gantt?utm_source=homescreen',
    display: 'standalone'
  }
}
