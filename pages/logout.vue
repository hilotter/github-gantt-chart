<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  beforeMount() {
    this.$auth.logout()
    this.$router.push('/')
  },
})
</script>
