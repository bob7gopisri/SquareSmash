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

#### Game
```
>> num_rows // Config taken from the /play url
>> num_columns // Config taken from the /play url
>> max_players // Config taken from the /play url
>> permalink // Randomly generated for the game
>> status // Status of the game (State Machine Mentioned below)
```

State Machine:
On creation of game object: "init"
On creation of the grid corresponding to the game: "created"
On joining of the second player to the game: "in_progress"
On game over: "complete"

#### Game User
```
>> game_id // Permalink of the game
>> user_name // Taken as an input on /game/:permalink screen
>> user_color // Randomly picked from internal config
>> user_status // Status of the user in the game.. Default TRUE.. on disconnect of user set to FALSE.. again TRUE on reconnect
>> user_score // Score of the User for the game
```

#### Game Grid

```
>> game_id // Permalink of the game
>> row_id // Row Number
>> column_id // Column Number
>> color // Set to the user's color on click event.. Default NULL
>> is_clicked // Boolean to figure out the clicked nature of the grid cell
```

### Approach
I have used NodeJS/ExpressJS web framework to build the web app. Jade to render the HTML pages. Socket.io is used to give realtime game updates. I have used Sequelize ORM with a MySQL database for storing the information regarding the game.

On opening the web page, a home page is rendered with the a facility to join the game.
Click on Play to create a new game. A config is taken as input on the number of rows, number of columns and max number of players. On submit, it will create a Game in "init" state. This call will in itself create a Game Grid of size #rows x #columns, with default color. Then move the status of the game to "created" state.
On rendering the game page, User would be asked to input his username, and "add user' event is to be raised to the server, which will handle the necessary logic for the user addition to the game. Once the user is successfully added(User is added to Socket with room name "permalink" of the grid), game grid is to be rendered.
On click of User grid, an event is raised to the server "user click", which will handle the logic of user click,  broadcast the entire grid as a "game wait" event, to all the users to update their grid(Reason to broadcast the entire grid is to handle the logic of any user's disconnection/idleness for a while should have all the clicked grid cells as per the actual grid). This is followed by wait for "refresh_time" on server side, before "game resume" event is broadcasted to all the clients.
On user disconnect, user's status changed to FALSE for the particular game and set to TRUE on reconnect.
Once the game is ended(last cell is clicked.. Logic handled in User Click server side event), a "game over" event is broadcasted to all the clients of the room, with the announcement of "Game Winners".

### APIs

#### Games
```
1) GET /game/max_players/:permalink => Get Max players for the game
2) PUT /game/update_status/:permalink/:status => Update Game status
3) GET /game/active_games => Get all active games
4) GET /game/:permalink => Get the game or to join the game

```

#### Game Grid
```
1) GET /game_grid/:game_id => Get the entire grid of the game
2) PUT /game_grid/update_cell/:game_id => Update Game grid cell
```

#### Game User
```
1) POST /game_user => Creates the game user
2) PUT /game_user/update_score/:game_id/:user_name => Increments the user score by one
3) PUT /game_user/update_status/:game_id/:user_name/:user_status => Updates the user status
4) GET /game_user/all_users/:game_id => Get all the users for the game, this is used to know the realtime scores of the users in the game
```

#### Play
```
1) POST /play => Will create the game based on the form submit values of the game, create grid and update the status of game to created
```

### Server Side Event handling

#### Add User
When the add tries to join a game...
```
1) Check if max_users is exceeded or not
2) If not add the user, update his color
3) Start game if Users >= 2
4) Update game status
5) Broad events accordingly ("game wait" if only one user, else "game join" to all)
```

#### User Click
When the user clicks on a grid..
```
1) Validates the correctness of a click(clicking already clicked cell)
2) If game is over, Broadcast Game Over event with all the grid, game users and winner information
3) If game is not over, Broadcast the updated grid information, wait for "refresh time" and "Game Resume" event to the clients.
```

#### User Disconnect
When the user disconnects..
```
1) Update the User Status to disconnected
2) Check if the GameRoom is underplayed, if yes, broadcast "Game Wait" event to the clients in the room.
```


### Done
1) I have learned from scratch and used Nodejs/Expressjs/Jade/Sequelize(mysql)/Socket IO Stack for building the app.
2) I am done with the server side game logic implementation and APIs required to start/update/join games.
3) Broadcasting socket events to Game Rooms for various server side events.

### ToDo
1) Fix the client side UI for Grid rendering and clicking and Game Join UI as well
2) Handle the user click event to emit the necessary events to server
