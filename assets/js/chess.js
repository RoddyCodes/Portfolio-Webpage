// chess.js

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const game = new Chess();

  let selectedSquare = null;

  // Render the chessboard grid (8x8)
  for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = (row + col) % 2 === 0 ? "light" : "dark";
      square.id = `${"abcdefgh"[col]}${row}`;
      board.appendChild(square);
    }
  }

  const updateBoard = (highlightMoves = []) => {
    const squares = document.querySelectorAll("#board div");
    squares.forEach((square) => {
      const piece = game.get(square.id);
      square.innerHTML = "";
      square.classList.remove("possible-move", "selected"); // Clean up squares

      if (piece) {
        const img = document.createElement("img");
        // THIS IS THE CORRECTED PATH
        img.src = `./assets/images/chess_images/${piece.color}${piece.type}.png`;
        img.alt = `${
          piece.color === "w" ? "White" : "Black"
        } ${piece.type.toUpperCase()}`;
        square.appendChild(img);
      }

      if (highlightMoves.includes(square.id)) {
        square.classList.add("possible-move");
      }
    });

    if (selectedSquare) {
      const selectedEl = document.getElementById(selectedSquare);
      if (selectedEl) {
        selectedEl.classList.add("selected");
      }
    }
    updateStatus();
  };

  const updateStatus = () => {
    let statusText = "";
    if (game.in_checkmate()) {
      statusText =
        "Checkmate! " + (game.turn() === "w" ? "Black" : "White") + " wins.";
    } else if (game.in_draw()) {
      statusText = "Draw!";
    } else if (game.in_check()) {
      statusText =
        "Check! " + (game.turn() === "w" ? "White" : "Black") + " is in check.";
    } else {
      statusText = "Turn: " + (game.turn() === "w" ? "White" : "Black");
    }
    status.textContent = statusText;
  };

  const getPossibleMoves = (square) => {
    const moves = game.moves({
      square: square,
      verbose: true,
    });
    return moves.map((move) => move.to);
  };

  board.addEventListener("click", (e) => {
    const squareElement = e.target.closest("#board div");
    if (!squareElement) return;

    const clickedSquareId = squareElement.id;

    if (selectedSquare) {
      const move = game.move({
        from: selectedSquare,
        to: clickedSquareId,
        promotion: "q", // Automatically promote to queen for simplicity
      });

      if (move) {
        selectedSquare = null;
        updateBoard();
        if (!game.game_over()) {
          setTimeout(makeAIMove, 500); // AI moves after player
        }
      } else {
        // Invalid move, so deselect and check if new selection is valid
        selectedSquare = null;
        if (
          game.get(clickedSquareId) &&
          game.get(clickedSquareId).color === game.turn()
        ) {
          selectedSquare = clickedSquareId;
          const possibleMoves = getPossibleMoves(selectedSquare);
          updateBoard(possibleMoves);
        } else {
          updateBoard();
        }
      }
    } else if (
      game.get(clickedSquareId) &&
      game.get(clickedSquareId).color === game.turn()
    ) {
      // No square was selected, so select this one if it's a piece of the current player
      selectedSquare = clickedSquareId;
      const possibleMoves = getPossibleMoves(selectedSquare);
      updateBoard(possibleMoves);
    }
  });

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

  updateBoard();

  // Scroll Reveal Logic
  ScrollReveal().reveal(".about-me-image", {
    duration: 1000,
    origin: "bottom",
    distance: "20px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#about h2", {
    duration: 1000,
    origin: "top",
    distance: "20px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#about p", {
    duration: 1000,
    delay: 200,
    opacity: 0,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#projects h2", {
    duration: 1000,
    origin: "top",
    distance: "20px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".project-card", {
    duration: 1000,
    interval: 200,
    opacity: 0,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#contact h2", {
    duration: 1000,
    origin: "top",
    distance: "20px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#contact p", {
    duration: 1000,
    delay: 200,
    opacity: 0,
    easing: "ease-in-out",
  });
});
