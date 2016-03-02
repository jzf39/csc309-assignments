
//Bug parameters (constant)
//Speeds for each level
var bugBlackSpeed_one = 150;
var bugRedSpeed_one = 75;
var bugOrangeSpeed_one = 60;

var bugBlackSpeed_two = 200;
var bugRedSpeed_two = 100;
var bugOrangeSpeed_two = 80;

//Point values
var bugBlackScore = 5;
var bugRedScore = 3;
var bugOrangeScore = 1;

//Probabilities
var bugBlackProb = 0.3
var bugRedProb = 0.3;
var bugOrangeProb = 0.4;

//Dimension of bug hitbox
var bugSize = 20;
var clickSize = 30;

var Bug = function(x,y,color, level){
  this.__proto__ = new Displayable(x, y, bugSize, bugSize, drawBug);
  this.type = "bug";
  this.isDead=false;
  this.opacity = 1;
  this.dying = false;
  this.color=color;
  this.detect = function(x,y){
    x_dist = Math.abs(this.x - x);
    y_dist = Math.abs(this.y - y);
    if(Math.hypot(x_dist, y_dist) <= clickSize){
      this.dying = true;
      score += this.value;
      this.value = 0;
    }
  }

  if(color == "black"){
    this.value = bugBlackScore;
    if(level == 1){
      this.speed = bugBlackSpeed_one;
    }
    else if(level == 2){
      this.speed = bugBlackSpeed_two;
    }
  }
  else if(color == "red"){
    this.value = bugRedScore;
    if(level == 1){
      this.speed = bugRedSpeed_one;
    }
    else if(level == 2){
      this.speed = bugRedSpeed_two;
    }
  }
  else if(color == "orange"){
    this.value = bugOrangeScore;
    if(level == 1){
      this.speed = bugOrangeSpeed_one;
    }
    else if(level == 2){
      this.speed = bugOrangeSpeed_two;
    }
  }

}

//Bug factory
function createBug(margin, level){
  //set margin as Infobar height + margin in main

  //generate random bug parameters
  var x = Math.floor(Math.random() * (canvas.width - bugSize - (2 * margin))) + margin;
  var y = 70;
  var color = getBugType();

  //create a bug based on level
  var Abug = new Bug(x,y,color, level);
  return Abug;
}

function getBugType(){
  var probability=Math.random();
  if (probability < 0.3){
    return "black";
  }
  else if (probability >= 0.3 && probability <= 0.6){
    return "red";
  }
  else if (probability > 0.6){
    return "orange";
  }
}

function drawBug(context){

  color = this.color;
  if(this.dying){
    this.opacity -= 0.01;
    this.speed = 0;
    if(this.opacity <= 0){
      this.isDead = true;
    }
  }

  //draw the object
  context.save();
  context.globalAlpha = this.opacity;
  context.beginPath();
  context.arc(this.x, this.y-5, 5, 0, 2*Math.PI);
  context.moveTo(this.x, this.y+1);
  context.bezierCurveTo(this.x-5, this.y, this.x-5, this.y+10, this.x, this.y+18.75);
  context.moveTo(this.x, this.y+1);
  context.bezierCurveTo(this.x+5, this.y-5, this.x+5, this.y+10, this.x, this.y+18.75);
  context.fillStyle = color;
  context.lineWidth = 1;
  context.strokeStyle = "#000000"
  context.stroke();
  context.fill();
  context.restore();
  context.fillStyle = "blue";


  //Move towards closest food
  var fid = findNearest(this.x,this.y);

  //Find distance to center of nearest food
  yp = (foods[fid].y)-this.y;
  xp= (foods[fid].x)-this.x;

  argc = Math.atan2(yp,xp);

  x_distance = Math.cos(argc);
  y_distance = Math.sin(argc);
  if(this.isCollided && !this.dying){
    //Bugs in collision should let the other pass
    factor = -0.5;
  }
  else{
    factor = (this.speed/50) / (Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2))); //force bug to move this.speed/(ticks per second) pixels
  }

  this.x += factor * x_distance;
  this.y += factor * y_distance;

}
