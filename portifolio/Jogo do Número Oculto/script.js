let secretNumber, attempts;
const guessInput = document.getElementById('guess');
const guessBtn = document.getElementById('guess-btn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restart');

function initGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 5;
  attemptsDisplay.textContent = attempts;
  message.textContent = '';
  guessInput.value = '';
  restartBtn.style.display = 'none';
  guessInput.disabled = false;
  guessBtn.disabled = false;
}

function checkGuess() {
  const guess = parseInt(guessInput.value);
  
  if (isNaN(guess)) {
    message.textContent = 'Digite um número válido';
    return;
  }

  attempts--;
  attemptsDisplay.textContent = attempts;
  
  if (guess === secretNumber) {
    message.textContent = `Parabéns! O número era ${secretNumber}`;
    endGame();
  } else if (attempts === 0) {
    message.textContent = `Fim de jogo! O número era ${secretNumber}`;
    endGame();
  } else {
    message.textContent = guess > secretNumber ? 'Valor muito alto!' : 'Valor muito baixo!';
  }
}

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  restartBtn.style.display = 'inline-block';
}

guessBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', initGame);

initGame();