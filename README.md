# github-gantt-chart

> show gantt-chart from github issues

## Usage

- add gantt chart item in your issue

```
#### 🗓 Start Date: 2020-04-01
#### 🗓 End Date: 2020-04-10
#### 📈 Progress (0-1): 0.2
#### 📝 Dependencies: #1, #2
```

refs: [sample issue template](https://github.com/hilotter/github-gantt-chart/tree/master/.github/ISSUE_TEMPLATE)

- show gantt chart on below site

https://github-gantt-chart.herokuapp.com/gantt/{username}/{reponame}

## Build Setup

- Register GitHub OAuth application

https://github.com/settings/applications/new

- Create Gantt Issues

https://github.com/hilotter/github-gantt-chart/tree/master/.github/ISSUE_TEMPLATE

- Application Setup

```bash
# copy .env
$ cp .env.sample .env

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
