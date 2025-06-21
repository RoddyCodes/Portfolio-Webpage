// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Simple form validation
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Simulate form submission
    alert("Thank you for your message! I will get back to you soon.");
    form.reset();
  });
});

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
      square.classList.remove("possible-move"); // Remove previous highlights
      if (selectedSquare === square.id) {
        square.classList.add("selected");
      }
      if (piece) {
        const img = document.createElement("img");
        img.src = `chess_images/${piece.color}${piece.type}.png`;
        img.alt = `${
          piece.color === "w" ? "White" : "Black"
        } ${piece.type.toUpperCase()}`;
        square.appendChild(img);
      }
      if (highlightMoves.includes(square.id)) {
        square.classList.add("possible-move");
      }
    });
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

  // Function to get possible moves
  const getPossibleMoves = (square) => {
    const moves = game.moves({
      square: square,
      verbose: true,
    });
    return moves.map((move) => move.to);
  };

  // Handle square clicks
  board.addEventListener("click", (e) => {
    const clickedSquare = e.target.id;

    if (!selectedSquare) {
      selectedSquare = clickedSquare;
      e.target.classList.add("selected");
      const possibleMoves = getPossibleMoves(selectedSquare);
      updateBoard(possibleMoves);
      return;
    }

    const move = game.move({ from: selectedSquare, to: clickedSquare });

    if (move) {
      selectedSquare = null;
      document.querySelector(".selected")?.classList.remove("selected");
      updateBoard();
      if (!game.game_over()) {
        // Trigger AI move after 500ms
        setTimeout(makeAIMove, 500);
      }
    } else {
      selectedSquare = null;
      document.querySelector(".selected")?.classList.remove("selected");
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
  updateBoard();

  // Scroll Reveal
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
