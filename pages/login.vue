<template>
  <div class="container mx-auto px-4">
    <div class="text-center mb-3">
      <h4 class="text-sm font-bold">Sign in with</h4>
    </div>
    <div class="btn-wrapper text-center">
      <button
        class="px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 shadow"
        type="button"
        @click="authenticate"
      >
        GitHub
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false,
  methods: {
    authenticate() {
      this.$auth.loginWith('github')
    },
  },
})
</script>
