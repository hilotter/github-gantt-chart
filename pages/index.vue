<template>
  <div class="container mx-auto px-4">
    <h1 class="text-xl mb-4">Usage</h1>
    <ol class="list-decimal ml-4">
      <li class="mb-4">
        <p class="mb-4">add gantt chart item in your issue.</p>
        <div class="bg-gray-100">
          {{ startDateFormat() }} 2020-04-01<br />
          {{ endDateFormat() }} 2020-04-10<br />
          {{ progressFormat() }} 0.5<br />
          {{ dependenciesFormat() }} #1, #2
        </div>
      </li>
      <li class="mb-4">
        <a class="underline" href="/login">Login</a>
        to this site with your Github account.
      </li>
      <li class="mb-4">
        access
        <a class="underline" href="/gantt">/gantt</a>
      </li>
      <li class="mb-4">
        select username or organization, and select repository name
      </li>
      <li class="mb-4">
        OR direct access to
        <span class="bg-gray-100">
          /gantt/{username || organization}/{reponame}
        </span>
      </li>
      <li class="mb-4">
        generate gantt chart from GitHub issues.
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false,
  methods: {
    startDateFormat() {
      return process.env.START_DATE_STRING_TEMPLATE
    },
    endDateFormat() {
      return process.env.END_DATE_STRING_TEMPLATE
    },
    progressFormat() {
      return process.env.PROGRESS_STRING_TEMPLATE
    },
    dependenciesFormat() {
      return process.env.DEPENDENCIES_STRING_TEMPLATE
    }
  }
})
</script>
