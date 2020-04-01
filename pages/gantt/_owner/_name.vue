<template>
  <div>
    <div class="container mx-auto px-4">
      <h1 class="text-xl mb-4">
        <a
          :href="`https://github.com/${owner}/${repoName}`"
          target="_blank"
          rel="noopener"
        >
          {{ owner }}/{{ repoName }}
        </a>
      </h1>
      <ul class="mb-2">
        <li v-for="viewMode in viewModes" :key="viewMode" class="inline-block">
          <button
            class="text-sm px-4 py-2 rounded-full outline-none focus:outline-none mr-2 mb-1 shadow"
            type="button"
            @click="chanageViewMode(viewMode)"
          >
            {{ viewMode }}
          </button>
        </li>
      </ul>
    </div>

    <div v-show="show" class="w-screen mx-auto px-4">
      <svg id="gantt"></svg>
    </div>

    <div v-show="show" class="container mx-auto px-4">
      <p class="text-right text-sm">
        Display by
        <a href="https://frappe.io/gantt" target="_blank" rel="noopener">
          frappe/gantt
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import repositoryIssues from '~/apollo/queries/repositoryIssues.gql'

type Issue = {
  id: string
  name: string
  start: string
  end: string
  progress: number
  dependencies: string
  url: string
}

export default Vue.extend({
  data(): {
    show: Boolean
    owner: string
    repoName: string
    issues: Issue[]
    gantt: any
    viewModes: string[]
    currentViewMode: string
  } {
    return {
      show: false,
      owner: '',
      repoName: '',
      issues: [],
      gantt: null,
      viewModes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
      currentViewMode: 'Week'
    }
  },
  async beforeMount() {
    const { owner, name } = this.$nuxt.$route.params
    this.owner = owner
    this.repoName = name

    const queryResult = await this.getRepoIssues(owner, name)
    const issues = queryResult.edges.map((issue) => {
      const { title, number, body, url } = issue.node
      return { title, number, body, url }
    })

    this.issues = this.generateGanttParts(issues)

    if (this.issues.length > 0) {
      this.initializeGantt()
      this.show = true
    } else {
      alert('Gantt chart issues not found. please select repository again.')
      this.$router.push(`/gantt/${owner}`)
    }
  },
  methods: {
    async getRepoIssues(owner, name) {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.query({
        query: repositoryIssues,
        variables: {
          owner,
          name
        },
        context: {
          headers: { authorization: authToken }
        }
      })
      return data.repository.issues
    },
    initializeGantt() {
      // eslint-disable-next-line no-new
      this.gantt = new (window as any).Gantt('#gantt', this.issues, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: this.viewModes,
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: this.currentViewMode,
        date_format: 'YYYY-MM-DD',
        custom_popup_html: (issue) => {
          return `
            <div class="details-container">
                <div class="title">
                    ${issue.name}
                </div>
                <div class="subtitle">
                  Date: ${issue.start} - ${issue.end}
                </div>
                <div class="subtitle">
                  Progress: ${issue.progress}% completed
                </div>
                <div class="subtitle">
                  <a href="${issue.url}" target="_blank" rel="noopener">
                    Show this issue on GitHub
                  </a>
                </div>
              </a>
            </div>
          `
        }
      })
    },
    chanageViewMode(viewMode) {
      this.currentViewMode = viewMode
      this.gantt.change_view_mode(viewMode)
    },
    generateGanttParts(issues): Issue[] {
      const startDateRe = new RegExp(process.env.START_DATE_STRING_TEMPLATE!)

      const ganttIssues = issues.filter((issue) => {
        return issue.body.match(startDateRe)
      })

      const ganttParts = ganttIssues.map((issue) => {
        return this.generateGanttPart(issue)
      })

      const ganttData = ganttParts.filter((part) => {
        return part.start && part.end
      })

      return ganttData
    },
    generateGanttPart(issue): Issue {
      let startDate
      let endDate
      let progress = 0
      let dependencies = ''

      const lines = issue.body.split('\r\n')
      lines.forEach((line) => {
        if (line.includes(process.env.START_DATE_STRING_TEMPLATE!)) {
          startDate = line
            .split(process.env.START_DATE_STRING_TEMPLATE!)[1]
            .replace(/\s/g, '')
        }
        if (line.includes(process.env.END_DATE_STRING_TEMPLATE!)) {
          endDate = line
            .split(process.env.END_DATE_STRING_TEMPLATE!)[1]
            .replace(/\s/g, '')
        }
        if (line.includes(process.env.PROGRESS_STRING_TEMPLATE!)) {
          progress = line
            .split(process.env.PROGRESS_STRING_TEMPLATE!)[1]
            .replace(/\s/g, '')
        }
        if (line.includes(process.env.DEPENDENCIES_STRING_TEMPLATE!)) {
          dependencies = line
            .split(process.env.DEPENDENCIES_STRING_TEMPLATE!)[1]
            .replace(/\s/g, '')
        }
      })

      return {
        id: `#${issue.number}`,
        name: issue.title,
        start: startDate,
        end: endDate,
        progress: progress * 100,
        dependencies,
        url: issue.url
      }
    }
  }
})
</script>

<style>
.details-container {
  width: 240px;
}
</style>
