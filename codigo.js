const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let jugadorActual = 'X';
let gameOver = false;

const combinacionganadora = [
    //filas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columnas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonales
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] === '' && !gameOver) {
        board[index] = jugadorActual;
        event.target.textContent = jugadorActual;
        checkeoGanador();
        jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    }
}

function checkeoGanador() {
    for (const combinacion of combinacionganadora) {
        const [a, b, c] = combinacion;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            messageElement.textContent = `Jugador ${board[b]} Gana!`;
            resaltoGanador(combinacion); // Resalto las celdas ganadoras
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        messageElement.textContent = 'Empate!';
    }
}

function resaltoGanador(combinacion) {
    combinacion.forEach(index => {
        cells[index].classList.add('winner'); // Añado la clase que pinta la celda
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner'); // Quito el color de las celdas al reiniciar
    });
    gameOver = false;
    jugadorActual = 'X';
    messageElement.textContent = '';
}
