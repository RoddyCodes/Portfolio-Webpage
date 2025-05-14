document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const game = new Chess();

    let selectedSquare = null;

    // Render the chessboard grid (8x8)
    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = (row + col) % 2 === 0 ? 'light' : 'dark';
            square.id = `${'abcdefgh'[col]}${row}`;
            board.appendChild(square);
        }
    }

    const updateBoard = (highlightMoves = []) => {
        const squares = document.querySelectorAll('#board div');
        squares.forEach((square) => {
            const piece = game.get(square.id);
            square.innerHTML = '';
            square.classList.remove('possible-move'); // Remove previous highlights
             if (selectedSquare === square.id){
                 square.classList.add('selected')
             }
            if (piece) {
                const img = document.createElement('img');
                img.src = `chess_images/${piece.color}${piece.type}.png`;
                img.alt = `${piece.color === 'w' ? 'White' : 'Black'} ${piece.type.toUpperCase()}`;
                square.appendChild(img);
            }
            if (highlightMoves.includes(square.id)) {
                square.classList.add('possible-move'); // Highlight possible moves
            }
        });

        let statusText = '';
        if (game.game_over()) {
            const winner = getWinner();
            if (winner === 'Draw') {
                statusText = 'Draw!';
            } else if (winner) {
                statusText = `${winner} wins!`;
            } else {
                statusText = 'Game Over!';
            }
        } else {
            statusText = game.turn() === 'w' ? "Your Turn!" : "Computer Turn.";
        }
        status.textContent = statusText;
    };

    // Function to determine the winner
    const getWinner = () => {
        if (!game.game_over()) {
            return null;
        }
        if (game.in_checkmate()) {
            return game.turn() === 'w' ? 'Black' : 'White';
        } else if (game.in_stalemate() || game.in_draw()) {
            return 'Draw';
        }
        else{
            return null;
        }
    };

    // Handle square clicks
    board.addEventListener('click', (e) => {
        const clickedSquare = e.target.id;

        if (!selectedSquare) {
            selectedSquare = clickedSquare;
            e.target.classList.add('selected');
            const possibleMoves = game.moves({ square: selectedSquare });
            const targetSquares = possibleMoves.map(move => move.to);
            updateBoard(targetSquares);
            return;
        }

        const move = game.move({ from: selectedSquare, to: clickedSquare });

        if (move) {
            selectedSquare = null;
            document.querySelector('.selected')?.classList.remove('selected');
            updateBoard();
             if (!game.game_over()){
                 // Trigger AI move after 500ms
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

    // Initialize the board
    updateBoard();
});