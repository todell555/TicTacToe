//jumping off point: http://www.dreamincode.net/forums/topic/247361-simple-tic-tac-toe-using-html5-css3-and-javascript/

var player1Played = false;
var playerSymbol;
var squaresTaken;
var squareContent;
var winningCombinations;
var turn = 0;
var theCanvas;
var emptySquares = [1,2,3,4,5,6,7,8,9];
var squaresPlayed = 0;
var playNext; //random square for computer to play 

window.onload=function(){
  squaresTaken = new Array();
  squareContent = new Array();
  winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var l = 0; l <= 8; l++){
    squaresTaken[l] = false;
    squareContent[l]='';
  }
  
  playerSymbol = "X";
  
  $("#opener").click(function () {
 //   $("#mydialog").dialog("open");
    myDialogue();
    resetGame();
    $("#box").hide();
    $("#opener").hide();
    $("#resetBtn").hide();
  });
};

function myDialogue() {
  $("#mydialog").dialog({
    buttons: 
    [{
      text: 'X',
      click: function() {
        playerSymbol = "X";
        $(this).dialog('close');
        $("#box").show();
        $("#opener").show();
        $("#resetBtn").show();
      }},
     {
       text: 'O',
       click: function() {
         playerSymbol = "O";
         $(this).dialog('close');
         $("#box").show();
         $("#opener").show();
         $("#resetBtn").show();
       }}]
  }); 
}

function nextTurn() {
  if(player1Played === false){
    player1Turn();
  } else {
    //get random square for computer to play:
    if (emptySquares.length >= 1) {
      playNext = shuffleArray(emptySquares);
    }
    setTimeout(function(){
      computerPlay(playNext);
    },100);
  }
}

function player1Turn(canvasNumber){
  if (player1Played === false) {  // make sure player can't play more than once per turn
    theCanvas = "canvas"+canvasNumber;
    c = document.getElementById(theCanvas);
    cxt = c.getContext("2d");
    if(squaresTaken[canvasNumber-1] == false){
      if(playerSymbol == "X") {
        drawX(canvasNumber);
      } else if (playerSymbol == "O") {
        drawO(canvasNumber);
      }
    } else {
      alert("Pick an empty square!");
    }
  }
} 

function drawX(canvasNumber) {
  if (playerSymbol == "X") {
    player1Played = true;
  }
  cxt.font = "125px Play";
  cxt.fillStyle = "GhostWhite";
  cxt.fillText("X", 14, 93);
  cxt.strokeText("X", 14, 93);
  cxt.textAlign = "center";
  squareContent[canvasNumber-1] = 'X';
  turn++;
  squaresTaken[canvasNumber-1] = true;
  var index = emptySquares.indexOf(canvasNumber);
  emptySquares.splice(index, 1);
  setTimeout(function(){
    checkForWinners(squareContent[canvasNumber-1]);
  },100);
}

function drawO(canvasNumber) {
  if (playerSymbol == "O") {
    player1Played = true;
  }
  cxt.font = "125px Play";
  cxt.fillStyle = "GhostWhite";
  cxt.fillText("O", 7, 93);
  cxt.strokeText("O", 7, 93);
  cxt.textAlign = "center";
  turn++;
  squaresTaken[canvasNumber-1] = true;
  var index = emptySquares.indexOf(canvasNumber);
  emptySquares.splice(index, 1);
  squareContent[canvasNumber-1] = 'O';
  setTimeout(function(){
    checkForWinners(squareContent[canvasNumber-1]);
  },100);
}

function computerPlay(playNext) {
  theCanvas = "canvas"+playNext;
  c = document.getElementById(theCanvas);
  cxt = c.getContext("2d");
  if(playerSymbol == "X"){
    drawO(playNext);
  } else if (playerSymbol == "O"){
    drawX(playNext);
  }
  turn++;
  squaresTaken[playNext-1] = true;
  player1Played = false;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array[0];
}

function checkForWinners(symbol){
  squaresPlayed++;
  for(var i = 0; i < winningCombinations.length; i++){
    if(squareContent[winningCombinations[i][0]]==symbol&&squareContent[winningCombinations[i][1]]== symbol&&squareContent[winningCombinations[i][2]]==symbol){
      gameOver(symbol);
    }
  }
  checkForTie();
  nextTurn();
}

function checkForTie() {
  if(squaresPlayed==9){
    alert("It's a tie!");
    resetGame();
  }
}

function gameOver(symbol) {
  alert(symbol+ " WON!");
  resetGame();
}

function resetGame() {
  emptySquares = [1,2,3,4,5,6,7,8,9];
  player1Played = false;
  squaresPlayed = 0;
  turn = 0;
  squaresTaken = new Array();
  squareContent = new Array();
  winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var l = 0; l <= 8; l++){
    squaresTaken[l] = false;
    squareContent[l]='';
  }
   for(var i = 1; i <= 9; i++){
     c = document.getElementById("canvas"+i);
     cxt = c.getContext("2d");
     c.width = c.width;  //clearRect shifted contents oddly, using this instead to clear canvases
  }
}

