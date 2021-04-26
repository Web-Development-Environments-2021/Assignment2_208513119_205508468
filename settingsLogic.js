let UpKey;
let DownKey;
let RightKey;
let LeftKey;


function presskeyUP(){
  alert("Please Press on the UP arrow you want for game (after preesing OK)");
  document.getElementById("key-up").addEventListener('keydown', (even)=>{
    UpKey = even.keyCode;
  });
}

function presskeyDOWN(){
  alert("Please Press on the DOWN arrow you want for game (after preesing OK)");
  document.getElementById("key-down").addEventListener('keydown', (even)=>{
    DownKey = even.keyCode;
  });
}

function presskeyLEFT(){
  alert("Please Press on the LEFT arrow you want for game (after preesing OK)");
  document.getElementById("key-left").addEventListener('keydown', (even)=>{
    LeftKey = even.keyCode;
  });
}

function presskeyRIGHT(){
  alert("Please Press on the RIGHT arrow you want for game (after preesing OK)");
  document.getElementById("key-right").addEventListener('keydown', (even)=>{
    RightKey = even.keyCode;
  });
}


function updateRangeNumOfBallsValue(val) {
    document.getElementById('numValue').innerHTML = val;
  }
  
function getRandomInt(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor(){
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomSettings(){
  if(currentUser !== null){
    UpKey = 38;
    DownKey = 40;
    RightKey = 39;
    LeftKey = 37;
    let pacColorFromUser = getRandomColor();
    pacColor = pacColorFromUser;
    numOfBalls = getRandomInt(50,90);
    let ballColor60FromUser = getRandomColor();
    color60balls = ballColor60FromUser;
    let ballColor30FromUser = getRandomColor();
    color30balls = ballColor30FromUser;
    let ballColor10FromUser = getRandomColor();
    color10balls = ballColor10FromUser;
    gameTime = getRandomInt(60,70);
    numOfMonsters = getRandomInt(1,4);
    showGame(pacColor, UpKey, DownKey, RightKey, LeftKey, numOfBalls, color60balls, color30balls, color10balls, gameTime, numOfMonsters);
  }
  else{
    alert("You must log in / register first!")
  }
  
}

function validateGameTime(time){
  return time < 60 ? false : true;
}

function applySettings() {
  
  let pacColorFromUser = document.getElementById('set-color-pacman').value;
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
  if(UpKey == undefined){
    alert("Please Choose UP Key");
  }
  else if(DownKey == undefined){
    alert("Please Choose DOWN Key")
  }
  else if(RightKey == undefined){
    alert("Please Choose RIGHT Key")
  }
  else if(LeftKey == undefined){
    alert("Please Choose LEFT Key")
  }
  else if(gameTimeFromUser === ""){
    alert("Please Enter Game Time")
  }
  else if(!validateGameTime(gameTimeFromUser)){
    alert("Minimun Game Time: 60 seconds!")
  }
  else {
    if(currentUser !== null){
      showGame(pacColorFromUser, UpKey, DownKey,RightKey, LeftKey, numOfBallsFromUser, ballColor60FromUser, ballColor30FromUser, ballColor10FromUser, gameTimeFromUser, numOfMonstersFromUser);
    }
    else{
      alert("You must log in / register first!");
    }
  }
}

