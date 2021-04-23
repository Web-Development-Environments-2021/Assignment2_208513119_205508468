// create pacman and mosters objects
let pacman = new Object();
let monster1 = new Object();
let monster2 = new Object();
let monster3 = new Object();
let monster4 = new Object();

// load mosters images
let monster1Img = new Image();
monster1Img.src = "./resources/blueMonster.png"
let monster2Img = new Image();
monster2Img.src = "./resources/pinkMonster.png"
let monster3Img = new Image();
monster3Img.src = "./resources/greenMonster.png"
let monster4Img = new Image();
monster4Img.src = "./resources/brownMonster.png"

monster1.img = monster1Img;
monster2.img = monster2Img;
monster3.img = monster3Img;
monster4.img = monster4Img;

let monsters = [monster1, monster2, monster3, monster4];

var board;
var score;
var start_time;
var time_elapsed;
var interval;
let monstersInterval;
let monstersDrawInterval;

let isGameOn = false;

// variables from settings
let arrowKeys;
let numOfBalls;
let color60balls;
let color30balls;
let color10balls;
let gameTime;
let numOfMonsters;
let pac_color;
let lastKeyPress;

const context = canvas.getContext('2d');
const keysDown = {};
const audio = document.getElementById('gameAudio');

// ENUM DEFINE
const objEnum = Object.freeze({ "Nothing": 0, "Food10": 1, "Pacman": 2, "Food30": 3, "Obstacle": 4, "Food60": 6, "mon1": 7, "mon2": 8, "mon3": 9, "mon4": 10 });
const directions = Object.freeze({ "up": 1, "down": 2, "left": 3, "right": 4 });


// const directionsAngles = Object.freeze({"up": })
// add and remove keys events
window.onkeydown = (event) => (keysDown[event.keyCode] = true);
window.onkeyup = (event) => (keysDown[event.keyCode] = false);


// first screen
$(document).ready(function () {
  showWelcome();
});

let is_pacman_on_board;

function Start(pacColorFromUser, arrowKeysFromUser, numOfBalls, ballColor60, ballColor30, ballColor10, gameTimeFromUser, numOfMonstersFromUser) {
  board = [];
  score = 0;
  is_pacman_on_board = false;
  start_time = new Date();
  arrowKeys = arrowKeysFromUser;
  pac_color = pacColorFromUser;
  let numOfBalls60 = Math.round(0.6 * numOfBalls);
  let numOfBalls30 = Math.round(0.3 * numOfBalls);
  let numOfBalls10 = Math.round(0.1 * numOfBalls);
  var food_remain = numOfBalls60 + numOfBalls30 + numOfBalls10;
  gameTime = gameTimeFromUser;
  numOfMonsters = numOfMonstersFromUser;
  isGameOn = true;

  playGameMusic();

  // filling the board
  for (var i = 0; i < 10; i++) {
    board[i] = [];
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    for (var j = 0; j < 10; j++) {
      if ((i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 5) || (i == 6 && j == 1) || (i == 6 && j == 2)) {
        board[i][j] = objEnum.Obstacle;
      } else {
        board[i][j] = objEnum.Nothing;
      }
    }
  }

  placeMonstersOnBoard();

  placePacmanOnBoard();

  // place all types of food on board
  placeFoodOnBoard(numOfBalls60, objEnum.Food60);
  placeFoodOnBoard(numOfBalls30, objEnum.Food30);
  placeFoodOnBoard(numOfBalls10, objEnum.Food10);

  interval = setInterval(UpdatePosition, 100);
  monstersUpdateInterval = setInterval(updateMonstersPosition, 500);
  monstersDrawInterval = setInterval(drawMonsters, 10);
}

function findRandomEmptyCell(board) {
  let i = Math.floor(Math.random() * 10);
  let j = Math.floor(Math.random() * 10);
  while (board[i][j] != objEnum.Nothing) {
    i = Math.floor(Math.random() * 10);
    j = Math.floor(Math.random() * 10);
  }
  return [i, j];
}

function placeFoodOnBoard(numOfBalls, type) {
  while (numOfBalls > 0) {
    let emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = type;
    numOfBalls--;
  }
}

