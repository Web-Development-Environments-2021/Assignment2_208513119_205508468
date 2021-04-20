function updateRangeNumOfBallsValue(val) {
    document.getElementById('numValue').innerHTML = val;
  }
  
function getRandomInt(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor(){
  let randColor = Math.floor(Math.random()*16777215).toString(16);
  let color = "#" + randColor;
  return color;
}

function setRandomSettings(){
  // let arrowKeysFromUser = 1;
  arrowKeys = 1;
  numOfBalls = getRandomInt(50,90);
  let ballColor60FromUser = getRandomColor();
  color60balls = ballColor60FromUser;
  let ballColor30FromUser = getRandomColor();
  color30balls = ballColor30FromUser;
  let ballColor10FromUser = getRandomColor();
  color10balls = ballColor10FromUser;
  gameTime = getRandomInt(60,1000);
  numOfMonsters = getRandomInt(1,4);
  showGame(arrowKeys, numOfBalls, color60balls, color30balls, color10balls, gameTime, numOfMonsters);
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
  color60balls = ballColor60FromUser;
  let ballColor30FromUser = document.getElementById('set-color-picker-30').value;
  color30balls = ballColor30FromUser;
  let ballColor10FromUser = document.getElementById('set-color-picker-10').value;
  color10balls = ballColor10FromUser;
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

