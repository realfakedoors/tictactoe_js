// Our singular board is best represented as a module:
const board = (() => {
  let boardState = ["", "", "",
                    "", "", "",
                    "", "", ""];
  
  return { boardState };
})();

// While we can use factories for players and pieces.
const player = (name, piece) => {
  return { name, piece }; 
};

const gamePiece = (type) => {
  let display = document.createElement('div');
  display.setAttribute('class', `game-piece ${type}`);
  display.textContent = type;
  
  return { display };
};


function playGame() {
  function displayBoard(board) {
    let squares = document.getElementsByClassName('square');
    squares = Array.from(squares);
    squares.forEach((square, i) => {
      if (board.boardState[i] == "X"){
        square.appendChild(gamePiece("X").display);
      } else if (board.boardState[i] == "O"){
        square.appendChild(gamePiece("O").display);
      };      
    });
  };
  
  function switchPlayers() {
    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    displayMessage(`${currentPlayer.name}'s turn...`);
  };
  
  function transposeBoard(board) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let checkLines = [];
    lines.forEach(line => checkLines.push([board[line[0]], board[line[1]], board[line[2]]]));
    return checkLines;
  };
  
  function checkForVictory(board) {
    board = transposeBoard(board);
    function equality(line) {
      if (line.every(value => value == line[0]) && line.every(value => value != "")) {
        return true;
      }
    };
    
    if (board.some(line => equality(line) == true)){
      displayMessage(`${currentPlayer.name} Wins! Play Again!`);
      return true;
    };
  };
  
  function checkForCatGame(board) {
    if (board.every(square => square != "")){
      displayMessage("Cat's Game! Play Again!");
      return true;
    };
  };
  
  function displayMessage(msg) {
    const window = document.getElementById('message-window');
    window.innerHTML = msg;
  };
  
  function emptySquare(sq) {
    if (sq.childNodes.length == 0){ return true; };
  };
  
  // Clears all event listeners and resets the boardState.
  function endGame(boardSquares) {
    Array.from(boardSquares).forEach((sq, i) => {
      new_sq = sq.cloneNode(true);
      sq.parentNode.replaceChild(new_sq, sq);
      board.boardState[i] = "";
    });
  };
  
  // Gameplay:
  
  let playerOneName = document.getElementById('p1-field').value;
  playerOne = playerOneName ? player(playerOneName, "X") : player("Player X", "X");
  document.getElementById('player-one').innerHTML = playerOne.name;
  
  let playerTwoName = document.getElementById('p2-field').value;
  playerTwo = playerTwoName ? player(playerTwoName, "O") : player("Player O", "O");
  document.getElementById('player-two').innerHTML = playerTwo.name;
  
  let msg = "Welcome to Tic-Tac-Toe! Enjoy!";
  displayMessage(msg);
  
  let currentPlayer = playerOne;

  const boardSquares = document.getElementsByClassName('square');
  Array.from(boardSquares).forEach((sq) => {
    sq.innerHTML = '';
  });
  
  // When an empty square is clicked, a player places their piece,
  // the game switches players, and the boardState is updated. 
  // If a victory or tie is detected, the board is frozen and the game is over.
  emptyBoardSquares = Array.from(boardSquares).filter(emptySquare);
  emptyBoardSquares.forEach((sq, i) => {
    sq.addEventListener('click', function(sq){
      if (sq.srcElement.childNodes.length == 0){
        sq.srcElement.appendChild(gamePiece(currentPlayer.piece).display);
        board.boardState[i] = currentPlayer.piece;
      };
      if (checkForVictory(board.boardState) || checkForCatGame(board.boardState)){
        endGame(boardSquares);
      } else {
        switchPlayers();
      };
    });
  });
};

playGame();