function placeMonstersOnBoard() {
  //monster1
  // board[0][0] = objEnum.mon1;
  monster1.i = 0;
  monster1.j = 0;
  monster1.isActive = true;

  //monster2
  if (numOfMonsters > 1) {
    // board[0][9] =  objEnum.mon2; 
    monster2.i = 0;
    monster2.j = 9;
    monster2.isActive = true;
  }

  //monster3
  if (numOfMonsters > 2) {
    // board[9][0] =  objEnum.mon3;
    monster3.i = 9;
    monster3.j = 0;
    monster3.isActive = true;
  }

  //monster4
  if (numOfMonsters > 3) {
    // board[9][9] =  objEnum.mon4;
    monster4.i = 9;
    monster4.j = 9;
    monster4.isActive = true;
  }
}

function placePacmanOnBoard() {
  let emptyCell = findRandomEmptyCell(board);
  pacman.i = emptyCell[0];
  pacman.j = emptyCell[1];
  board[emptyCell[0]][emptyCell[1]] = objEnum.Pacman;
  is_pacman_on_board = true;
}


function GetKeyPressed(typeOfKeys) {
  if (typeOfKeys === 1) {
    if (keysDown[38]) {
      lastKeyPress = directions.up;
      return directions.up;
    }
    if (keysDown[40]) {
      lastKeyPress = directions.down;
      return directions.down;
    }
    if (keysDown[37]) {
      lastKeyPress = directions.left;
      return directions.left;
    }
    if (keysDown[39]) {
      lastKeyPress = directions.right;
      return directions.right;
    }
  }
  else if (typeOfKeys === 2) {
    if (keysDown[87]) {
      lastKeyPress = directions.up;
      return directions.up;
    }
    if (keysDown[83]) {
      lastKeyPress = directions.down;
      return directions.down;
    }
    if (keysDown[65]) {
      lastKeyPress = directions.left;
      return directions.left;
    }
    if (keysDown[68]) {
      lastKeyPress = directions.right;
      return directions.right;
    }
  }
}

