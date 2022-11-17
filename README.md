# github-gantt-chart

> show gantt-chart from github issues

![sample](https://user-images.githubusercontent.com/1042519/78112646-7ac65e80-7439-11ea-8861-ed4110cf7e46.png)

## Build Local Setup

- Register GitHub App

https://github.com/settings/apps/new

- Create Gantt Issues

recommend that you register the following issue template in the repository where you want to use this gantt chart tool.

https://github.com/hilotter/github-gantt-chart/tree/master/.github/ISSUE_TEMPLATE

- env setting

```bash
# copy .env
$ cp .env.sample .env

# change the following environment variables to your setting
GITHUB_CLIENT_ID={generated client id}
GITHUB_CLIENT_SECRET={generated client secret}
GITHUB_APP_URL={GitHub App public link}
```

- Application Setup

```
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Usage

- add gantt chart item in your issue

```
#### 🗓 Start Date: 2020-04-01 <= YYYY-MM-DD format (required)
#### 🗓 End Date: 2020-04-10 <= YYYY-MM-DD format (required)
#### 📈 Progress (0-1): 0.2 <= (optional)
#### 📝 Dependencies: #1, #2 <= related issues separated by , (optional)
#### 🧮 Group: g <= grouping name (optional)
```

refs: [sample issue](https://github.com/hilotter/github-gantt-chart/issues/1)

you can use an issue template to make typing easier.

refs: [sample issue template](https://github.com/hilotter/github-gantt-chart/tree/master/.github/ISSUE_TEMPLATE)

- install GitHub App & grant access to the repository you want to view the gantt chart

http://localhost:3000/

- show gantt chart on your local

http://localhost:3000/gantt/{username}/{reponame}
