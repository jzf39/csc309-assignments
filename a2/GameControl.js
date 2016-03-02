//Detect collisions between game objects and set their collision flag true
//This could probably be more efficient

var checkForCollisions = function(gameObjects){
  detection = false;
  if(gameObjects.length <= 1){
    return false;
  }
  for(var i = 0; i < gameObjects.length; i++){
    this_collided = false;
    a = gameObjects[i];
    for(var j = 0; j < gameObjects.length; j++){
      if(i != j){
        b = gameObjects[j];
        x_dist = Math.abs(a.x - b.x);
        y_dist = Math.abs(a.y - b.y);
        //Taking width as radius (it doesn't need to be pixel-perfect, right?)
        dist = Math.hypot(x_dist, y_dist);
        if(dist < a.width + b.width){
          if(a.type == "bug" && b.type == "bug"){
            bugCollision(a,b);
          }
          else{
            a.isCollided = true;
            b.isCollided = true;
          }
          detection = true;
          this_collided = true;
        }
      }
    }
    if(!this_collided){
      //Object a is not currently colliding with anything
      a.isCollided = false;
    }
  }
  return detection;
}

function bugCollision(a,b){
  //Ignore if dying
  if(a.dying || b.dying){
    return true;
  }

  //Stall the slower bug
  if(a.value > b.value){
    b.isCollided = true;
    return true;
  }
  if(a.value < b.value){
    a.isCollided = true;
    return true;
  }
  //Bugs have the same speed
  if(a.x > b.x){
    b.isCollided = true;
    return true;
  }
  a.isCollided = true;
  return true;

}
