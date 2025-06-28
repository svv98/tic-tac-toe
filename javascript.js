const gameBoard = (function(){
  let board= [['_','_','_'],['_','_','_'],['_','_','_']];
  let getBoard = () => board;
  return{getBoard}
})();
gameBoard.getBoard()[0][0] = 'x';
console.log(gameBoard.getBoard());


const gameController = (function(){

})();

function players(){
  let player1 = 1;
  let player2 = 2;
  return{player1, player2}
}
let player = players();
console.log(player);


