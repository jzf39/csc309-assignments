
/*
  Superclass for displayable objects
  x,y : coordinates for top left point
  width, height : dimensions of object
  draw : function to draw this object
*/

var Displayable = function(x, y, width, height, drawFunction){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = drawFunction;
  this.id = ""; // Child types may have identifiers
  this.isCollided = false;
  this.opacity = 1;
  this.type = "none";
}
