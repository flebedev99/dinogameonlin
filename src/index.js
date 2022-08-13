const gameArea = document.getElementById("game");
const fullbtn = document.getElementById("fullbtn");
const dino = document.getElementById("plr");
const cactus = document.getElementById("cacti");
let cactiX = 500;
let cactiY = 0;
let cactiW = 50;
let cactiH = 80;
let speed = 1;
let dinoY = 0;
let dinoX = 10;
let dinoW = 70;
let dinoH = 70;
let fullScreen = false; // Don't touch
let jumps = 0; // Don't touch
let multijump = false;
let YVelocity = 0; // Don't touch
let jumpHeight = 7; // How high the dino jumps
let GRAVITY = 0.1; // Gravity
let touchingGround = false; // Don't touch
let maximumJumps = 5; // Jumps if multi-jump is enabled the dino can make in the air
let gameOver = false; // Don't touch

fullbtn.onclick = function () {
  if (fullScreen === false) {
    gameArea.requestFullscreen();
    fullScreen = true;
    return;
  }
  fullScreen = false;
  document.exitFullscreen();
};
fullbtn.onmouseenter = function () {
  fullbtn.style.width = "60px";
  fullbtn.style.height = "60px";
};
fullbtn.onmouseleave = function () {
  fullbtn.style.width = "50px";
  fullbtn.style.height = "50px";
};
document.body.onkeydown = function () {
  if (multijump === false) {
    if (touchingGround === true) {
      YVelocity = jumpHeight;
      touchingGround = false;
      jumps++;
    }
  }
  if (multijump === true) {
    if (touchingGround === true) {
      YVelocity = jumpHeight;
      jumps++;
      if (jumps > maximumJumps - 1) {
        touchingGround = false;
        jumps = 0;
      }
    }
  }
};
function updateCactiPosition() {
  cactus.style.bottom = cactiY + "px";
  cactus.style.left = cactiX + "px";
}
function updatePlrPos() {
  dino.style.bottom = dinoY + "px";
}
function moveCacti() {
  cactiX -= speed;
  if (cactiX < -cactiW - 20 * Math.random()) {
    cactiX = 500;
  }
  updateCactiPosition();
}
function startGame() {
  moveCacti();
  gravity();
  speed += 0.0001;
  collision();
  if (gameOver === true) {
    return;
  }
  setTimeout(startGame, 1);
}
function gravity() {
  dinoY += YVelocity;
  YVelocity -= GRAVITY;
  if (YVelocity < -1) {
    YVelocity = -1;
  }
  if (dinoY < 0) {
    dinoY = 0;
    touchingGround = true;
  }
  if (dinoY > 300) {
    dinoY = 300;
    YVelocity = 0;
  }
  updatePlrPos();
}
function collision() {
  if (
    cactiX < dinoX + dinoW &&
    cactiX + cactiW > dinoX &&
    cactiY < dinoY + dinoH &&
    cactiH + cactiY > dinoY
  ) {
    gameOver = true;
  }
}
startGame();
