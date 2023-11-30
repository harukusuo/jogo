const board = document.getElementById('board');
const message = document.getElementById('message');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
let currentPlayer = 'X';
let gameOver = false;

// inicializa o tabuleiro
function initializeBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => cellClick(i));
    board.appendChild(cell);
  }
}

// manipula o clique em uma célula
function cellClick(index) {
  if (gameOver) return;

  const cells = board.getElementsByClassName('cell');
  const cell = cells[index];

  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ffee4a' : '#31d5de';

    if (checkWinner()) {
      message.textContent = `Boa jogada! ${getCurrentPlayerName()} é o ganhador da partida!`;
      gameOver = true;
    } else if (isBoardFull()) {
      message.textContent = 'Houve um empate! Jogue novamente.';
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `É a vez de ${getCurrentPlayerName()}!`;
    }
  }
}

// verifica se há um vencedor
function checkWinner() {
  const cells = board.getElementsByClassName('cell');
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]             // diagonais
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a].textContent !== '' &&
           cells[a].textContent === cells[b].textContent &&
           cells[a].textContent === cells[c].textContent;
  });
}

// verifica se o tabuleiro está cheio (empate)
function isBoardFull() {
  const cells = board.getElementsByClassName('cell');
  return Array.from(cells).every(cell => cell.textContent !== '');
}

// retorna o nome do jogador atual
function getCurrentPlayerName() {
  return currentPlayer === 'X' ? playerXInput.value : playerOInput.value;
}

// reinicia o jogo
function resetGame() {
  const cells = board.getElementsByClassName('cell');
  Array.from(cells).forEach(cell => {
    cell.textContent = '';
    cell.style.color = '';
  });

  currentPlayer = 'X';
  gameOver = false;
  message.textContent = '';
}

// inicializa o jogo
initializeBoard();
