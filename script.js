const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
let isGameOver = false;

function jump() {
  if (isGameOver) return;

  bird.style.animation = "jump 0.5s";
  setTimeout(() => {
    bird.style.animation = "";
  }, 500);
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
      bird.style.top < `${randomHeight}px`
    ) {
      gameOver();
    }
  }

  let obstacleTimer = setInterval(moveObstacle, 20);
  setTimeout(createObstacle, 3000);
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
