function updateRangeNumOfBallsValue(val) {
    document.getElementById('numValue').innerHTML = val;
  }
  
  function setRandomSettings(){
    // todo: implement
  }

function validateGameTime(time){
  return time < 60 ? false : true;
}

function applySettings() {

  let arrowKeysFromUser;
  if(document.getElementById('set-arrow-keys-arrows').checked){
    arrowKeysFromUser = 1;
  }
  else if(document.getElementById('set-arrow-keys-wasd').checked){
    arrowKeysFromUser = 2;
  }
  else{
    arrowKeysFromUser = 0;
  }
  
  let numOfBallsFromUser = document.getElementById('set-range-num').value;
  let ballColor60FromUser = document.getElementById('set-color-picker-60').value;
  let ballColor30FromUser = document.getElementById('set-color-picker-30').value;
  let ballColor10FromUser = document.getElementById('set-color-picker-10').value;
  let gameTimeFromUser = document.getElementById('set-game-time-input').value;
  let numOfMonstersFromUser = document.getElementById('set-monsters-num-select').value;

  // validate inputs
  if(arrowKeysFromUser === 0){
    alert("Please Choose Game Keys");
  }
  else if(gameTimeFromUser === ""){
    alert("Please Enter Game Time")
  }
  else if(!validateGameTime(gameTimeFromUser)){
    alert("Minimun Game Time: 60 seconds!")
  }
  else {
    showGame(arrowKeysFromUser, numOfBallsFromUser, ballColor60FromUser, ballColor30FromUser, ballColor10FromUser, gameTimeFromUser, numOfMonstersFromUser);
  }
  
}

