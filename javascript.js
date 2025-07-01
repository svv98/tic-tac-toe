const documentVariables = (function(){
  const startGameModal = document.querySelector('#startGame');
  const startGameForm = document.querySelector('#startForm');
  return {startGameModal, startGameForm}
})();

const events = (function(){
  documentVariables.startGameForm.addEventListener('submit', function(event){

    event.preventDefault();
    const formData = new FormData(this);

    const namePlayer1 = formData.get('nameP1');
    const tokenPlayer1 = formData.get('tokenP1');
    const colorPlayer1 = formData.get('colorP1');

    const namePlayer2 = formData.get('nameP2');
    const tokenPlayer2 = formData.get('tokenP2');
    const colorPlayer2 = formData.get('colorP2');

    console.log("PLAYER 1" );
    console.log("name: " + namePlayer1);
    console.log("token: " + tokenPlayer1);
    console.log("color: " + colorPlayer1);

    console.log("PLAYER 2" );
    console.log("name: " + namePlayer2);
    console.log("token: " + tokenPlayer2);
    console.log("color: " + colorPlayer2);

    documentVariables.startGameModal.close();
  });

})();

const gameBoard = (function(){
  let board= [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];

  const getBoard = () => board;

  const printBoard = () => {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  };

  function checkArr(row, col, currentPlayer){
    if (board[row][col] == ' ') {
      board[row][col]=currentPlayer.token;
      printBoard();
      return true
    }
    else {
      console.log('Token already there');
      return false
    };
  };

  return{getBoard, printBoard, checkArr}
})();

const playGame = (function(){
  documentVariables.startGameModal.showModal();
  let game = gameController();

  return {game}
})();

function gameController(playerOne = 'Player 1', playerTwo = 'Player 2', tokenOne = 'X', tokenTwo = 'O'){
  let board = gameBoard.getBoard();
  gameBoard.printBoard();

  function player(name, token){
    name; 
    token;
    return {name, token}
  }
  const player1 = player(playerOne, tokenOne);
  const player2 = player(playerTwo, tokenTwo);

  let currentPlayer = player1;
  let counter=0;
  const round = (row, col) => {
    console.log(currentPlayer.name);
        
    let change = gameBoard.checkArr(row, col, currentPlayer);

    if(change === true){
      changePlayer();
      if(roundCounter() === 9){
        gameOver();
      }
    }

    let win = winCheck();
    if(win){
      gameOver(win.name);
    }

  }; 

  const changePlayer = () => {
    currentPlayer = (currentPlayer==player1)? player2 : player1;
    return currentPlayer
  };

  const winCheck = () => {
    let winningChances = [
      board[0][0]+board[0][1]+board[0][2], board[1][0]+board[1][1]+board[1][2], board[2][0]+board[2][1]+board[2][2], 
      board[0][0]+board[1][0]+board[2][0], board[0][1]+board[1][1]+board[2][1], board[0][2]+board[1][2]+board[2][2],
      board[0][0]+board[1][1]+board[2][2], board[0][2]+board[1][1]+board[2][0]
    ];
    for (let chance of winningChances){
      if(chance === 'XXX'){
        return player1
      }
      else if (chance === 'OOO'){
        return player2
      }
    }
  };

  const roundCounter = ()=>{
    counter++;
    console.log(counter);
    return counter
  };

  return {round}
};

function gameOver(winner){
  if(winner){
    alert('GAME OVER \n CONGRATS ' + winner.toUpperCase() + '!!!');
  }
  else {
    alert("GAME OVER \n IT'S A TIE!");
  }
};

