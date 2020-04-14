<template>
  <div class="container mx-auto px-4">
    <p class="text-sm mb-4 text-gray-700">
      <nuxt-link class="underline" to="/">home</nuxt-link> >
      <nuxt-link class="underline" to="/gantt">gantt</nuxt-link> >
      {{ owner }}
    </p>

    <h1 class="text-xl mb-4">Select repository</h1>
    <ul class="list-disc ml-4">
      <li v-for="(repository, index) in repositories" :key="index" class="mb-4">
        <nuxt-link :to="getGanttLink(repository.name)">
          {{ repository.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import viewerRepositories from '~/apollo/queries/viewerRepositories.gql'
import organizationRepositories from '~/apollo/queries/organizationRepositories.gql'

type Repository = {
  name: string
}

export default Vue.extend({
  data(): { owner: string; repositories: Repository[] } {
    return {
      owner: '',
      repositories: [],
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  async beforeMount() {
    const { owner } = this.$nuxt.$route.params
    this.owner = owner

    let queryResult
    if (owner === this.user.login) {
      queryResult = await this.getViewerRepositories()
    } else {
      queryResult = await this.getOrganizationRepositories()
    }
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
    async getViewerRepositories() {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: viewerRepositories,
        context: {
          headers: { authorization: authToken },
        },
      })
      return data.viewer.repositories
    },
    async getOrganizationRepositories() {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: organizationRepositories,
        variables: {
          owner: this.owner,
        },
        context: {
          headers: { authorization: authToken },
        },
      })
      return data.viewer.organization.repositories
    },
  },
})
</script>
