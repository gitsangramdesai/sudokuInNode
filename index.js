// =======================
// PARALLEL SUDOKU SOLVER USING ROW PERMUTATION GENERATOR + WORKERS
// =======================

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const os = require("os");

const GRID_SIZE = 9;
const oneToNine = [1,2,3,4,5,6,7,8,9];

let board1 = [
  [7, 0, 2, 0, 5, 0, 6, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 0],
  [1, 0, 0, 0, 0, 9, 5, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 4, 3, 0, 0, 0, 7, 5, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 9, 7, 0, 0, 0, 0, 5],
  [0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 4, 0, 2, 0, 3]
];

let board2 = [
  [0, 6, 0, 1, 0, 4, 0, 5, 0],
  [0, 0, 8, 3, 0, 5, 6, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 1],
  [8, 0, 0, 4, 0, 7, 0, 0, 6],
  [0, 0, 6, 0, 0, 0, 3, 0, 0],
  [7, 0, 0, 9, 0, 1, 0, 0, 4],
  [5, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 7, 2, 0, 6, 9, 0, 0],
  [0, 4, 0, 5, 0, 8, 0, 7, 0]
];

let board3 = [
  [0, 0, 0, 6, 0, 0, 4, 0, 0],
  [7, 0, 0, 0, 0, 3, 6, 0, 0],
  [0, 0, 0, 0, 9, 1, 0, 8, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 5, 0, 1, 8, 0, 0, 0, 3],
  [0, 0, 0, 3, 0, 6, 0, 4, 5],
  [0, 4, 0, 2, 0, 0, 0, 6, 0],
  [9, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 1, 0, 0]
];

let board4 = [
  [0, 0, 0, 0, 0, 6, 0, 8, 0],
  [0, 0, 0, 0, 7, 0, 0, 0, 9],
  [9, 0, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 0, 0, 2, 0, 0],
  [0, 8, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 3, 0, 0, 0, 7, 0, 0],
  [0, 0, 0, 0, 0, 5, 0, 0, 8],
  [1, 0, 0, 0, 9, 0, 0, 0, 0],
  [0, 4, 0, 8, 0, 0, 0, 0, 0]
];


let board5 = [
  [2, 0, 0, 0, 8, 0, 3, 0, 0],
  [0, 6, 0, 0, 7, 0, 0, 8, 4],
  [0, 3, 0, 5, 0, 0, 2, 0, 9],
  [0, 0, 0, 1, 0, 5, 0, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 0, 7],
  [0, 0, 0, 6, 0, 2, 0, 0, 0],
  [4, 0, 2, 0, 0, 7, 0, 6, 0],
  [6, 8, 0, 0, 2, 0, 0, 7, 0],
  [0, 0, 5, 0, 1, 0, 0, 0, 3]
];

let board6 = [
  [0, 0, 4, 0, 0, 0, 8, 0, 5],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 3, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [9, 0, 0, 0, 6, 0, 0, 0, 4],
  [0, 8, 0, 0, 0, 0, 0, 0, 0],
  [1, 7, 0, 0, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 0],
  [5, 0, 0, 0, 0, 0, 4, 0, 0]
];

let board7 = [
  [0, 2, 0, 6, 0, 8, 0, 0, 0],
  [5, 8, 0, 0, 0, 9, 7, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [3, 7, 0, 0, 0, 0, 5, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 8, 0, 0, 0, 0, 1, 3],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 9, 8, 0, 0, 0, 3, 6],
  [0, 0, 0, 3, 0, 6, 0, 9, 0]
];

let board8 = [
  [0, 0, 0, 0, 0, 0, 0, 1, 2],
  [0, 0, 6, 0, 0, 0, 0, 0, 0],
  [0, 9, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 4, 0, 0],
  [0, 7, 0, 0, 0, 0, 0, 6, 0],
  [0, 0, 3, 0, 0, 8, 0, 0, 0],
  [0, 0, 0, 8, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 7, 0, 0],
  [6, 4, 0, 0, 0, 0, 0, 0, 0]  [7, 0, 2, 0, 5, 0, 6, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 0],
  [1, 0, 0, 0, 0, 9, 5, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 4, 3, 0, 0, 0, 7, 5, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 9, 7, 0, 0, 0, 0, 5],
  [0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 4, 0, 2, 0, 3]
];


let board9 = [
  [0, 0, 5, 0, 0, 0, 0, 7, 0],
  [0, 7, 0, 0, 1, 0, 0, 0, 9],
  [0, 0, 0, 6, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 9, 0, 0, 1, 0, 0, 0],
  [8, 0, 0, 0, 6, 0, 0, 4, 0],
  [0, 1, 0, 0, 0, 0, 7, 0, 0]
];

