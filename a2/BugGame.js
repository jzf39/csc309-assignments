//Control variables
var clickables = [];
var gameObjects = []; //contains Displayables
var state;
var level;
var score;
var foods= [];
var bugs = [];
var bugCounter;
var timer;
var score;

//get highscores
var highscore1 = Math.max(0, localStorage.getItem("highscore1"));
var highscore2 = Math.max(0, localStorage.getItem("highscore2"));
var score;

//Start screen parameters
//Start game button
var startButtonX = 100; //x position of top left corner
var startButtonY = 400;
var startButtonWidth = 200;
var startButtonHeight = 75;

//Level selection
//Text
var levelTextX = 100;
var levelTextY = 150;
var levelTextWidth = 300;
var levelTextHeight = 50;

//Buttons
var levelOneButtonX = levelTextX + 110; //Coords for center of circle
var levelOneButtonY = levelTextY - 25;

var levelTwoButtonX = levelTextX + 210;
var levelTwoButtonY = levelOneButtonY;

var levelButtonRadius = 5;

//Game mode
var margin = 10; //Objects spawn within this distance of edge of viewport
var foodRadius = 15;

//Info bar
var asdfHeight = 50;
var info;

//Gameover screen
var gameOver_timer;

//Get ready for drawing/responding
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.addEventListener("mousedown", getPosition, false);

 /* Mousedown event on canvas */
function getPosition(event){
  var x = event.offsetX;
  var y = event.offsetY;
  document.getElementById("ptext").innerHTML = "Event x: " + x + " y: " + y;

  //Iterate over clickable objects searching for a hit
  for (var i = 0; i < clickables.length; i++) {
    result = clickables[i].detect(x,y);
    if(result == true){
      break;  //Only one thing can be clicked at a time
    }
  }
}

function startGame(){
  setState("start");
   drawID = setInterval(draw, 20);
}

/* Draw game objects by calling their draw functions
    All draw functions should have the same sig (take context as param)
*/
function draw(){
  context.clearRect(0, 0, canvas.width, canvas.height); //redraw board
  //Show highscores
  if(state == "start"){
    highScoreText(context);
  }
  //Generate bugs
  if(state == "game" && bugCounter <= 0){
    bugCounter = Math.round(Math.random()*100 + 50); //Random int from 20-60
    nBug = createBug(margin + asdfHeight, level);
    gameObjects.push(nBug);
    bugs.push(nBug);
    clickables.push(nBug);
  }
  else if(state == "game"&& bugCounter > 0){
    bugCounter = bugCounter - 1; //Generate a bug every 20-60 ticks
  }

  //Check for collisions
  if(state == "game"){
    checkForCollisions(gameObjects);
    info.timer = info.timer - 0.02;
    info.draw(context);
    //Check for game end conditions
    if(foods.length == 0){
      setScores();
      setState("gameover");
    }
    else if(info.timer <= 0){
      if(level == 1){
        setScores();
        level = 2;
        clear();
        setState("game");
      }
      else{
        gameOver_timer = 3;
        setScores();
        setState("victory")
      }
    }
  }

  if(state == "gameover"){
    gameOverText(context);
    gameOver_timer -= 0.02;
    if(gameOver_timer <= 0){
      context.fillStyle = "black";
      setState("start");
    }
  }

  if(state == "victory"){
    gameOver_timer -= 0.02;
    if(gameOver_timer > 0){
      victoryText(context);
    }
    else{
      setState("start");
    }
  }

  //Iterate over all objects
  for(var i = 0; i < gameObjects.length;i++){
    if(gameObjects[i].isDead){
      gameObjects.splice(i,1);  //Remove dead objects (bugs/food)
      context.clearRect(0, 0, canvas.width, canvas.height); //redraw board
    }
    else{
      gameObjects[i].draw(context);
    }
  }
  for(var i = 0; i < foods.length;i++){
    if(foods[i].isDead){
      foods.splice(i,1);  //Remove dead objects (bugs/food)
    }
  }
  for(var i = 0; i < bugs.length;i++){
    if(bugs[i].isDead){
      bugs.splice(i,1);  //Remove dead objects (bugs/food)
    }
  }
}

