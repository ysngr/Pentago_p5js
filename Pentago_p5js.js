/* pentago (p5.js) */


/* grobal variables */
// constants for boardsize and marbles
const CANVAS_WIDTH = 700, CANVAS_HEIGHT = 500;
const BOARD_SIZE = 500;
const QUAD_SIZE = BOARD_SIZE/2 - 5*2;
const MARBLE_DIAM = 40;
const QUADRANT = 4, PLACE = 9;
const GUTTER = 50;
const MARBLE_DIST = (BOARD_SIZE/2 - GUTTER*2) / 2;
// constants for quadrant and rotation
const FIRST_QUADRANT = 0, SECOND_QUADRANT = 1, THIRD_QUADRANT = 2, FOURTH_QUADRANT = 3;
const CLOCKWISE = 0, ANTICLOCKWISE = 1;
// constants for console
const CONSOLE_X = 600, CONSOLE_Y = 65;//
const CONSOLE_WIDTH = 175, CONSOLE_HEIGHT = 100;
// constants for label
const LABEL_X = 600, QUAD_LABEL_Y = 150, ROT_LABEL_Y = 315;//
const LABEL_WIDTH = 125, LABEL_HEIGHT = 25;
// constants for button
const BUTTON_LEFT_X = 545, BUTTON_RIGHT_X = 605;
const QUAD_BUTTON_UPPER_Y = 175, QUAD_BUTTON_LOWER_Y = 235, ROT_BUTTON = 340;//
const QUAD_BUTTON_START_POINT = [
  [BUTTON_RIGHT_X, QUAD_BUTTON_UPPER_Y], // the first quadrant
  [BUTTON_LEFT_X, QUAD_BUTTON_UPPER_Y], // the second quadrant
  [BUTTON_LEFT_X, QUAD_BUTTON_LOWER_Y], // the third quadrant
  [BUTTON_RIGHT_X, QUAD_BUTTON_LOWER_Y]  // the fourth quadrant
];
const BUTTON_SIZE = 50, LONG_BUTTON_SIZE = 75;
const ROT_BUTTON_START_POINT = [
  [BUTTON_RIGHT_X, ROT_BUTTON], // clockwise
  [BUTTON_LEFT_X, ROT_BUTTON] // anticlockwise
];
const ENTER_BUTTON_X = 540, ENTER_BUTTON_Y = 435, ENTER_BUTTON_WIDTH = 120, ENTER_BUTTON_HEIGHT = 40;
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
