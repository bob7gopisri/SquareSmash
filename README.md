# SquareSmash
A grid based cell smashing game

### About SquareSmash
SquareSmash is a grid based realtime multi player multi room game, with features of starting and joining a game

### Tech Stack
* <a href="http://nodejs.org/" target="_blank">Node JS</a> as web server
* <a href="http://expressjs.com/" target="_blank">Express JS</a> as web framework
* <a href="http://socket.io/" target="_blank">Socket.io</a> server to make real time gaming possible
* <a href="http://http://docs.sequelizejs.com/en/latest/" target="_blank">Sequelize</a> with mysql as a database
* <a href="http://jade-lang.com/" target="_blank">Jade Template Engine</a> to render HTML templates

### Build and Run the application

#### Prerequisites
* Node JS
* MySQL server up and running
* Create Database with Name "square_smash_development"

#### Run the application

```
$> npm install --save sequelize-cli
$> sequelize db:migrate
$> npm start
```

Browse the following address: `http://localhost:3000`

### Data Models

