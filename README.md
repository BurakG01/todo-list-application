## Todo List Application

Simple Todo List application using React on the frontend and Nodejs on the backend.

## Deploy Nodejs and React application on Kubernetes

- Containerize React and Nodejs Application using Docker
- Deploy and Manage application using Kubernetes

## Run locally

1. [Clone the repo](#1-clone-the-repo)

2. [Install environments ](#2-install-environments)

3. [Run the backend](#3-run-the-backend)

4. [Run the frontend](#4-run-the-frontend)

### 1. Clone the repo

Clone the repo locally. In a terminal, run:

`$ git clone https://github.com/BurakG01/todo-application.git`

### 2. Install environments

- Install [Node.js](http://dev.nodeca.com)
- Install [MongoDB](https://www.mongodb.com/try/download/community)

### 3. Run the backend

        Run the following command in terminal :

- Go to backend directory : `$ cd todo-backend`
- Install dependencies : `$ npm install`
- Run the application : `$ nodemon index.js` or `$ node index.js`

  You can change `MONGO_HOST` in `todo-backend/config.js` by default : `localhost`

### 4. Run the frontend

    Run the following command in terminal :

- Go to frontend directory : `$ cd todo-frontend`
- Install dependencies : `$ npm install`
- Run the application :`$ npm start`

## Run the application using Docker

1. [Pull mongo image](#1-pull-mongo-image)

2. [Build mongo image ](#2-build-mongo-image)

3. [Run the mongo image](#3-run-the-mongo-image)

4. [Build backend image ](#2-build-backend-image)

5. [Run the backend image](#3-run-the-backend-image)

6. [Build frontend image ](#2-build-frontend-image)

7. [Run the frontend image](#3-run-the-frontend-image)

### 1. Pull mongo image

- Pulling mongo image from docker hub

  `$ docker pull mongo:4.0.20`

### 2. Build mongo image

- Building mongo image

  `$ docker build -t mongo:4.0.20 .`

### 3. Run the mongo image

- Running mongo image with name

  `$ docker run -d --name todo-mongo mongo:4.0.20`

### 4. Build backend image

- Go to backend directory `$ cd todo-backend`
- Then build backend image run the following command :

  `$ docker build -t todo-backend:v1 .`

- Push image to your docker registry by following [push to docker hub](#push-images-to-docker-hub) steps.

### 5. Run the backend image

- Running backend image with link to access mongo container by given link

  `$ docker run -d --name todo-backend-v1 -p 3001:3001 --link todo-mongo:todo-mongo -e MONGO_HOST=todo-mongo burakgundogdu/todo-backend:v1`

### 6. Build frontend image

- Go to frontend directory `$ cd todo-frontend`
- Then build frontend image run the following command :

  `$ docker build -t todo-frontend:v1 .`

- Push image to your docker registry by following [push to docker hub](#push-images-to-docker-hub) steps.

### 7. Run the frontend image

- Running frontend image with link to access backend container by given link

  `$ docker run -d --name todo-frontend-v1 -p 3002:3000 --link todo-frontend-v1 :todo-frontend-v1 -e REACT_APP_BACK_END_HOST=todo-frontend-v1 burakgundogdu/todo-frontend:v1`

### Push images to docker hub

- Before running commands you must login to docker [Login](https://docs.docker.com/engine/reference/commandline/login/)

       $ docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
       $ docker push TARGET_IMAGE[:TAG]

- Example of backend , run following commands with your docker id instead of `burakgundogdu`

  `$ docker tag todo-backend:v1 burakgundogdu/todo-backend:v1`

  `$ docker push burakgundogdu/todo-backend:v1`

### Dockerizing Result

If you complete all steps successfully then you can check UI application on `localhost:3002` in your browser.

Also you can check docker containers by running `$ docker ps` command. You should see `todo-mongo` , `todo-backend-v1`, `todo-frontend-v1` containers working.
