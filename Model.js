//=========================================================================================================
//  Model
//=========================================================================================================


let Model = function() {

  // turn
  this.turn = 0;
  // marbles
  this.marble = [];
  this.genMarbles();
  // console
  this.text = "turn : " + (this.turn+1) + "\nBLACK";
  // quadrant
  this.selectedQuadrant = NOT_SELECTED;
  this.putMarbleExistance = false;
  // rotation
  this.selectedRotDirection = NOT_SELECTED;
  this.rotation = false;
  // previous marble index
  this.preMarbleIndex = [NOT_SELECTED, NOT_SELECTED];
  // complete line
  this.cmpLine = [];
  for (let i = 0; i < 2; i++) {
    this.cmpLine.push([NOT_SELECTED, NOT_SELECTED]);
  }
}


Model.prototype.genMarbles = function() {

  /* generate marbles */
  let marblesInTheSameQuadrant;
  for (let quadrant = 0; quadrant < QUADRANT; quadrant++) {
    marblesInTheSameQuadrant = [];
    for (let place = 0; place < PLACE; place++) {
      marblesInTheSameQuadrant.push(new Marble());
    }
    this.marble.push(marblesInTheSameQuadrant.concat());
  }


  // register center coordinate of the marble
  for (let quadrant = 0; quadrant < QUADRANT; quadrant++) {
    for (let place = 0; place < PLACE; place++) {
      this.marble[quadrant][place].setCoordinate(this.getMarbleCenter(quadrant, place));
    }
  }

  return ;
};


Model.prototype.getMarbleCenter = function(quadrant, place) {

  let centerP = [];

  // increment value of coordinate by quadrant
  switch( quadrant ) {
  case FIRST_QUADRANT :
    centerP.push(BOARD_SIZE / 2);
    centerP.push(0);
    break;
  case SECOND_QUADRANT :
    centerP.push(0);
    centerP.push(0);
    break;
  case THIRD_QUADRANT :
    centerP.push(0);
    centerP.push(BOARD_SIZE / 2);
    break;
  case FOURTH_QUADRANT :
    centerP.push(BOARD_SIZE / 2);
    centerP.push(BOARD_SIZE / 2);
    break;
  default :
  }

  // increment value of coordinate by marble place
  centerP[x] += (GUTTER + (place%3)*MARBLE_DIST);
  centerP[y] += (GUTTER + int(place/3)*MARBLE_DIST);

  return centerP;
};



//=====================================================================================
//  Handling for mouseClicked / touchEnded
//=====================================================================================


Model.prototype.putMarble = function() {

  for (let quadrant = 0; quadrant < QUADRANT; quadrant++) {
    for (let place = 0; place < PLACE; place++) {

      let marbleCenterP = this.marble[quadrant][place].getCoordinate();
      if ( dist(mouseX, mouseY, marbleCenterP[x], marbleCenterP[y]) <= MARBLE_DIAM/2 ) {
        if ( this.marble[quadrant][place].existance == false ) {
          /* put marble */
          if ( this.putMarbleExistance == true ) {  // in case that marble has been already put
            this.marble[this.preMarbleIndex[x]][this.preMarbleIndex[y]].removeMarble();
          }
          this.marble[quadrant][place].putMarble(this.getMarbleColor(), this.turn%2);
          this.registerPreIndex(quadrant, place);
          this.putMarbleExistance = true;
          this.enableRotate();  // allow to rotate
          return ;
        }
      }
    }
  }

  return ;
};


Model.prototype.getMarbleColor = function() {
  if ( this.turn % 2 == 0 ) {
    return color('#000000');  // marble color = black
  } else {
    return color('#FFFFFF');  // marble color = white
  }
};


Model.prototype.registerPreIndex = function(quadrant, place) {

  // register current index for changing place
  this.preMarbleIndex[x] = quadrant;
  this.preMarbleIndex[y] = place;

  return ;
};


Model.prototype.enableRotate = function() {

  // if conditions are meet then allow to rotate
  if ( this.putMarbleExistance == true && this.selectedQuadrant != NOT_SELECTED && this.selectedRotDirection != NOT_SELECTED ) {
    this.rotation = true;
  }

  return ;
};


Model.prototype.selectElementsAboutRotation = function() {

  // if marble is not put, cannot rotate
  if ( this.putMarbleExistance == false ) {
    return ;
  }

  this.selectQuadrant();
  this.selectRotDirection();
  this.enableRotate();

  return ;
};


