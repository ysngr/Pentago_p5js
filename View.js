//=========================================================================================================
//  View
//=========================================================================================================


let View = function() {
}


View.prototype.board = function() {

  fill('#DC0000');  // board color = red
  noStroke();
  rectMode(CENTER);
  rect(GUTTER/2+BOARD_SIZE/2+BOARD_SIZE/4, BOARD_SIZE/4, QUAD_SIZE, QUAD_SIZE);  // the first quadrant
  rect(GUTTER/2+BOARD_SIZE/4, BOARD_SIZE/4, QUAD_SIZE, QUAD_SIZE);  // the second quadrant
  rect(GUTTER/2+BOARD_SIZE/4, BOARD_SIZE/2+BOARD_SIZE/4, QUAD_SIZE, QUAD_SIZE);  // the third quadrant
  rect(GUTTER/2+BOARD_SIZE/2+BOARD_SIZE/4, BOARD_SIZE/2+BOARD_SIZE/4, QUAD_SIZE, QUAD_SIZE);  // the fourth quadrant

  return ;
};


View.prototype.marbles = function() {

  for (let quadrant = 0; quadrant < QUADRANT; quadrant++) {
    for (let place = 0; place < PLACE; place++) {
      let marbleCenterP = mdl.getMarbleCenter(quadrant, place);  // get center coordinate for drawing
      if ( mdl.preMarbleIndex[x] == quadrant && mdl.preMarbleIndex[y] == place && mdl.preMarbleIndex[x] + mdl.preMarbleIndex[y] >= 0 ) {
        strokeWeight(4);
        stroke('#00A1E9');  // marble edge color = cyan
      } else {
        noStroke();  // marble edge color = none
      }
      // draw a marble
      let marbleCol = mdl.marble[quadrant][place].col;
      fill(red(marbleCol), green(marbleCol), blue(marbleCol));
      ellipse(marbleCenterP[x], marbleCenterP[y], MARBLE_DIAM, MARBLE_DIAM);
    }
  }

  return ;
};


View.prototype.turnComponents = function() {

  /* components for selecting quadrant */
  this.drawQuadrantLabel();
  this.drawQuadrantButtons();

  /* components for rotation */
  this.drawRotationLabel();
  this.drawRotationButtons();

  /* enter button */
  this.drawEnterButton();

  return ;
};


View.prototype.console = function() {

  /* draw a console label */
  stroke('#808080');  // edge color = gray
  strokeWeight(8);
  strokeJoin(BEVEL);
  fill('#696969');  // console color = dimgray
  rectMode(CENTER);
  rect(CONSOLE_X, CONSOLE_Y, CONSOLE_WIDTH, CONSOLE_HEIGHT);

  /* write information (turn,color,winner) */
  this.setConsoleText();

  return ;
};


View.prototype.setConsoleText = function() {

  noStroke();
  fill('#FFFFFF');  // text color = white
  textSize(20);
  textAlign(LEFT, BASELINE);
  text(mdl.text, CONSOLE_X-75, CONSOLE_Y-6);

  return ;
};


View.prototype.drawQuadrantLabel = function() {

  /* draw a label for quadrant */
  stroke('#A9A9A9');  // edge color = darkgray
  strokeWeight(3);
  strokeJoin(MITER);
  fill('#FFFAFA'); // label color = snow
  rectMode(CENTER);
  rect(LABEL_X, QUAD_LABEL_Y, LABEL_WIDTH, LABEL_HEIGHT);

  /* write information (selected quadrant) */
  let quadrantStr  = "Quadrant : ";
  if ( mdl.selectedQuadrant != NOT_SELECTED ) {
    quadrantStr += (mdl.selectedQuadrant + 1);
  }
  noStroke();
  fill(0);  // text color = black
  textSize(15);
  textAlign(LEFT, BASELINE);
  text(quadrantStr, LABEL_X-50, QUAD_LABEL_Y+5);

  return ;
};


View.prototype.drawQuadrantButtons = function() {

  strokeWeight(5);
  strokeJoin(BEVEL);
  fill('#C0C0C0');  // button color = silver
  rectMode(CORNER);

  for (let quadrant = 0; quadrant < QUADRANT; quadrant++) {
    // decide edge color
    if ( quadrant == mdl.selectedQuadrant ) {
      stroke('#00A1E9');  // edge color = cyan
    } else {
      stroke('#A9A9A9');  // edge color = darkgray
    }
    // draw quad button
    rect(QUAD_BUTTON_START_POINT[quadrant][x], QUAD_BUTTON_START_POINT[quadrant][y], BUTTON_SIZE, BUTTON_SIZE);
  }

  return ;
};


View.prototype.drawRotationLabel = function() {

  /* draw a label for rotation */
  stroke('#A9A9A9');  // edge color = darkgray
  strokeWeight(3);
  strokeJoin(MITER);
  fill('#FFFAFA');  // label color = snow
  rectMode(CENTER);
  rect(LABEL_X, ROT_LABEL_Y, LABEL_WIDTH, LABEL_HEIGHT);

  /* write information (direction of rotation) */
  let rotationStr  = "Rot : ";
  switch( mdl.selectedRotDirection ) {
  case 0 :
    rotationStr += "  clockwise";
    break;
  case 1 :
    rotationStr += "anticlockwise";
    break;
  default :
    rotationStr += "";
    break;
  }
  noStroke();
  fill(0);
  textSize(15);
  textAlign(LEFT, BASELINE);
  text(rotationStr, LABEL_X-68, ROT_LABEL_Y+5);

  return ;
};


View.prototype.drawRotationButtons = function() {

  strokeWeight(5);
  strokeJoin(BEVEL);
  fill('#C0C0C0');  // button color = silver
  rectMode(CORNER);

  for (let i = 0; i < 2; i++) {
    // decide edge color
    if ( i == mdl.selectedRotDirection ) {
      stroke('#00A1E9');  // edge color = cyan
    } else {
      stroke('#A9A9A9');  // edge color = darkgray
    }
    // draw rot button
    rect(ROT_BUTTON_START_POINT[i][x], ROT_BUTTON_START_POINT[i][y], BUTTON_SIZE, LONG_BUTTON_SIZE);
  }

  return ;
};


View.prototype.drawEnterButton = function() {

  // draw enter button
  stroke('#A9A9A9');  // edge color = darkgray
  strokeWeight(5);
  strokeJoin(CORNER);
  fill('#C0C0C0');  // button color = silver
  rectMode(CORNER);
  rect(ENTER_BUTTON_X, ENTER_BUTTON_Y, ENTER_BUTTON_WIDTH, ENTER_BUTTON_HEIGHT);
  // write "ENTER" on button
  noStroke();
  fill('#000000');  // text = white
  textSize(18);
  textAlign(CENTER, CENTER);
  text("ENTER", ENTER_BUTTON_X+ENTER_BUTTON_WIDTH/2, ENTER_BUTTON_Y+ENTER_BUTTON_HEIGHT/2+5);

  return ;
};


View.prototype.completeLine = function() {

  stroke('#2E2EFE');  // complete line color = blue
  strokeWeight(5);
  line(mdl.cmpLine[0][x], mdl.cmpLine[0][y], mdl.cmpLine[1][x], mdl.cmpLine[1][y]);

  return ;
};
