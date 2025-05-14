// chess.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });

    // Chess Game Logic
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const game = new Chess();

    let selectedSquare = null;

    // Render the chessboard grid (8x8)
    function renderBoard() {
        boardElement.innerHTML = '';
        for (let row = 8; row >= 1; row--) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = (row + col) % 2 === 0 ? 'light' : 'dark';
                square.id = `${'abcdefgh'[col]}${row}`;
                boardElement.appendChild(square);
            }
        }
        updateBoard();
    }

    const updateBoard = (highlightMoves = []) => {
        const squares = document.querySelectorAll('#board div');
        squares.forEach((square) => {
            const piece = game.get(square.id);
            square.innerHTML = '';
            square.classList.remove('possible-move');
            square.classList.remove('selected');
            if (selectedSquare === square.id) {
                square.classList.add('selected')
            }
            if (piece) {
                const img = document.createElement('img');
                img.src = `chess_images/${piece.color}${piece.type}.png`;
                img.alt = `${piece.color === 'w' ? 'White' : 'Black'} ${piece.type.toUpperCase()}`;
                img.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                img.style.transform = 'scale(0)';
                img.style.opacity = '0';
                square.appendChild(img);
                setTimeout(() => {
                    img.style.transform = 'scale(1)';
                    img.style.opacity = '1';
                }, 0);
            }
            if (highlightMoves.includes(square.id)) {
                square.classList.add('possible-move');
            }
        });
        updateStatus();
    };

    const updateStatus = () => {
        let statusText = '';
        if (game.in_checkmate()) {
            statusText = 'Checkmate! ' + (game.turn() === 'w' ? 'Black' : 'White') + ' wins.';
        } else if (game.in_draw()) {
            statusText = 'Draw!';
        } else if (game.in_check()) {
            statusText = 'Check! ' + (game.turn() === 'w' ? 'White' : 'Black') + ' is in check.';
        } else {
            statusText = 'Turn: ' + (game.turn() === 'w' ? 'White' : 'Black');
        }
        statusElement.textContent = statusText;
    };

    // Function to get possible moves
    const getPossibleMoves = (square) => {
        const moves = game.moves({
            square: square,
            verbose: true
        });
        return moves.map(move => move.to);
    };

    // Handle square clicks
    boardElement.addEventListener('click', (e) => {
        const clickedSquare = e.target.id;

        if (!selectedSquare) {
            selectedSquare = clickedSquare;
            e.target.classList.add('selected');
            const possibleMoves = getPossibleMoves(selectedSquare);
            updateBoard(possibleMoves);
            return;
        }

        const move = game.move({ from: selectedSquare, to: clickedSquare });

        if (move) {
            selectedSquare = null;
            document.querySelector('.selected')?.classList.remove('selected');
            updateBoard();
            if (!game.game_over()) {
                setTimeout(makeAIMove, 500);
            }
        } else {
            selectedSquare = null;
            document.querySelector('.selected')?.classList.remove('selected');
            updateBoard();
        }
    });

    // AI Move
    const makeAIMove = () => {
        if (game.game_over()) {
            updateBoard();
            return;
        }

        const moves = game.moves();
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        updateBoard();
    };
    renderBoard();
});