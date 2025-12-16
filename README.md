# Sudoku Solver in Node.js

A high-performance **Sudoku solver** implemented in **Node.js** using **row permutation generation** and **worker threads** for parallel computation. This project can efficiently solve Sudoku boards of standard 9x9 size.

## Features

- Solves standard 9x9 Sudoku puzzles.
- Uses **row permutations** to optimize candidate generation.
- Leverages **Node.js `worker_threads`** for parallel processing.
- Fast and efficient for solving multiple Sudoku boards.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/gitsangramdesai/sudokuInNode.git
cd sudokuInNode

Install dependencies:

npm install

(No external dependencies required if using plain Node.js.)

Usage

Open index.js and modify the board variable with your Sudoku puzzle. Empty cells should be represented with 0.

let board = [
  [7,0,2,0,5,0,6,0,0],
  [0,0,0,0,0,3,0,0,0],
  [1,0,0,0,0,9,5,0,0],
  [8,0,0,0,0,0,0,9,0],
  [0,4,3,0,0,0,7,5,0],
  [0,9,0,0,0,0,0,0,8],
  [0,0,9,7,0,0,0,0,5],
  [0,0,0,2,0,0,0,0,0],
  [0,0,7,0,4,0,2,0,3]
];


Run the solver:

node index.js


The solved Sudoku board will be printed along with the time taken to solve it.

How It Works

Row permutation generation: All possible permutations of rows are generated while respecting Sudoku rules.

Parallel computation: Each permutation is tested in parallel using Node.js worker threads, drastically reducing computation time.

Backtracking logic: Ensures that only valid Sudoku solutions are considered.

Example Output
Solved Board:
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───
│ 7 3 2 │ 1 5 8 │ 6 4 9
│ ...
Solved in 1.127s

Contributing

Contributions are welcome! You can:

Optimize the solver further.

Add a web interface or CLI input for Sudoku boards.

Extend support for larger boards or variants.

License

This project is licensed under the GNU General Public License (GPL). See the LICENSE
 file for details.
