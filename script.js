const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
let isGameOver = false;
let birdPosition = 200;
let birdGravity = 2;

function jump() {
  if (isGameOver) return;

  birdGravity = -10;
}

function createObstacle() {
  if (isGameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameContainer.appendChild(obstacle);

  let obstaclePosition = 400;
  let randomHeight = Math.random() * 200 + 150;

  obstacle.style.top = `${randomHeight}px`;

  function moveObstacle() {
    if (isGameOver) return;

    obstaclePosition -= 2;
    obstacle.style.left = `${obstaclePosition}px`;

    if (obstaclePosition === -60) {
      clearInterval(obstacleTimer);
      gameContainer.removeChild(obstacle);
    }

    if (
      obstaclePosition > 0 &&
      obstaclePosition < 100 &&
      birdPosition < randomHeight + 200 &&
      birdPosition + 40 > randomHeight
    ) {
      gameOver();
    }
  }

  let obstacleTimer = setInterval(moveObstacle, 20);
  setTimeout(createObstacle, 3000);
}

function updateBird() {
  if (isGameOver) return;

  birdPosition += birdGravity;
  bird.style.top = `${birdPosition}px`;
  birdGravity += 0.5;

  if (birdPosition > gameContainer.clientHeight - 40) {
    gameOver();
  }

  requestAnimationFrame(updateBird);
}

function gameOver() {
  isGameOver = true;
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  const gameOverText = document.createElement("div");
  gameOverText.classList.add("game-over");
  gameOverText.innerText = "Game Over";
  gameContainer.appendChild(gameOverText);
}

document.addEventListener("keydown", jump);
createObstacle();
updateBird();