/*
  Clear entire board
*/
function clear() {
  gameObjects = [];
  clickables = [];
  foods = [];
  bugs = []
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setState(s) {
  // if start menu (use an ifelse or switch or whatever)
  clear();
  state = s;
  if(state == "start"){
    bugCounter = -1;
    if(typeof info != "undefined"){
      info.display = false;
    }

    //Create start button
    var startButton = new Button(startButtonX, startButtonY, startButtonWidth,
      startButtonHeight, "Start!", "startButton",
      function(){
        setState("game");
      }, "start");

    gameObjects.push(startButton);
    clickables.push(startButton);

    //Create level selection text
    var levelText = new Displayable(levelTextX,levelTextY,levelTextWidth,
      levelTextHeight,drawLevelText);
    gameObjects.push(levelText);

    //Create level selection buttons
    var levelOneButton = new Button(levelOneButtonX - levelButtonRadius,
      levelOneButtonY - levelButtonRadius,
      2*levelButtonRadius, 2*levelButtonRadius, "", "levelOneButton",
      function(){
        changeLevel(this);
      }, "level");
    levelOneButton.clicked = true; // Game starts in level 1 by default
    level = 1;

    var levelTwoButton = new Button(levelTwoButtonX - levelButtonRadius,
      levelTwoButtonY - levelButtonRadius,
      2*levelButtonRadius, 2*levelButtonRadius, "", "levelTwoButton",
      function(){
        changeLevel(this);
      }, "level");

    gameObjects.push(levelOneButton);
    clickables.push(levelOneButton);
    gameObjects.push(levelTwoButton);
    clickables.push(levelTwoButton);

  } else if(state == "game"){
    //Reset asdf
    score = 0;
    timer = 60;
    info = new asdf(asdfHeight, score, timer);
    info.display = true;

    //Pause button
    var pauseButton  = new Button(canvas.width/2 -40, 5, 40, 30, "Pause", "Pause",
    function() {playPause(this)}, "playpause");
    gameObjects.push(pauseButton);
    clickables.push(pauseButton);

    //Generate food at random locations
    var minHeight = Math.floor(canvas.height / 2) + asdfHeight;
    var maxHeight = Math.floor(canvas.height);

    for(var i = 0; i < 5; i++){
      //Generate random x, y where y is in the bottom half of the viewport
      //TODO: Check for overlap
      var x = Math.floor(Math.random() * (canvas.width - foodRadius
        - (2 * margin))) + margin;
      var y = Math.floor(Math.random() * Math.floor(canvas.height / 2))
          + Math.floor(canvas.height / 2) - foodRadius - margin;
      var food = new Food(x, y, foodRadius, foodRadius, drawFood);

      gameObjects.push(food);
      foods.push(food);

      if(checkForCollisions(gameObjects)){ //current food collides with already existing food
        gameObjects.pop();  //try again
        foods.pop();
        i = i - 1;
        //reset collision flags
        gameObjects[i].isCollided = false;
        foods[i].isCollided = false;
      }
    }
    //add food before everything else to make collision detection easier
    gameObjects.push(info);
  }
  else if(state=="gameover"){
    clear();
    gameOver_timer = 3;
  }
  else if(state == "victory"){
    clear();
    gameOver_timer = 3;
  }
}


function drawLevelText(context){
  context.beginPath();
  context.fillText("Level: ",this.x,this.y);
  context.fillText("1 ",this.x + 100, this.y + 25);
  context.fillText("2 ",this.x + 200,this.y + 25);
}

function changeLevel(levelButton){
  //change level and draw a filled circle in the button
  //Note that startbutton's click function can call setstate - this should
  //find the other button and turn it off
  levelOneButton = getGameObjById("levelOneButton");
  levelTwoButton = getGameObjById("levelTwoButton");
  context.clearRect(0, 0, canvas.width, canvas.height); //Buttons need to be redrawn

  if(levelButton.id == "levelOneButton"){
    level = 1;
    levelTextTimer = 2;
    levelOneButton.clicked = true;
    levelTwoButton.clicked = false;
  }
  else{
    // Must be level two
    level = 2;
    levelTextTimer = 2;
    levelOneButton.clicked = false;
    levelTwoButton.clicked = true;
  }
}

function playPause(button){
  if(button.id == "Pause"){
    button.id = "Play";
    button.text = "Play";
    clearInterval(drawID);
    draw();
  }
  else{
    button.id = "Pause";
    button.text = "Pause";
    drawID = setInterval(draw, 20);
  }
}


function getGameObjById(id){
  for(var i = 0; i < gameObjects.length; i++){
    if(gameObjects[i].id == id){
      return gameObjects[i];
    }
  }
  return null;
}

function findNearest(x,y){
  //Lets bugs find nearest food
  var Findex;
  var Distance = 10000;

  for(var i=0;i<foods.length;i++){
    if(foods[i]!=null){
      if(Math.sqrt(Math.pow((foods[i].x-x),2)+ Math.pow((foods[i].y-y),2))<Distance){
        Distance= Math.sqrt(Math.pow((foods[i].x-x),2)+ Math.pow((foods[i].y-y),2));
        Findex=i;
      }
    }
  }
  return Findex;
}

function gameOverText(ctx){
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
}

function highScoreText(ctx){
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Level 1 Highscore: " + highscore1, canvas.width/2, 250);
  ctx.fillText("Level 2 Highscore: " + highscore2, canvas.width/2, 300);
}

function victoryText(ctx){
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Victory!", canvas.width/2, canvas.height/2);
}

function setScores(){
  if(level == 1){
    oldScore = localStorage.getItem("highscore1");
    highscore1 = Math.max(score, highscore1);
    localStorage.setItem("highscore1", Math.max(highscore1,oldScore));
  }
  else{
    oldScore = localStorage.getItem("highscore2");
    highscore2 = Math.max(score, highscore2);
    localStorage.setItem("highscore2", Math.max(highscore2,oldScore));
  }
}
