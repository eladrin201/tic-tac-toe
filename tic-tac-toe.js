const ConsoleUtils = require('./ConsoleUtils');
const myConsole = new ConsoleUtils();

const gameBoard = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];
const playerTable = {
  0: 'X',
  1: 'O'
}

let curPlayer = 0;
let turnCont = true;

function drawBoard() {
  let board = '\n    0   1   2 \n   --- --- ---\n';
  for (let i=0; i < gameBoard.length; i++) {
    board += i + ' | ' + gameBoard[i].join(' | ') + ' |\n';
    board += '   --- --- ---\n';
  }
  return board;
};
function checkWin() {
  let winner = false;
  for (let i=0; i < gameBoard.length; i ++) {
    if (gameBoard[i][i] !== ' ') {
      if ((gameBoard[i][0] === gameBoard[i][1]) && (gameBoard[i][0]=== gameBoard[i][2])) {
        winner = gameBoard[i][0];
        break;
      } else if ((gameBoard[0][i] === gameBoard[1][i]) && (gameBoard[0][i] === gameBoard[2][i])) {
        winner = gameBoard[0][i];
        break;
      } else if ((gameBoard[0][0] === gameBoard[1][1]) && (gameBoard[0][0] === gameBoard[2][2])) {
        winner = gameBoard[0][0];
        break;
      }
    }
  }

  return winner;
};
function playerMove(playerNum, move) {
  const regCap = /([0-2])/g;
  let capture = move.match(regCap);
  let row = move.match(regCap)[0];
  let col = move.match(regCap)[1];
  let win;

  // Checks to see if !0-2 was entered in each coordinate
   if (gameBoard[row][col] === ' ' && row && col) {
    gameBoard[row][col] = playerTable[playerNum];
    win = checkWin();
    if (!win) {
      if (curPlayer === 0) {
        curPlayer = 1;
      } else {
        curPlayer = 0;
      }
    } else {
      myConsole.clear();
      myConsole.printLine(drawBoard());
      myConsole.printLine('Game Over!\nCongrats to player ' + win);
      process.exit(0);
    }

  } else {
    myConsole.printLine('\nSpace Taken or Not enough characters. Pick again.');
    return doTurn();
  }
}
function getMove(cb) {
  myConsole.getLine('Player ' + playerTable[curPlayer] + ' Pick a space (row, column):', (move) => {
    playerMove(curPlayer, move);
    myConsole.printLine(drawBoard());
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
myConsole.printLine(drawBoard());

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