Model.prototype.selectQuadrant = function() {

  if ( QUAD_BUTTON_UPPER_Y <= mouseY && mouseY <= QUAD_BUTTON_UPPER_Y + BUTTON_SIZE ) {
    if ( BUTTON_RIGHT_X <= mouseX && mouseX <= BUTTON_RIGHT_X + BUTTON_SIZE ) {
      this.selectedQuadrant = FIRST_QUADRANT;
    } else if ( BUTTON_LEFT_X <= mouseX && mouseX <= BUTTON_LEFT_X + BUTTON_SIZE ) {
      this.selectedQuadrant = SECOND_QUADRANT;
    }
  } else if ( QUAD_BUTTON_LOWER_Y <= mouseY && mouseY <= QUAD_BUTTON_LOWER_Y + BUTTON_SIZE ) {
    if ( BUTTON_LEFT_X <= mouseX && mouseX <= BUTTON_LEFT_X + BUTTON_SIZE ) {
      this.selectedQuadrant = THIRD_QUADRANT;
    } else if ( BUTTON_RIGHT_X <= mouseX && mouseX <= BUTTON_RIGHT_X + BUTTON_SIZE ) {
      this.selectedQuadrant = FOURTH_QUADRANT;
    }
  }

  return ;
};


Model.prototype.selectRotDirection = function() {

  if (ROT_BUTTON <= mouseY && mouseY <= ROT_BUTTON + LONG_BUTTON_SIZE) {
    if ( BUTTON_LEFT_X <= mouseX && mouseX <= BUTTON_LEFT_X + BUTTON_SIZE ) {
      this.selectedRotDirection = ANTICLOCKWISE;
    } else if ( BUTTON_RIGHT_X <= mouseX && mouseX <= BUTTON_RIGHT_X + BUTTON_SIZE ) {
      this.selectedRotDirection = CLOCKWISE;
    }
  }

  return ;
};



//=====================================================================================
//  Handling for mousePressed / doubleClicked
//=====================================================================================


Model.prototype.isEnterButtonClicked = function() {
  
  if ( ENTER_BUTTON_Y <= mouseY && mouseY <= ENTER_BUTTON_Y + ENTER_BUTTON_HEIGHT ) {
    if ( ENTER_BUTTON_X <= mouseX && mouseX <= ENTER_BUTTON_X + ENTER_BUTTON_WIDTH ) {
      return true;
    }
  }
  
  return false;
};


Model.prototype.removePreMarbleIndex = function() {

  this.preMarbleIndex[x] = NOT_SELECTED;
  this.preMarbleIndex[y] = NOT_SELECTED;

  return ;
};


const nextPlace = [
  [6, 3, 0, 7, 4, 1, 8, 5, 2], // clockwise
  [2, 5, 8, 1, 4, 7, 0, 3, 6]  // anticlockwise
];

Model.prototype.rotate = function() {

  let rotDir = (this.selectedRotDirection == CLOCKWISE ? CLOCKWISE : ANTICLOCKWISE);

  // evacution
  let temp = [];
  for (let place = 0; place < PLACE; place++) {
    temp.push(this.marble[this.selectedQuadrant][place]);
  }
  // replace (rotation)
  this.marble[this.selectedQuadrant].length = 0;  // initialize
  for (let place = 0; place < PLACE; place++) {
    this.marble[this.selectedQuadrant].push(temp[nextPlace[rotDir][place]]);
  }
  // modify coordinate
  for (let place = 0; place < PLACE; place++) {
    this.marble[this.selectedQuadrant][place].setCoordinate(this.getMarbleCenter(this.selectedQuadrant, place));
  }

  return ;
};


Model.prototype.disableRotate = function() {

  this.putMarbleExistance = false;
  this.rotation = false;
  this.selectedQuadrant = NOT_SELECTED;
  this.selectedRotDirection = NOT_SELECTED;

  return ;
};


Model.prototype.updateConsoleText = function() {

  this.text = "turn : " + (this.turn+2) + "\n" + this.getColorText(this.turn+2);
  // < notice >
  // variable "turn" has the number of previous turn
  // turn number on console shows next turn
  // therefore turn(console) = turn(variable) + 2

  return ;
};


Model.prototype.getColorText = function(trn) {

  let colorText;
  switch( trn % 2 ) {
  case 0 :
    colorText = "WHITE";
    break;
  case 1 :
    colorText = "BLACK";
    break;
  default :
  }

  return colorText;
};


Model.prototype.updateTurn = function() {
  this.turn++;
  return ;
};


Model.prototype.isEnd = function() {

  /* check lines */
  this.checkHorizontalLine();
  this.checkVerticalLine();
  this.checkDiagonalLine();

  if ( this.cmpLine[0][0] != NOT_SELECTED ) {
    // if line is completed, values in cmpLine are changed from NOT_SELECTED
    return true;
  }

  return false;
};


Model.prototype.checkHorizontalLine = function() {

  let nc, indexLeft, indexRight;

  for (let i = 1; i < 3; i++) {  // quadrant : i = 1(0), 2(3)
    for (let j = 0; j < 3; j++) {  // row : j = 0(1,2), 3(4,5), 6(7,8)
      nc = (i == 1 ? -1 : 1);

      indexLeft = [[i, j*3+0], [i, j*3+1], [i, j*3+2], [i+nc, j*3+0], [i+nc, j*3+1]];
      if ( this.doMarblesExist(indexLeft) && this.isConnected(indexLeft) ) {
        this.registerCompleteLine(indexLeft);
        return ;
      }

      indexRight = [[i, j*3+1], [i, j*3+2], [i+nc, j*3+0], [i+nc, j*3+1], [i+nc, j*3+2]];
      if ( this.doMarblesExist(indexRight) && this.isConnected(indexRight) ) {
        this.registerCompleteLine(indexRight);
        return ;
      }
    }
  }

  return ;
};


