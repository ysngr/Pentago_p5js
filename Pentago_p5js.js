/* pentago (p5.js) */


/* grobal variables */
// constants for boardsize and marbles
const CANVAS_WIDTH = 900, CANVAS_HEIGHT = 600;
const BOARD_SIZE = 600;
const QUAD_SIZE = BOARD_SIZE/2 - 5*2;
const QUADRANT = 4, PLACE = 9;
const GUTTER = 60;
const MARBLE_DIST = (BOARD_SIZE/2 - GUTTER*2) / 2;
const MARBLE_DIAM = 45;
// constants(indexes) for quadrant and rotation
const FIRST_QUADRANT = 0, SECOND_QUADRANT = 1, THIRD_QUADRANT = 2, FOURTH_QUADRANT = 3;
const CLOCKWISE = 0, ANTICLOCKWISE = 1;
// constants for console
const CONSOLE_X = 750, CONSOLE_Y = 65;
const CONSOLE_WIDTH = 200, CONSOLE_HEIGHT = 100;
// constants for label
const LABEL_X = 750, QUAD_LABEL_Y = 155, ROT_LABEL_Y = 380;
const LABEL_WIDTH = 150, LABEL_HEIGHT = 35;
// constants for button
const BUTTON_SIZE = 75, LONG_BUTTON_SIZE = 100;
const BUTTON_LEFT_X = 670, BUTTON_RIGHT_X = 755;
const QUAD_BUTTON_UPPER_Y = 180, QUAD_BUTTON_LOWER_Y = 265, ROT_BUTTON = 405;
const QUAD_BUTTON_START_POINT = [
  [BUTTON_RIGHT_X, QUAD_BUTTON_UPPER_Y], // the first quadrant
  [BUTTON_LEFT_X, QUAD_BUTTON_UPPER_Y], // the second quadrant
  [BUTTON_LEFT_X, QUAD_BUTTON_LOWER_Y], // the third quadrant
  [BUTTON_RIGHT_X, QUAD_BUTTON_LOWER_Y]  // the fourth quadrant
];
const ROT_BUTTON_START_POINT = [
  [BUTTON_RIGHT_X, ROT_BUTTON], // clockwise
  [BUTTON_LEFT_X, ROT_BUTTON] // anticlockwise
];
const ENTER_BUTTON_X = 680, ENTER_BUTTON_Y = 530, ENTER_BUTTON_WIDTH = 150, ENTER_BUTTON_HEIGHT = 40;
// constants for index
const NOT_SELECTED = -1;
const x = 0, y = 1;



let mdl, view;


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  mdl = new Model();
  view = new View();
}


function draw() {
  view.board();
  view.marbles();
  view.console();
  view.turnComponents();
  if ( mdl.cmpLine[0][0] != NOT_SELECTED ) {
    view.completeLine();
  }
}
