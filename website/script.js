document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const newGameBtn = document.getElementById('new-game-btn');
    const turnInfo = document.getElementById('turn-info');

    let currentPlayer = 'X';
    let gameActive = true;

    const cells = Array.from({ length: 9 }, (_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
        return cell;
    });

    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = clickedCell.getAttribute('data-index');
    
        if (!gameActive || cells[index].textContent !== '') return;
    
        cells[index].textContent = currentPlayer;
        cells[index].style.backgroundColor = currentPlayer === 'X' ? '#f39c12' : '#e743c3';
    
        if (checkWin()) {
            displayResult(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            displayResult('\nIt\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnInfo(); // Add this line to update the turn information
        }
    }
    
    function updateTurnInfo() {
        turnInfo.textContent = `Player ${currentPlayer}'s turn`;
        turnInfo.style.color = currentPlayer === 'X' ? '#fff' : '#000'; // Set white for X, black for O
    }    

    function checkWin() {
        // Implement your own logic to check for a win in rows, columns, and diagonals
        // Define winning combinations
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check each winning combination
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            return true; // Found a winner
        }
    }

    return false; // No winner found
    }

    function checkDraw() {
        return cells.every(cell => cell.textContent !== '');
    }

    function displayResult(result) {
    gameActive = false;
    const resultScreen = document.createElement('div');
    resultScreen.classList.add('result-screen');

    const resultText = document.createElement('div');
    resultText.textContent = result;
    resultScreen.appendChild(resultText);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.classList.add('new-game-btn');
    playAgainBtn.addEventListener('click', () => {
        resetGame();
        document.body.removeChild(resultScreen);
    });
    resultScreen.appendChild(playAgainBtn);

    const contactBtn = document.createElement('button');
    contactBtn.textContent = 'Contact Info';
    contactBtn.classList.add('new-game-btn');
    contactBtn.addEventListener('click', () => {
        displayContactInfo();
    });
    resultScreen.appendChild(contactBtn);

    document.body.appendChild(resultScreen);
}

function displayContactInfo() {
    // Create an overlay div
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Create a div for contact info
    const contactInfoScreen = document.createElement('div');
    contactInfoScreen.classList.add('result-screen', 'contact-info');

    const nameText = document.createElement('div');
    nameText.textContent = 'Creator: Rakshath';
    contactInfoScreen.appendChild(nameText);

    const contactText = document.createElement('div');
    contactText.textContent = 'Contact: eng20cs0278.rakshath.u.shetty@gmail.com';
    contactInfoScreen.appendChild(contactText);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.classList.add('new-game-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(contactInfoScreen);
    });
    contactInfoScreen.appendChild(closeBtn);

    // Append overlay and contact info div to the body
    document.body.appendChild(overlay);
    document.body.appendChild(contactInfoScreen);
}



    

    function resetGame() {
        currentPlayer = 'X';
        gameActive = true;
        turnInfo.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#fff';
        });
    }

    newGameBtn.addEventListener('click', resetGame);
});
