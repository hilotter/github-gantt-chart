<template>
  <div class="font-sans min-h-screen flex flex-col">
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between flex-wrap py-6">
        <div class="flex items-center flex-shrink-0 mr-6">
          <span class="font-semibold text-xl tracking-tight">
            <nuxt-link to="/">{{ siteName }}</nuxt-link>
          </span>
        </div>
        <div class="block flex-grow flex items-center w-auto">
          <div class="text-sm flex-grow"></div>
          <div>
            <nuxt-link
              to="/gantt"
              class="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-0"
            >
              gantt
            </nuxt-link>
          </div>
          <div>
            <a
              :href="githubAppUrl"
              class="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-0"
            >
              {{ githubAppLinkText }}
            </a>
          </div>
          <div v-if="!isLogInPage">
            <nuxt-link
              :to="loginLink"
              class="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-0"
            >
              {{ loginLinkText }}
            </nuxt-link>
          </div>
        </div>
      </nav>
    </div>

    <div class="flex-grow">
      <nuxt />
    </div>

    <div class="container mx-auto px-4">
      <div class="flex justify-center p-4 text-sm">
        <a
          href="https://github.com/hilotter/github-gantt-chart"
          target="_blank"
          rel="noopener"
        >
          GitHub Repository
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { SITE_NAME } from '~/commonHead'

export default Vue.extend({
  computed: {
    ...mapState('auth', ['loggedIn']),
    githubAppUrl() {
      return process.env.GITHUB_APP_URL!
    },
    githubAppLinkText() {
      return this.loggedIn ? 'setting' : 'install'
    },
    siteName() {
      return SITE_NAME
    },
    loginLink() {
      return this.loggedIn ? '/logout' : '/login'
    },
    isLogInPage() {
      return this.$route.path === '/login'
    },
    loginLinkText() {
      return this.loggedIn ? 'Logout' : 'Login'
    },
  },
})
</script>
