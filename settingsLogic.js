function updateRangeNumOfBallsValue(val) {
    document.getElementById('numValue').innerHTML = val;
  }
  
  function setRandomSettings(){
    // todo: implement
  }

function validateGameTime(){
  let gameTimeFromUser = document.getElementById('set-game-time-input').value;
  return gameTimeFromUser < 60 ? false : true;
}

function applySettings() {
  if(!validateGameTime){
    alert("Minimun Game Time: 60 seconds!")
  }
}
