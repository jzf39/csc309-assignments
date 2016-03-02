
/*
  Superclass for clickable objects
  Subclass of Displayable
*/
var Clickable = function(x, y, width, height, drawFunction, clickFunction){
  this.__proto__ = new Displayable(x, y, width, height, drawFunction)
  this.click = clickFunction;

  this.detect = function(x,y){
    var inbounds_x = (x > this.x) && (this.x + this.width > x);
    var inbounds_y = (y  > this.y) && (this.y + this.height > y);
    if(inbounds_x && inbounds_y){
      this.click();
      return true;
    }
    return false;
  }
}
