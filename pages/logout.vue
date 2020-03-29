<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    const dialogMessage = 'SignOut confirmation'
    if (!window.confirm(dialogMessage)) {
      this.$router.go(-1)
      return
    }
    this.$auth.logout()
    this.$router.push('/')
  }
})
</script>
