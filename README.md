# API app of WYT ( What you thinking?).

This repository is part of my WYT.com project, is just an application to give recommendations of movies, books, tv-shows and music.

## 1: Technologies
- nodeJS 
- Express
- Docker
- Sequelize
- Postrgres
- JWT
****
  
## 2: Requirements
You need Docker and Docker Compose on your computer, because there is a `docker-compose.yml` file that creates a container to the Postgres database.

Also you need nodeJS, this project was made in the 16 version of node.

## 3: Clone and run the project.

- Clone the repository
  ```bash 
  git clone https://github.com/germanruzca/wyt-backend.git

  cd wyt-backend
  ```
- Install dependencies
  ```bash
  npm install
  ```
- Introduce the environment variables

You can create a `.env` file or in ZSH

  ```bash
    WYT="~/wyt"
    WYT_PSQL_HOST="0.0.0.0"
    WYT_PSQL_CONTAINER_NAME="wyt_postgres"
    WYT_PSQL_LISTEN_PORT="5001"
    WYT_PSQL_VOLUME_PATH="${WYT}/postgres/data"
    WYT_PSQL_DB="wyt_databse"
    WYT_PSQL_USER="wyt_user"
    WYT_PSQL_PASSWORD="passwordDB"
    WYT_ACTION_SECRET="passwordAccess"
    WYT_REFRESH_SECRET="passwordRefresh"
  ```

- Go the docker folder
  ```bash
   cd containers
  ```
- Install docker images and create container.
  ```bash
    docker-compose up
  ```
- Start the project
  ```bash
    npm run start
  ```
  > There is nodemon package.

  > The backend starts in the 3001 port, sync with frontend.

## 4: Explaning the project.
This is the backend part of an application, the fronted (`reactJS`) could be find in [this link]("https://github.com/germanruzca/wyt-frontend").

There are four web services that provide the full CRUD.

Here the four end-points to each web service:
### USERS: 
> people registered on the application
  - localhost/3001/users
  
    [routes]("/../src/routes/users.route.js") /
    [controller]("./../src/controllers/users.controller.js) /
    [model](src/database/models/users.model.js)
### POSTS: 
> the post with the recommendations.
  - localhost/3001/posts

    [routes]("/../src/routes/posts.route.js") /
    [controller]("./../src/controllers/posts.controller.js) /
    [model](src/database/models/posts.model.js)
### TYPES
>storage the differents types of recommendations.
  
  - localhost/3001/types

    [routes]("/../src/routes/types.route.js") /
    [controller]("./../src/controllers/types.controller.js) /
    [model](src/database/models/types.model.js)
### AUTH: 
> to login and sign up.
  - localhost/3001/auth

    [routes]("/../src/routes/auth.route.js") /
    [controller]("./../src/controllers/auth.controller.js)

## 5: JWT

First, you need create a user, `localhost/3001/auth/signup`
  ```json
  {
    "firstName": "John",
    "lastName": "Lennon",
    "username": "john123",
    "password": "john123",
  }
  ```
When you are in, you receive a response with an accesToken to use in others requests. You need to login (`localhost/3001/auth/login`) every time the token has expired.

(For now, there is no data when the models are created, so you must to know: to create a post is need create at least a type and a user.)

You can see example:

[![View Api in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/14129745/UVXhobVi)
