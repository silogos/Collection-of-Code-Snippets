function check(squareMap, playerTurn) {
  let crossPassLTR = false;
  let crossPassRTL = false;

  for (let i = 0; i < 3; i++) {
    let colPass = false;
    let rowPass = false;

    for (let j = 0; j < 3; j++) {
      if ((colPass === true || j === 0) && squareMap[i][j] === playerTurn) {
        colPass = true;
      } else {
        colPass = false;
      }

      if ((rowPass === true || j === 0) && squareMap[j][i] === playerTurn) {
        rowPass = true;
      } else {
        rowPass = false;
      }
    }

    if (colPass || rowPass) {
      return true;
    }

    if ((crossPassLTR || i === 0) && squareMap[i][i] === playerTurn) {
      crossPassLTR = true;
    } else {
      crossPassLTR = false;
    }

    const dataIdx = 1 - i + 1;
    if ((crossPassRTL || i === 0) && squareMap[i][dataIdx] === playerTurn) {
      crossPassRTL = true;
    } else {
      crossPassRTL = false;
    }
  }

  return crossPassLTR || crossPassRTL;
}

let squareMap = [
  ["x", "", "x"],
  ["", "", "x"],
  ["", "", "x"],
];
let playerTurn = "x";
console.log(check(squareMap, playerTurn));
