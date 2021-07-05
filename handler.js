exports.processCommands = (line) => {
  const inputArr = line.split(" ").map(ele => parseInt(ele));
  checkIfInputIsValid(inputArr);
  if (inputArr[0] !== "") {
    if (!noOfTestCases) {
      if(inputArr.length > 1) {
        console.error("You have entered multiple nos separated by spaces.Please enter no of test cases.");
      } else {
        noOfTestCases = parseInt(inputArr[0]);
        if (noOfTestCases <= 0) {
          console.error("No of test cases should be at least more than 1.");
        }
      }
    } else {
      if (!noOfRowsLeftToRead && inputArr.length === 2) {
        if (!testCasesInput[++currentlyReadingForTestCaseNo]) {
          const [noOfRows, noOfCols] = inputArr;
          testCasesInput[currentlyReadingForTestCaseNo] = {
            row: noOfRows,
            col: noOfCols,
            input: []
          }
          noOfRowsLeftToRead = noOfRows;
          // console.log(`Please input binary values separated by a single space for test case:${currentlyReadingForTestCaseNo} and for row: ${noOfRowsLeftToRead - noOfRows + 1}`)
        }
      } else {
        if (checkIfInputIsForRow(inputArr, testCasesInput[currentlyReadingForTestCaseNo].col)) {
          noOfRowsLeftToRead--;
          testCasesInput[currentlyReadingForTestCaseNo].input.push(inputArr);
        } else {
          console.error("Please enter only binary input and no of cols should be:", testCasesInput[currentlyReadingForTestCaseNo].col)
        }
      }
    }
  }
  if (currentlyReadingForTestCaseNo === noOfTestCases && noOfRowsLeftToRead == 0) {
    console.log("line is:", line);
    for (const key in testCasesInput) {
      if (Object.hasOwnProperty.call(testCasesInput, key)) {
        const curr = testCasesInput[key];
        for (let i = 0; i < curr.row; i++) {
          const result = [];
          for (let j = 0; j < curr.col; j++) {
           result.push(minDistance(curr.input, i, j));
          }
          res.push(result);
        }
      }
    }
    console.log("res is:", res);
    process.exit(0)
  }
}