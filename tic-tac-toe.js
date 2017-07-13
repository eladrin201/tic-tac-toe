const ConsoleUtils = require('./ConsoleUtils');
const myConsole = new ConsoleUtils();

const gameBoard = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];
const playerTable = {
  0: 'X',
  1: 'O'
}

let curPlayer = 0;
let turnCont = true;

function drawBoard(gameBoard) {
  let board = '\n    0   1   2 \n   --- --- ---\n';
  for (let i=0; i < gameBoard.length; i++) {
    board += i + ' | ' + gameBoard[i].join(' | ') + ' |\n';
    board += '   --- --- ---\n';
  }
  return board;
}
function playerMove(playerNum, move) {
  const regCap = /([0-2])/g;
  let capture = move.match(regCap);
  console.log(capture);
  let row = move.match(regCap)[0];
  let col = move.match(regCap)[1];

  // Checks to see if !0-2 was entered in each coordinate
   if (gameBoard[row][col] === ' ' && row && col) {
    gameBoard[row][col] = playerTable[playerNum];
    if (curPlayer === 0) {
      curPlayer = 1;
    } else {
      curPlayer = 0;
    }
  } else {
    myConsole.printLine('\nSpace Taken or Not enough characters. Pick again.');
    return doTurn();
  }
}
function getMove(cb) {
  myConsole.getLine('Player ' + playerTable[curPlayer] + ' Pick a space (row, column):', (move) => {
    playerMove(curPlayer, move);
    myConsole.printLine(drawBoard(gameBoard));
    return cb(!turnCheck());
  });
}
function turnCheck() {
  let moreMoves = true;

  for (let i=0; i < gameBoard.length; i++) {
    for (let j=0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === ' ') {
        moreMoves = false;
        break;
      }
    }
    if (!moreMoves) {
      break;
    }
  }
  return moreMoves;
}

myConsole.clear();
myConsole.printLine(drawBoard(gameBoard));

function doTurn() {
  getMove((cont)=>{
    if(cont) {
      return doTurn();
    } else {
      myConsole.printLine('Game Over!\nLooks like you got a Cat\'s Game =^.^=');
      process.exit(0);
    }
  });
};
doTurn();