Model.prototype.checkVerticalLine = function() {

  let nc, indexUpper, indexLower;

  for (let i = 0; i < 2; i++) {  // quadrant : i = 0(3), 1(2)
    for (let j = 0; j < 3; j++) {  // column : j = 0(3,6), 1(4,7), 2(5,8)
      nc = i == 0? 3 : 1;

      indexUpper = [[i, j+0], [i, j+3], [i, j+6], [i+nc, j+0], [i+nc, j+3]];
      if ( this.doMarblesExist(indexUpper) && this.isConnected(indexUpper) ) {
        this.registerCompleteLine(indexUpper);
        return ;
      }

      indexLower = [[i, j+3], [i, j+6], [i+nc, j+0], [i+nc, j+3], [i+nc, j+6]];
      if ( this.doMarblesExist(indexLower) && this.isConnected(indexLower) ) {
        this.registerCompleteLine(indexLower);
        return ;
      }
    }
  }

  return ;
};


const index = [
  [[1, 0], [1, 4], [1, 8], [3, 0], [3, 4]], 
  [[1, 1], [1, 5], [0, 6], [3, 1], [3, 5]], 
  [[1, 3], [1, 7], [2, 2], [3, 3], [3, 7]], 
  [[1, 4], [1, 8], [3, 0], [3, 4], [3, 8]], 
  [[0, 1], [0, 3], [1, 8], [2, 1], [2, 3]], 
  [[0, 2], [0, 4], [0, 6], [2, 2], [2, 4]], 
  [[0, 4], [0, 6], [2, 2], [2, 4], [2, 6]], 
  [[0, 5], [0, 7], [3, 0], [2, 5], [2, 7]], 
];

Model.prototype.checkDiagonalLine = function() {

  for (let i = 0; i < 8; i++) {
    if ( this.doMarblesExist(index[i]) && this.isConnected(index[i]) ) {
      this.registerCompleteLine(index[i]);
      return ;
    }
  }

  return ;
};


Model.prototype.doMarblesExist = function(index) {

  for (let i = 0; i < 5; i++) {
    if ( this.marble[index[i][0]][index[i][1]].existance == false ) {
      return false;
    }
  }

  return true;
};


Model.prototype.isConnected = function(index) {

  for (let i = 0; i < 4; i++) {
    if ( this.marble[index[i][0]][index[i][1]].col_val != this.marble[index[i+1][0]][index[i+1][1]].col_val ) {
      return false;
    }
  }

  return true;
};


Model.prototype.registerCompleteLine = function(index) {

  this.cmpLine[0][x] = this.getEndPointX(index[0]);
  this.cmpLine[0][y] = this.getEndPointY(index[0]);
  this.cmpLine[1][x] = this.getEndPointX(index[4]);
  this.cmpLine[1][y] = this.getEndPointY(index[4]);

  return ;
};


Model.prototype.getEndPointX = function(index) {

  let xCoordinate = NOT_SELECTED;

  /* add by quadrant */
  if ( index[0] == FIRST_QUADRANT || index[0] == FOURTH_QUADRANT ) {
    xCoordinate = BOARD_SIZE / 2 + GUTTER;
  } else if ( index[0] == SECOND_QUADRANT || index[0] == THIRD_QUADRANT ) {
    xCoordinate = GUTTER;
  }

  /* add by place(row) */
  switch( index[1] % 3 ) {
  case 2 :
    xCoordinate += MARBLE_DIST;
  case 1 :
    xCoordinate += MARBLE_DIST;
  case 0 :
    break;
  default :
  }

  return xCoordinate;
};


Model.prototype.getEndPointY = function(index) {

  let yCoordinate = NOT_SELECTED;

  /* add by quadrant */
  if ( index[0] == FIRST_QUADRANT || index[0] == SECOND_QUADRANT ) {
    yCoordinate = GUTTER;
  } else if ( index[0] == THIRD_QUADRANT || index[0] == FOURTH_QUADRANT ) {
    yCoordinate = BOARD_SIZE / 2 + GUTTER;
  }
  /* add by place(row) */
  switch( int(index[1] / 3) ) {
  case 2 :
    yCoordinate += MARBLE_DIST;
  case 1 :
    yCoordinate += MARBLE_DIST;
  case 0 :
    break;
  default :
  }

  return yCoordinate;
};


Model.prototype.lockBoard = function() {

  /* lock all place */
  for (let quadrant = 0; quadrant < QUADRANT; quadrant++) {
    for (let place = 0; place< PLACE; place++) {
      this.marble[quadrant][place].disable();
    }
  }

  return ;
};


Model.prototype.setWinMessage = function() {

  this.text = "GAME SET !!!\n" + "winner : " + this.getColorText(this.turn);

  return ;
};