function Draw() {
  // canvas.width = canvas.width; //clean board
  canvas.height = document.getElementById('content').offsetHeight;
  lblScore.value = score;
  lblTime.value = time_elapsed;

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;


      //pacman 2
      if (board[i][j] === objEnum.Pacman) {
        if (lastKeyPress === directions.down) {
          context.beginPath();
          context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
          context.lineTo(center.x, center.y);
          context.fillStyle = pac_color;
          context.fill();
          context.beginPath();
          context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
          context.fillStyle = 'black';
          context.fill();
        }
        else if (lastKeyPress === directions.up) {
          context.beginPath();
          context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
          context.lineTo(center.x, center.y);
          context.fillStyle = pac_color;
          context.fill();

          context.beginPath();
          context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
          context.fillStyle = 'black';
          context.fill();
        }
        else if (lastKeyPress === directions.right) {
          // do not change
          context.beginPath();
          context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
          context.lineTo(center.x, center.y);
          context.fillStyle = pac_color;
          context.fill();

          context.beginPath();
          context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
          context.fillStyle = 'black';
          context.fill();

        }
        else if (lastKeyPress === directions.left) {
          context.beginPath();
          context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
          context.lineTo(center.x, center.y);
          context.fillStyle = pac_color;
          context.fill();

          context.beginPath();
          context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
          context.fillStyle = 'black';
          context.fill();
        }
        else {
          //start of the game - Pacman Draw
          context.beginPath();
          context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
          context.lineTo(center.x, center.y);
          context.fillStyle = pac_color;
          context.fill();

          context.beginPath();
          context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
          context.fillStyle = 'black';
          context.fill();
        }
      }

      //food10
      else if (board[i][j] === objEnum.Food10) {
        // context.beginPath();
        // context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        let x1 = center.x - 15;
        let y1 = center.y;
        let radius1 = 10;
        let startAngle1 = Math.PI * 0.5;
        let endAngle1 = Math.PI * 1.5;
        let antiClockwise1 = false;

        let x2 = center.x + 15;
        let y2 = center.y;
        let radius2 = 10;
        let startAngle2 = Math.PI * 1.5;
        let endAngle2 = Math.PI * 0.5;
        let antiClockwise2 = false;

        context.beginPath();
        context.arc(x1, y1, radius1, startAngle1, endAngle1, antiClockwise1);
        context.arc(x2, y2, radius2, startAngle2, endAngle2, antiClockwise2);
        context.closePath();

        let my_gradient = context.createLinearGradient(x1, y1, x2, y2);
        my_gradient.addColorStop(0, "white");
        my_gradient.addColorStop(0.5, color10balls);
        context.fillStyle = my_gradient;

        // context.fillStyle = color10balls; 
        context.fill();
      }
      //food30
      else if (board[i][j] === objEnum.Food30) {
        // context.beginPath();
        // context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        let x1 = center.x - 15;
        let y1 = center.y;
        let radius1 = 10;
        let startAngle1 = Math.PI * 0.5;
        let endAngle1 = Math.PI * 1.5;
        let antiClockwise1 = false;

        let x2 = center.x + 15;
        let y2 = center.y;
        let radius2 = 10;
        let startAngle2 = Math.PI * 1.5;
        let endAngle2 = Math.PI * 0.5;
        let antiClockwise2 = false;

        context.beginPath();
        context.arc(x1, y1, radius1, startAngle1, endAngle1, antiClockwise1);
        context.arc(x2, y2, radius2, startAngle2, endAngle2, antiClockwise2);
        context.closePath();

        let my_gradient = context.createLinearGradient(x1, y1, x2, y2);
        my_gradient.addColorStop(0, "white");
        my_gradient.addColorStop(0.5, color30balls);
        context.fillStyle = my_gradient;
        // context.fillStyle = color30balls; 
        context.fill();
      }
      //food60
      else if (board[i][j] === objEnum.Food60) {
        // context.beginPath();
        // context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        let x1 = center.x - 15;
        let y1 = center.y;
        let radius1 = 10;
        let startAngle1 = Math.PI * 0.5;
        let endAngle1 = Math.PI * 1.5;
        let antiClockwise1 = false;

        let x2 = center.x + 15;
        let y2 = center.y;
        let radius2 = 10;
        let startAngle2 = Math.PI * 1.5;
        let endAngle2 = Math.PI * 0.5;
        let antiClockwise2 = false;

        context.beginPath();
        context.arc(x1, y1, radius1, startAngle1, endAngle1, antiClockwise1);
        context.arc(x2, y2, radius2, startAngle2, endAngle2, antiClockwise2);
        context.closePath();

        let my_gradient = context.createLinearGradient(x1, y1, x2, y2);
        my_gradient.addColorStop(0, "white");
        my_gradient.addColorStop(0.5, color60balls);
        context.fillStyle = my_gradient;
        // context.fillStyle = color60balls; 
        context.fill();
      }
      // else if(board[i][j] === objEnum.mon1){
      //   context.drawImage(monster1Img, center.x -30, center.y-30, 60, 60);
      // }

      // else if(board[i][j] === objEnum.mon2){
      //   context.drawImage(monster2Img, center.x -30, center.y-30, 60, 60);
      // }

      // else if(board[i][j] === objEnum.mon3){
      //   context.drawImage(monster3Img, center.x -30, center.y-30, 60, 60);
      // }

      // else if(board[i][j] === objEnum.mon4){
      //   context.drawImage(monster4Img, center.x -30, center.y-30, 60, 60);
      // }
      

      else if (board[i][j] === objEnum.Obstacle) { // obstacle
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = 'black';
        context.fill();
      }
      
    }
  }
}

function UpdatePosition() {

  board[pacman.i][pacman.j] = 0;
  var keyPressed = GetKeyPressed(arrowKeys);

  // up
  if (keyPressed === 1 && pacman.j > 0 && board[pacman.i][pacman.j - 1] !== 4) {
    pacman.j--;
  }

  // down
  if (keyPressed === 2 && pacman.j < 9 && board[pacman.i][pacman.j + 1] !== 4) {
    pacman.j++;
  }

  // left
  if (keyPressed === 3 && pacman.i > 0 && board[pacman.i - 1][pacman.j] !== 4) {
    pacman.i--;
  }
  // right
  if (keyPressed === 4 && pacman.i < 9 && board[pacman.i + 1][pacman.j] !== 4) {
    pacman.i++;
  }

  // score adding by eating ball
  if (board[pacman.i][pacman.j] === objEnum.Food10) {
    score += 25;
  }
  else if (board[pacman.i][pacman.j] === objEnum.Food30) {
    score += 15;
  }
  else if (board[pacman.i][pacman.j] === objEnum.Food60) {
    score += 5;
  }

  // move the Pacman 
  board[pacman.i][pacman.j] = 2;

  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (time_elapsed > gameTime) {
    window.alert('Game completed');
    stopGame();
  }
  else {
    Draw();
  }
}


