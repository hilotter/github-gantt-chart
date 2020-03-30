<template>
  <ul>
    <li v-for="issue in issues" :key="issue.number">
      <a :href="issue.url" target="_blank" rel="noopener">{{ issue.title }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import repoIssues from '~/apollo/queries/repoIssues.gql'

type Issue = {
  title: string
  number: number
  body: string
  url: string
}

export default Vue.extend({
  data(): { issues: Issue[] } {
    return {
      issues: []
    }
  },
  async beforeMount() {
    const { owner, name } = this.$nuxt.$route.params
    const queryResult = await this.getRepoIssues(owner, name)
    const issues = queryResult.edges.map((issue) => {
      const { title, number, body, url } = issue.node
      return { title, number, body, url }
    })
    issues.forEach((issue) => {
      this.issues.push(issue)
    })
  },
  methods: {
    async getRepoIssues(owner, name) {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: repoIssues,
        variables: {
          owner,
          name
        },
        context: {
          headers: { authorization: authToken }
        }
      })
      return data.repository.issues
    }
  }
})
</script>
