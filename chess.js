document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const game = new Chess();

    let selectedSquare = null; // Track selected square

    // Render the chessboard grid (8x8)
    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = (row + col) % 2 === 0 ? 'light' : 'dark';
            square.id = `${'abcdefgh'[col]}${row}`;
            board.appendChild(square);
        }
    }

    const updateBoard = () => {
        const squares = document.querySelectorAll('#board div');
        squares.forEach((square) => {
            const piece = game.get(square.id); // Get piece on this square
            square.innerHTML = ''; // Clear square
            if (piece) {
                const img = document.createElement('img');
                img.src = `chess_images/${piece.color}${piece.type}.png`; // Updated path
                img.alt = `${piece.color === 'w' ? 'White' : 'Black'} ${piece.type.toUpperCase()}`;
                square.appendChild(img); // Add image to the square
            }
        });
    
        // Update game status
        status.textContent = game.game_over()
            ? 'Game Over'
            : game.turn() === 'w'
            ? "Your Turn!"
            : "Computer Turn.";
    };

    // Handle square clicks
    board.addEventListener('click', (e) => {
        const clickedSquare = e.target.id;

        // If no square is selected, select this square
        if (!selectedSquare) {
            selectedSquare = clickedSquare;
            e.target.classList.add('selected'); // Highlight the selected square
            return;
        }

        // Try to make a move
        const move = game.move({ from: selectedSquare, to: clickedSquare });

        // If the move is valid, update the board
        if (move) {
            selectedSquare = null; // Reset selected square
            document.querySelector('.selected')?.classList.remove('selected');
            updateBoard();

            // Trigger AI move after 500ms
            setTimeout(makeAIMove, 500);
        } else {
            // Invalid move, deselect the square
            selectedSquare = null;
            document.querySelector('.selected')?.classList.remove('selected');
        }
    });

    // AI Move
    const makeAIMove = () => {
        if (game.game_over()) {
            status.textContent = 'Game Over!';
            return;
        }

        const moves = game.moves();
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        updateBoard();
    };

    // Initialize the board
    updateBoard();
});
