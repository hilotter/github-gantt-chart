# github-gantt-chart

> show gantt-chart from github issues

![sample](https://user-images.githubusercontent.com/1042519/78112646-7ac65e80-7439-11ea-8861-ed4110cf7e46.png)

## Usage

- add gantt chart item in your issue

```
#### 🗓 Start Date: 2020-04-01 <= YYYY-MM-DD format (required)
#### 🗓 End Date: 2020-04-10 <= YYYY-MM-DD format (required)
#### 📈 Progress (0-1): 0.2 <= (optional)
#### 📝 Dependencies: #1, #2 <= related issues separated by , (optional)
```

refs: [sample issue](https://github.com/hilotter/github-gantt-chart/issues/1)

you can use an issue template to make typing easier.

refs: [sample issue template](https://github.com/hilotter/github-gantt-chart/tree/master/.github/ISSUE_TEMPLATE)


- show gantt chart on below site

https://github-gantt-chart.herokuapp.com/gantt/{username}/{reponame}

Example(require login): https://github-gantt-chart.herokuapp.com/gantt/hilotter/github-gantt-chart

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
