# API app of WYT ( What you thinking?).

This repository is part of my WYT.com project, is just an aplication to give recommendations of movies, books, tv-shows and music.

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

Also you need nodeJS, this project were maded in the 16 version of node.

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

## 4: Explaning the project.
This is the backend part of a aplication, the fronted (`reactJS`) could be find in [this link]("https://github.com/germanruzca/wyt-frontend").

There are four web services that provide the full CRUD.

Here the four end-points to each web service:
### USERS: 
> people regesterd on the aplication
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
>storage the differents types of recomendations.
  
  - localhost/3001/types

    [routes]("/../src/routes/types.route.js") /
    [controller]("./../src/controllers/types.controller.js) /
    [model](src/database/models/types.model.js)
### AUTH: 
> to the login and sign up.
  - localhost/3001/auth

    [routes]("/../src/routes/auth.route.js") /
    [controller]("./../src/controllers/auth.controller.js)

## 5: JWT

Fisrt, you need create a user, `localhost/3001/auth/signup`
  ```json
  {
    "firstName": "John",
    "lastName": "Lennon",
    "username": "john123",
    "password": "john123",
  }
  ```
When you are in, you recive a response with an accesToken to use in others requests. You need to login (`localhost/3001/auth/login`) every time the token has expired.

[![View Api in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/14129745/UVXhobVi)