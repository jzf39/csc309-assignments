
var asdf = function(height, score, timer){
  this.display = false; //whether or not to show bar
  this.score = score;
  this.height = height;
  this.timer = timer;
  this.__proto__ = new Displayable(0,0,0,0,drawInfoBar);
  this.isDead = false;
  this.draw = drawInfoBar;
}

function drawInfoBar(context){
  if(this.display){
    context.beginPath();
    context.lineWidth="5";
    context.moveTo(0,this.height);
    context.lineTo(canvas.width,this.height);
    context.stroke();
    context.lineWidth="1";
    context.font = "30px Arial";
    context.strokeText(Math.floor(this.timer).toString(),20,40);
    context.strokeText(score.toString(), 370,40);
  }
}
