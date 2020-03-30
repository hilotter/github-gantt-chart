<template>
  <ul>
    <li v-for="organization in organizations" :key="organization.name">
      <a :href="getOrganizationLink(organization.login)">
        {{ organization.name }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import viewerOrganizations from '~/apollo/queries/viewerOrganizations.gql'

type Organzation = {
  login: string
  name: string
}

export default Vue.extend({
  data(): { organizations: Organzation[] } {
    return {
      organizations: []
    }
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
    getOrganizationLink(login) {
      return `/gantt/${login}`
    },
    async getOrganzations() {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: viewerOrganizations,
        context: {
          headers: { authorization: authToken }
        }
      })
      return data.viewer.organizations
    }
  }
})
</script>
