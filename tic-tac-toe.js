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
  let moveCoordinates = move.split(',');
  for (let i=0; i < moveCoordinates.length; i++) {
    moveCoordinates[i] = moveCoordinates[i].trim();
  }

  if (gameBoard[moveCoordinates[0]][moveCoordinates[1]] === ' ') {
    gameBoard[moveCoordinates[0]][moveCoordinates[1]] = playerTable[playerNum];
    if (curPlayer === 0) {
      curPlayer = 1;
    } else {
      curPlayer = 0;
    }
  } else {
    myConsole.printLine('Space Taken. Pick again.\n');
    doTurn();
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
