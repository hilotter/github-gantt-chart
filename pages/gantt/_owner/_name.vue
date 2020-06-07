<template>
  <div>
    <div class="container mx-auto px-4">
      <p class="text-sm mb-4 text-gray-700">
        <nuxt-link class="underline" to="/">home</nuxt-link> >
        <nuxt-link class="underline" to="/gantt">gantt</nuxt-link> >
        <nuxt-link class="underline" :to="`/gantt/${owner}`">{{
          owner
        }}</nuxt-link>
        > {{ repoName }}
      </p>

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
import dayjs from 'dayjs'
import repositoryIssues from '~/apollo/queries/repositoryIssues.gql'
import updateIssue from '~/apollo/mutations/updateIssue.gql'

type Issue = {
  id: string
  githubId: string
  name: string
  start: string
  end: string
  progress: number
  dependencies: string
  url: string
  body: string
}

type UpdatedParams = {
  start: Date
  end: Date
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
      currentViewMode: 'Week',
    }
  },
  async beforeMount() {
    const { owner, name } = this.$nuxt.$route.params
    this.owner = owner
    this.repoName = name

    const queryResult = await this.getRepoIssues(owner, name).catch((err) => {
      alert(
        `Can not access this repository issues.\nPlease add to access permission to this repository from GitHub App Setting.\n\nDetail: ${err.message}`
      )
      this.$router.push(`/gantt/${owner}`)
    })

    if (!queryResult) {
      return
    }

    const issues = queryResult.edges.map((issue) => {
      const { id, title, number, body, url } = issue.node
      return { id, title, number, body, url }
    })

    this.issues = this.generateGanttParts(issues)

    if (this.issues.length > 0) {
      const savedViewMode = localStorage.getItem('currentViewMode')
      if (savedViewMode) {
        this.currentViewMode = savedViewMode
      }
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
          name,
        },
        context: {
          headers: { authorization: authToken },
        },
      })
      return data.repository.issues
    },
    async updateGithubIssue(id, body) {
      const authToken = localStorage.getItem('auth._token.github')
      const client = this.$apollo.getClient()
      const { data } = await client.mutate({
        mutation: updateIssue,
        variables: {
          id,
          body,
        },
        context: {
          headers: { authorization: authToken },
        },
      })
      return data.issue
    },
    initializeGantt() {
      const that = this
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
                    ${issue.id} ${issue.name}
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
        },
        on_date_change(issue, start, end) {
          that.updateIssue(issue, {
            start,
            end,
          })
        },
      })
    },
    chanageViewMode(viewMode) {
      this.currentViewMode = viewMode
      localStorage.setItem('currentViewMode', viewMode)
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
        return part.start && part.end && dayjs(part.end) >= dayjs(part.start)
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
        githubId: issue.id,
        name: issue.title,
        start: startDate,
        end: endDate,
        progress: progress * 100,
        dependencies,
        url: issue.url,
        body: issue.body,
      }
    },
    updateIssue(currentIssue: Issue, updatedParams: UpdatedParams) {
      const startDate = dayjs(updatedParams.start).format('YYYY-MM-DD')
      const endDate = dayjs(updatedParams.end).format('YYYY-MM-DD')
      const updatedStartDate =
        currentIssue.start !== startDate ? startDate : null
      const updatedEndDate = currentIssue.end !== endDate ? endDate : null

      let updatedBody = currentIssue.body
      if (updatedStartDate) {
        const startDateRegexp = new RegExp(
          `(${process.env.START_DATE_STRING_TEMPLATE!}).+?(\r\n)`
        )
        updatedBody = updatedBody.replace(
          startDateRegexp,
          `$1 ${updatedStartDate}$2`
        )
      }
      if (updatedEndDate) {
        const endDateRegexp = new RegExp(
          `(${process.env.END_DATE_STRING_TEMPLATE!}).+?(\r\n)`
        )
        updatedBody = updatedBody.replace(
          endDateRegexp,
          `$1 ${updatedEndDate}$2`
        )
      }
      this.updateDataIssue(
        currentIssue,
        updatedStartDate,
        updatedEndDate,
        updatedBody
      )
      this.updateGithubIssue(currentIssue.githubId, updatedBody)
    },
    updateDataIssue(
      currentIssue: Issue,
      updatedStartDate: string | null,
      updatedEndDate: string | null,
      updatedBody: string
    ) {
      this.issues = this.issues.map((issue) => {
        if (issue.id === currentIssue.id) {
          if (updatedStartDate) {
            issue.start = updatedStartDate
          }
          if (updatedEndDate) {
            issue.end = updatedEndDate
          }
          issue.body = updatedBody
        }
        return issue
      })
    },
  },
})
</script>

<style>
.details-container {
  width: 240px;
}
</style>