//hard
let board10 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 8, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 5]
];

let board11 = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 3, 5, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0]
];

let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 5, 0, 0, 0, 0, 0, 6, 0],
  [0, 0, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 8, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 9, 0, 0]
];


let board13 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [0, 0, 5, 0, 0, 0, 6, 0, 0],
  [0, 0, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 8, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 0]
];

let board14 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 5, 0],
  [0, 0, 0, 0, 0, 6, 0, 0, 0],
  [0, 0, 0, 0, 7, 0, 0, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 9]
];

// -----------------------
// HELPERS
// -----------------------
function getColumn(board, col) {
  return board.map(row => row[col]);
}

function getBox(board, row, col) {
  const br = row - (row % 3);
  const bc = col - (col % 3);
  const box = [];
  for (let r = br; r < br + 3; r++) {
    for (let c = bc; c < bc + 3; c++) {
      box.push(board[r][c]);
    }
  }
  return box;
}

function isValidPartial(arr) {
  const seen = new Set();
  for (const n of arr) {
    if (n === 0) continue;
    if (seen.has(n)) return false;
    seen.add(n);
  }
  return true;
}

function analyzeRow(row) {
  const zeroIndexes = [];
  const existing = new Set();
  row.forEach((v,i)=>{
    if(v===0) zeroIndexes.push(i);
    else existing.add(v);
  });
  const missing = oneToNine.filter(n=>!existing.has(n));
  return { zeroIndexes, missing };
}

function* permute(arr, path = [], used = []) {
  if(path.length === arr.length) { yield [...path]; return; }
  for(let i=0;i<arr.length;i++){
    if(used[i]) continue;
    used[i] = true;
    path.push(arr[i]);
    yield* permute(arr, path, used);
    path.pop();
    used[i] = false;
  }
}

function* rowCandidateGenerator(row) {
  const { zeroIndexes, missing } = analyzeRow(row);
  if(missing.length===0) { yield row.slice(); return; }
  for(const perm of permute(missing)){
    const newRow = row.slice();
    perm.forEach((val,i)=>newRow[zeroIndexes[i]]=val);
    yield newRow;
  }
}

// -----------------------
// BACKTRACK USING ROW PERM GENERATOR
// -----------------------
function solveUsingRowPermGen(board) {
  function backtrack(rowIndex){
    if(rowIndex===9) return true;

    for(const candidateRow of rowCandidateGenerator(board[rowIndex])){
      board[rowIndex] = candidateRow;

      let valid = true;
      for(let c=0;c<9&&valid;c++){
        if(!isValidPartial(getColumn(board,c))) valid=false;
      }
      for(let r=0;r<=rowIndex&&valid;r++){
        for(let c=0;c<9&&valid;c++){
          if(!isValidPartial(getBox(board,r,c))) valid=false;
        }
      }

      if(!valid){ board[rowIndex]=Array(9).fill(0); continue; }

      if(backtrack(rowIndex+1)) return true;
      board[rowIndex]=Array(9).fill(0);
    }
    return false;
  }

  return backtrack(0) ? board : null;
}

// -----------------------
// MULTI-THREADING SETUP
// -----------------------
if(isMainThread){
  console.time("SudokuSolver");

  const numCPUs = os.cpus().length;
  const firstRowCandidates = [...rowCandidateGenerator(board[0])];
  const chunkSize = Math.ceil(firstRowCandidates.length/numCPUs);

  let solved = null;
  let completedWorkers = 0;

  for(let i=0;i<numCPUs;i++){
    const chunk = firstRowCandidates.slice(i*chunkSize, (i+1)*chunkSize);
    const worker = new Worker(__filename,{workerData:{board, firstRowChunk:chunk}});

    worker.on("message", msg=>{
      if(msg.solved && !solved){
        solved = msg.board;
        console.timeEnd("SudokuSolver");
        console.log("Solved Board:");
        console.table(solved);
        process.exit(0);
      }
    });

    worker.on("exit", ()=>{completedWorkers++; if(completedWorkers===numCPUs && !solved){
      console.log("No solution found");
      console.timeEnd("SudokuSolver");
    }});
  }

}else{
  const boardCopy = JSON.parse(JSON.stringify(workerData.board));
  const chunk = workerData.firstRowChunk;

  for(const firstRow of chunk){
    boardCopy[0] = firstRow;
    const solved = solveUsingRowPermGen(boardCopy.map(r=>r.slice()));
    if(solved){
      parentPort.postMessage({solved:true, board:solved});
      break;
    }
  }
}
