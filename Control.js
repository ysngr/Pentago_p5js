//=========================================================================================================
//  Control (Event Handler)
//=========================================================================================================


function mouseClicked() {
  selectElement();
  return ;
}


function touchEnded() {
  selectElement();
  return ;
}


function selectElement() {
  mdl.putMarble();
  mdl.selectElementsAboutRotation();
  return ;
}


function doubleClicked() {
  if ( mdl.isEnterButtonClicked() && mdl.rotation ) {
    rotateAndUpdate();
  }
  return ;
}


function keyPressed() {
  if ( keyCode == ENTER && mdl.rotation ) {
    rotateAndUpdate();
  }
  return ;
}


function rotateAndUpdate() {

  mdl.removePreMarbleIndex();
  mdl.rotate();
  mdl.disableRotate();
  mdl.updateConsoleText();
  mdl.updateTurn();

  /* check if game is finished */
  if ( mdl.isEnd() == true ) {
    mdl.lockBoard();
    mdl.setWinMessage();
  }

  return ;
}
