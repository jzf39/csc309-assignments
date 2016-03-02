
var Food = function(x, y, width, height, drawFunction){
   this.__proto__ = new Clickable(x, y, width/2, height/2,
     drawFunction, function(){killOnClick(this);});
   this.isDead = false;
   this.type = "food";
}


function drawFood(context){
  context.beginPath();
  context.arc(this.x + (this.width), this.y + (this.height),
  this.width, 0, 2*Math.PI);
  context.fillStyle = 'blue';
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = 'black';
  context.stroke();
  if(this.isCollided){
    this.isDead = true;
  }
  context.fillRect(this.x,this.y,15,15);
}
