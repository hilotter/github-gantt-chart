<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('auth', ['loggedIn']),
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/gantt')
    }
  },
})
</script>
