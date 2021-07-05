const readline = require('readline');
const { canVisitThePoint, checkIfBitmapIsValid, checkIfInputIsForRow, checkIfInputIsValid } = require("./helpers");

const rl = readline.createInterface({
  input: process.stdin
});
rl.on('line', (line) => {
  processCommands(line)
}).on('close', () => {
  process.exit(0)
})
let noOfTestCases = 0;
let currentlyReadingForTestCaseNo = 0;
let noOfRowsLeftToRead = 0;
const testCasesInput = {};

const processCommands = (line) => {
  let inputArr = line.split(" ");
  checkIfInputIsValid(inputArr);
  if (inputArr[0] !== "") {
    if (!noOfTestCases) {
      if(inputArr.length > 1) {
        console.error("You have entered multiple nos separated by spaces.Please enter no of test cases.");
      } else {
        noOfTestCases = parseInt(inputArr[0]);
        if (noOfTestCases <= 0 || noOfTestCases > 1000) {
          console.error("No of test cases should be at least more than 1 and less than 1000.");
          throw new Error("No of test cases should be in boundary limit");
        }
      }
    } else {
      if (!noOfRowsLeftToRead) {
        if (!testCasesInput[++currentlyReadingForTestCaseNo]) {
          inputArr = inputArr.map(ele => parseInt(ele))
          const [noOfRows, noOfCols] = inputArr;
          if (noOfRows < 1 || noOfRows > 182 || noOfCols <1 || noOfCols > 182) {
            console.error("No of Rows cols can not be less than one and greater than 182.");
            throw new Error("No of Rows cols should be in boundary limit");
          }
          testCasesInput[currentlyReadingForTestCaseNo] = {
            row: noOfRows,
            col: noOfCols,
            input: [],
            res: []
          }
          noOfRowsLeftToRead = noOfRows;
          // console.log(`Please input binary values separated by a single space for test case:${currentlyReadingForTestCaseNo} and for row: ${noOfRowsLeftToRead - noOfRows + 1}`)
        }
      } else {
        if (checkIfInputIsForRow(inputArr, testCasesInput[currentlyReadingForTestCaseNo].col)) {
          inputArr = inputArr[0].split("").map(ele => parseInt(ele))
          noOfRowsLeftToRead--;
          testCasesInput[currentlyReadingForTestCaseNo].input.push(inputArr);
        } else {
          console.error("Please enter only binary input and no of cols should be:", testCasesInput[currentlyReadingForTestCaseNo].col)
        }
      }
    }
  }
  // console.log("currentlyReadingForTestCaseNo:", currentlyReadingForTestCaseNo, " noOfTestCases:", noOfTestCases, "noOfRowsLeftToRead", noOfRowsLeftToRead);
  if (currentlyReadingForTestCaseNo === noOfTestCases && noOfRowsLeftToRead == 0) {
    let result = '\n';
    for (const key in testCasesInput) {
      if (Object.hasOwnProperty.call(testCasesInput, key)) {
        const curr = testCasesInput[key];
        for (let i = 0; i < curr.row; i++) {
          // const result = [];
          for (let j = 0; j < curr.col; j++) {
          //  result.push(minDistance(curr.input, i, j));
           result = result + minDistance(curr.input, i, j) + " ";
          }
          result = result + "\t" + "\n";
          // res.push(result);
        }
        result = result + "\n"
      }
    }
    console.log(result);
    process.exit(0)
  }
}

class Node {
  constructor(row, col, dist = 0) {
    this.row = row;
    this.col = col;
    this.dist = dist;
  }
}

const minDistance = (bitmap, startRow, startCol) => {
  if (!checkIfBitmapIsValid(bitmap)) {
    console.error("Bitmap image should have at least one 1");
    process.exit(0)
  }
  const queue = [];
  const visited = new Array(bitmap.length);
  for (let i=0; i<visited.length; i++) {
    visited[i] = new Array(bitmap[0].length).fill(false); // Creating an array of size 4 and filled of 1
  }
  queue.push(new Node(startRow, startCol));
  visited[startRow][startCol] = true;
  while(queue.length) {
    const curr = queue.shift();
    if (bitmap[curr.row][curr.col] == 1) {
      return curr.dist;
    }
    // moving up
    if (canVisitThePoint(curr.row-1, curr.col, bitmap, visited)) {
      queue.push(new Node(curr.row - 1, curr.col, curr.dist + 1))
      visited[curr.row - 1][curr.col] = true;
    }
    // moving down
    if (canVisitThePoint(curr.row + 1, curr.col, bitmap, visited)) {
      queue.push(new Node(curr.row + 1, curr.col, curr.dist + 1))
      visited[curr.row + 1][curr.col] = true;
    }
    // moving left
    if (canVisitThePoint(curr.row, curr.col - 1, bitmap, visited)) {
      queue.push(new Node(curr.row, curr.col - 1, curr.dist + 1))
      visited[curr.row][curr.col - 1] = true;
    }

    // moving right
    if (canVisitThePoint(curr.row, curr.col + 1, bitmap, visited)) {
      queue.push(new Node(curr.row, curr.col + 1, curr.dist + 1))
      visited[curr.row][curr.col + 1] = true;
    }
  }
}