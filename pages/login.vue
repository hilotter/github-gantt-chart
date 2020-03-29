<template>
  <div>
    <button @click="authenticate">Github Login</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false,
  methods: {
    authenticate() {
      this.$auth.loginWith('github')
    }
  }
})
</script>
