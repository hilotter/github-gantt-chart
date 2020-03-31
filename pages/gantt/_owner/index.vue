<template>
  <ul>
    <li v-for="repository in repositories" :key="repository.name">
      <a :href="getGanttLink(repository.name)">{{ repository.name }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import organizationRepositories from '~/apollo/queries/organizationRepositories.gql'

type Repository = {
  name: string
}

export default Vue.extend({
  data(): { owner: string; repositories: Repository[] } {
    return {
      owner: '',
      repositories: []
    }
  },
  async beforeMount() {
    const { owner } = this.$nuxt.$route.params
    this.owner = owner

    const queryResult = await this.getRepositories(owner)
    const repositories = queryResult.edges.map((repository) => {
      const { name } = repository.node
      return { name }
    })
    repositories.forEach((repository) => {
      this.repositories.push(repository)
    })
  },
  methods: {
    getGanttLink(repoName) {
      return `/gantt/${this.owner}/${repoName}`
    },
    async getRepositories(owner) {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: organizationRepositories,
        variables: {
          owner
        },
        context: {
          headers: { authorization: authToken }
        }
      })
      return data.viewer.organization.repositories
    }
  }
})
</script>