// show and hide divs
function showRegister() {
  $('#content').children().hide();
  $('#register').show();
  stopGame();
}

function showWelcome() {
  $('#content').children().hide();
  $('#welcome').show();
  stopGame();
}

function showLogin() {
  $('#content').children().hide();
  $('#login').show();
  stopGame();
}

function showSettings() {
  $('#content').children().hide();
  $('#settings').show();
  stopGame();
}

function showAbout() {
  $('#content').children().hide();
  let modal = document.getElementById('about');
  modal.style.display = 'block';
  stopGame();
}

function showGame(pacColor, arrowKeys, numOfBalls, ballColor60, ballColor30, ballColor10, gameTime, numOfMonsters) {
  $('#content').children().hide();
  $('#game').show();
  Start(pacColor, arrowKeys, numOfBalls, ballColor60, ballColor30, ballColor10, gameTime, numOfMonsters);
}

function closeAbout() {
  let modal = document.getElementById('about');
  modal.style.display = 'none';
}

function showContactUs() {
  $('#content').children().hide();
  $('#contactUs').show();
}


// close about by pressing on the window
let aboutModal = document.getElementById('about');
window.onclick = function (event) {
  if (event.target == aboutModal) {
    aboutModal.style.display = 'none';
  }
};

// close about by pressing on ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    aboutModal.style.display = 'none';
  }
});

function playGameMusic() {
  audio.play();
}

function stopGameMusic() {
  audio.pause();
  audio.currentTime = 0;
}

function stopGame() {
  if (isGameOn) {
    window.clearInterval(interval);
    stopGameMusic();
    isGameOn = false;
  }
}

function updateMonstersPosition() {
  let i = 0;
  for(i=0; i<monsters.length; i++) {
    if(monsters[i].isActive){
      let bestMove = monsterBestMoveToPackman(monsters[i]);
      if (bestMove === directions.up) {
        monsters[i].j -= 1;
      }
      else if (bestMove === directions.down) {
        monsters[i].j += 1;
      }
      else if (bestMove === directions.left) {
        monsters[i].i -= 1;
      }
      else if (bestMove === directions.right) {
        monsters[i].i += 1;
      }
    }
  }
  // drawMonsters();
}

function monsterBestMoveToPackman(monster) {
  let iDist = Math.abs(pacman.i - monster.i);
  let jDist = Math.abs(pacman.j - monster.j);


  if (iDist >= jDist) {
    if (pacman.i > monster.i) { // pacman is right to monster
      // check if there is an obstacle
      if (board[monster.i + 1][monster.j] === objEnum.Obstacle) {
        if(Math.random() > 0.5){
          return directions.down;
        }
        else{
          return directions.up;
        }
      }
      return directions.right;
    }
    else if (pacman.i < monster.i) { // pacman is left to monster
      if (board[monster.i - 1][monster.j] === objEnum.Obstacle) {
        if(Math.random() > 0.5){
          return directions.down;
        }
        else{
          return directions.up;
        }
      }
      return directions.left;
    }
  }
  else {
    if (pacman.j > monster.j) { // pacman is below monster
      if (board[monster.i][monster.j + 1] === objEnum.Obstacle) {
        if(Math.random() > 0.5){
          return directions.right;
        }
        else{
          return directions.left;
        }
      }
      return directions.down;
    }
    else if (pacman.j < monster.j) { // pacman is up to monster
      if (board[monster.i][monster.j - 1] === objEnum.Obstacle) {
        if(Math.random() > 0.5){
          return directions.right;
        }
        else{
          return directions.left;
        }
      }
      return directions.up;
    }
  }
}

function drawMonsters() {
  var centerOfCell = new Object();
  let i = 0;
  for(i = 0; i < monsters.length; i++){
    if(monsters[i].isActive){
      centerOfCell.x = monsters[i].i * 60 + 30;
      centerOfCell.y = monsters[i].j * 60 + 30;
      context.drawImage(monsters[i].img, centerOfCell.x - 30, centerOfCell.y - 30, 60, 60);
    }
  }
}

