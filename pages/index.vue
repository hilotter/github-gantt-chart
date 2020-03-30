<template>
  <div class="container">
    <div v-if="isLoggedIn">
      <a href="/logout">
        Logout
      </a>
    </div>
    <div v-else>
      <a href="/login">
        Go to Login Page
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false,
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn
    }
  }
})
</script>
