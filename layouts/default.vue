<template>
  <div>
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between flex-wrap py-6">
        <div class="flex items-center flex-shrink-0 mr-6">
          <span class="font-semibold text-xl tracking-tight">
            <a href="/">Gantt Chart</a>
          </span>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow"></div>
          <div v-if="!isLogInPage">
            <a
              :href="loginLink"
              class="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0"
            >
              {{ loginLinkText }}
            </a>
          </div>
        </div>
      </nav>
    </div>

    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('auth', ['loggedIn']),
    loginLink() {
      return this.loggedIn ? '/logout' : '/login'
    },
    isLogInPage() {
      return this.$route.path === '/login'
    },
    loginLinkText() {
      return this.loggedIn ? 'Logout' : 'Login'
    }
  }
})
</script>
