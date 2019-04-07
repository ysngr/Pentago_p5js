//=========================================================================================================
//  Marble
//=========================================================================================================


let Marble = function() {
  this.col = color('#AA2222');  // empty color = darkred
  this.col_val = NOT_SELECTED;  // color value : black = 0, white = 1 (turn % 2), empty = NOT_SELECTED(=-1)
  this.existance = false;
  this.coordinate = [];
}


Marble.prototype.putMarble = function(col, col_val) {
  this.col = col;
  this.col_val = col_val;
  this.existance = true;
  return ;
};


Marble.prototype.removeMarble = function() {
  this.col = color('#AA2222');  // empty color = darkred
  this.col_val = NOT_SELECTED;
  this.existance = false;
  return ;
};


Marble.prototype.setCoordinate = function(coordinate) {
  this.coordinate.length = 0;  // initialize 
  this.coordinate.push(coordinate[0]);
  this.coordinate.push(coordinate[1]);
  return ;
};


Marble.prototype.getCoordinate = function(){
  return this.coordinate;
};


Marble.prototype.disable = function(){
  this.existance = true;
  return ;
};
