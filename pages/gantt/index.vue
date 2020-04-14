<template>
  <div class="container mx-auto px-4">
    <p class="text-sm mb-4 text-gray-700">
      <nuxt-link class="underline" to="/">home</nuxt-link> > gantt
    </p>

    <h1 class="text-xl mb-4">Select username or organization</h1>
    <ul class="list-disc ml-4">
      <li class="mb-4">
        <nuxt-link :to="getRepoListLink(user.login)">
          {{ user.login }}
        </nuxt-link>
      </li>
      <li
        v-for="organization in organizations"
        :key="organization.name"
        class="mb-4"
      >
        <nuxt-link :to="getRepoListLink(organization.login)">
          {{ organization.login }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import viewerOrganizations from '~/apollo/queries/viewerOrganizations.gql'

type Organzation = {
  login: string
  name: string
}

export default Vue.extend({
  data(): { organizations: Organzation[] } {
    return {
      organizations: [],
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  async beforeMount() {
    const queryResult = await this.getOrganzations()
    const organizations = queryResult.edges.map((organzation) => {
      const { login, name } = organzation.node
      return { login, name }
    })
    organizations.forEach((organization) => {
      this.organizations.push(organization)
    })
  },
  methods: {
    getRepoListLink(login) {
      return `/gantt/${login}`
    },
    async getOrganzations() {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: viewerOrganizations,
        context: {
          headers: { authorization: authToken },
        },
      })
      return data.viewer.organizations
    },
  },
})
</script>
