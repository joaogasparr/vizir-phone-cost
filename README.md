<h1 align="center">
  <img alt="Vizir Software Studio" title="Vizir Software Studio" src=".github/logo-software-studio.png" width="200px" />
</h1>

<h3 align="center">
  Vizir Software Studio 
</h3>

## :rocket: Getting Started

The following instructions show the walkthrough of how to copy the project to run on local machine for development and testing purposes.

### Prerequisites

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/install/)

### Installing

A step by step series of examples that tell you how to get a development env running

```
# Run the following command in a local directory to copy the project.

$> git clone https://github.com/joaogasparr/vizir-phone-cost.git
```

### :books: Databases

The first thing you must do is configure all database settings. To do this, follow the steps below at the terminal.

```
$> docker run --name postgresql -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:11
```

### :gear: Back-end

```
# First install back-end dependencies
$> cd ./backend/ && yarn

# Create the .env file by copying from .env.example and replace the information
$> cp .env.example .env

# Create database table structure
$> yarn sequelize db:migrate

# Create records in the database
$> yarn sequelize db:seed:all

# Start back-end service
$> yarn dev

# Start automated testing
$> yarn test
```

### :computer: Front-end

```
# First install front-end dependencies
$> cd ./frontend/ && yarn

# Then run app
$> yarn start

# Start automated testing
$> yarn test
```

### :iphone: Mobile

```
# First install mobile dependencies
$> cd ./mobile/ && yarn

# Second step start metro bundler
$> yarn start or yarn start --reset-cache

Then run the app on android
$> react-native run-android or yarn android

Then run the app on iOS
$> cd ./ios/ && pod install && cd ..
$> react-native run-ios or yarn ios

# Start automated testing
$> yarn test
```

---

## :memo: Licença

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

Made with ♥ by João Vitor Gaspar :wave: [See my linkedin!](https://www.linkedin.com/in/jo%C3%A3o-vitor-gaspar-b1b527170/)
