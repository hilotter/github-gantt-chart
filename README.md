# github-gantt-chart

> show gantt-chart from github issues

![sample](https://user-images.githubusercontent.com/1042519/78112646-7ac65e80-7439-11ea-8861-ed4110cf7e46.png)

## Build Local Setup

- Register GitHub App

https://github.com/settings/apps/new

![howto1](https://user-images.githubusercontent.com/1042519/202369787-7530ee6f-b86a-4a53-9688-742fffcb7fce.png)

![howto2](https://user-images.githubusercontent.com/1042519/202369784-0a50f300-99a7-4153-891a-91c895a74a6f.png)

#### Repository permissions

![howto3](https://user-images.githubusercontent.com/1042519/202369781-a666bd31-a9bb-413d-aebd-832038068b04.png)

#### Organization permissions

![howto4](https://user-images.githubusercontent.com/1042519/202369778-1570bd44-6614-4e74-8bed-0c6749575f91.png)

#### public?

Please specify "Any account" if you want to use it with multiple people, such as for team development.

![howto5](https://user-images.githubusercontent.com/1042519/202369774-6e9bb58f-4a29-4fd0-8a41-ff667e14a8fa.png)

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

![howto6](https://user-images.githubusercontent.com/1042519/202369769-fc89902c-8acc-42c6-8972-98457fc61b32.jpg)

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

![howto7](https://user-images.githubusercontent.com/1042519/202369765-43db7328-8e4f-489b-8a38-95ee38b13d7a.jpg)

- show gantt chart on your local

http://localhost:3000/gantt/{username}/{reponame}
