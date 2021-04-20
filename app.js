var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

// variables from settings
let arrowKeys;
let numOfBalls;
let color60balls;
let color30balls; 
let color10balls;
let gameTime;
let numOfMonsters;

const context = canvas.getContext('2d');
const keysDown = {};

// ENUM DEFINE
const objEnum = Object.freeze({"Nothing": 0, "Food10" : 1, "Pacman" : 2, "Food30" : 3, "Obstacle" : 4, "Food60" : 6});

// add and remove keys events
window.onkeydown = (event) => (keysDown[event.keyCode] = true);
window.onkeyup = (event) => (keysDown[event.keyCode] = false);


// first screen
$(document).ready(function () {
  showWelcome();
});

let is_pacman_on_board;

function Start(arrowKeysFromUser, numOfBalls, ballColor60, ballColor30, ballColor10, gameTime, numOfMonsters) {
  board = [];
  score = 0;
  pac_color = 'yellow';
  is_pacman_on_board = false;
  start_time = new Date();
  arrowKeys = arrowKeysFromUser;

  let numOfBalls60 = Math.round(0.6 * numOfBalls);
  let numOfBalls30 = Math.round(0.3 * numOfBalls);
  let numOfBalls10 = Math.round(0.1 * numOfBalls);
  var food_remain = numOfBalls60 + numOfBalls30 + numOfBalls10;

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

  placePacmanOnBoard();

  // place all types of food on board
  placeFoodOnBoard(numOfBalls60, objEnum.Food60);
  placeFoodOnBoard(numOfBalls30, objEnum.Food30);
  placeFoodOnBoard(numOfBalls10, objEnum.Food10);

  interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
  let i = Math.floor(Math.random() * 10);
  let j = Math.floor(Math.random() * 10);
  while(board[i][j] != objEnum.Nothing){
    i = Math.floor(Math.random() * 10);
    j = Math.floor(Math.random() * 10);
  }
  return [i, j];
}

function placeFoodOnBoard(numOfBalls, type) {
  while(numOfBalls > 0){
    let emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = type;
    numOfBalls--;
  }
}

function placePacmanOnBoard() {
  let emptyCell = findRandomEmptyCell(board);
  shape.i = emptyCell[0];
  shape.j = emptyCell[1];
  board[emptyCell[0]][emptyCell[1]] = objEnum.Pacman;
  is_pacman_on_board = true;
}


function GetKeyPressed(typeOfKeys) {
  if(typeOfKeys === 1){
    if (keysDown[38]) {
      return 1;
    }
    if (keysDown[40]) {
      return 2;
    }
    if (keysDown[37]) {
      return 3;
    }
    if (keysDown[39]) {
      return 4;
    }
  }
  else if(typeOfKeys === 2) {
    if (keysDown[87]) {
      return 1;
    }
    if (keysDown[83]) {
      return 2;
    }
    if (keysDown[65]) {
      return 3;
    }
    if (keysDown[68]) {
      return 4;
    }
  }
}

function Draw(keyPressed) {
  // canvas.width = canvas.width; //clean board
  canvas.height = document.getElementById('content').offsetHeight;
  lblScore.value = score;
  lblTime.value = time_elapsed;

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;

      //pacman
      if (board[i][j] === 2) {
        // if (keyPressed === 1) {

        // }
        // else if (keyPressed === 2){

        // }
        // else if (keyPressed === 3) {

        // }
        // else if (keyPressed === 4){
        //   context.beginPath();
        //   context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        //   context.lineTo(center.x, center.y);
        //   context.fillStyle = pac_color; 
        //   context.fill();
        //   context.beginPath();
        //   context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        //   context.fillStyle = 'black'; 
        //   context.fill();
        // }
        
      }

      //food10
      else if (board[i][j] === 1) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = color10balls; 
        context.fill();
      } 
      //food30
      else if (board[i][j] === 3) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = color30balls; 
        context.fill();
      } 
      //food60
      else if (board[i][j] === 6) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = color60balls; 
        context.fill();
      } 
      else if (board[i][j] === 4) { // obstacle
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = 'grey'; 
        context.fill();
      }
    }
  }
}

function UpdatePosition() {

  board[shape.i][shape.j] = 0;
  var keyPressed = GetKeyPressed(arrowKeys);

  // up
  if (keyPressed === 1 && shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
    shape.j--;
  }

  // down
  if (keyPressed === 2 && shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
    shape.j++;
  }

  // left
  if (keyPressed === 3 && shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
      shape.i--;
  }
  // right
  if (keyPressed === 4 && shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
      shape.i++;
  }

   // score adding by eating ball
   if (board[shape.i][shape.j] === objEnum.Food10) {
    score += 25;
  }
  else if(board[shape.i][shape.j] === objEnum.Food30){
    score += 15;
  }
  else if(board[shape.i][shape.j] === objEnum.Food60){
    score += 5;
  }

  // move the Pacman 
  board[shape.i][shape.j] = 2;

  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (score >= 20 && time_elapsed <= 10) {
    pac_color = 'green';
  }
  if (score == 50) {
    window.clearInterval(interval);
    window.alert('Game completed');
  } else {
    Draw(keyPressed);
  }
}

// function rotatePacman(x){

// }


// show and hide divs
function showRegister() {
  $('#content').children().hide();
  $('#register').show();
}

function showWelcome() {
  $('#content').children().hide();
  $('#welcome').show();
}

function showLogin() {
  $('#content').children().hide();
  $('#login').show();
}

function showSettings() {
  $('#content').children().hide();
  $('#settings').show();
}

function showAbout() {
  $('#content').children().hide();
  let modal = document.getElementById('about');
  modal.style.display = 'block';
}

function showGame(arrowKeys, numOfBalls, ballColor60, ballColor30, ballColor10, gameTime, numOfMonsters) {
  $('#content').children().hide();
  $('#game').show();
  Start(arrowKeys, numOfBalls, ballColor60, ballColor30, ballColor10, gameTime, numOfMonsters);
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