exports.checkIfBitmapIsValid = (bitmap) => {
  let shouldHaveAtleast1 = false;
  for (let i = 0; i < bitmap.length; i++) {
    for (let j = 0; j < bitmap[0].length; j++) {
      const element = bitmap[i][j];
      if (element === 1) {
        shouldHaveAtleast1 = true;
      }
    }
  }
  return shouldHaveAtleast1;
}

exports.canVisitThePoint = (i, j, bitmap, visited) => {
  if (i >= 0 && j >= 0 && i < bitmap.length
    && j < bitmap[0].length
    && visited[i][j] == false) {
  return true;
}
return false;
}
exports.checkIfInputIsForRow = (inputArr, noOfCols) => {
  const input = inputArr[0].split("");
  if (input.length !== noOfCols) {
    return false;
  }
  for (let i = 0; i < input.length; i++) {
    const element = parseInt(input[i]);
    if (element < 0 || element > 1) {
      return false
    }
  }
  return true;
}

exports.checkIfInputIsValid = (inputArr) => {
  for (let i = 0; i < inputArr.length; i++) {
    const element = inputArr[i];
    if (element < 0) {
      console.error("Negative no input is not required for this program. Please start over again.")
      process.exit(0);
    }
  }
}