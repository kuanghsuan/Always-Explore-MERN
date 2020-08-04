# Alays Expore-MERN
<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

<p align="center">
  <img src="./demo.jpg" />  
</p>


> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/kuanghsuan/always-explore.git
$ npm i
```

## project structure
```terminal
frontend/
   package.json
   .env (to create .env, check [prepare your secret session])
backend/
   nodemon.json
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## frontend (PORT: 3000)
```terminal
$ cd frontend   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## backend usage(PORT: 5000)
```terminal
$ cd backend   // go to backend folder
$ npm i       // npm install pacakges
$ npm start // run it locally
```

## Deploy backend to [Heroku](https://dashboard.heroku.com/)
```terminal
$ brew tap heroku/brew && brew install heroku
$ cd backend
$ npm i -g heroku
$ heroku login
...
$ heroku git:clone -a always-explore
$ cd always-explore
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

## Deploy frontend to [Firebase](https://firebase.google.com/docs/hosting/deploying)
```terminal
$ curl -sL https://firebase.tools | bash
$ cd frontend
$ firebase init
...
$ firebase deploy
```



