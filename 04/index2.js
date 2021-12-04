let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let groups = data.trim().split(/\n{2,}/);

let numbers = groups[0].split(",").map(Number);

let boards = [];
for (let i = 1; i < groups.length; i++) {
  boards.push(groups[i].split(/\n/).map((line) => line.trim().split(/\s+/).map(Number)));
}

function transpose(board) {
  return Array.from({ length: board[0].length }, (v, k) => board.map((line) => line[k]));
}

function winningPos(board) {
  let pos = numbers.length;
  for (const line of board) {
    const s = new Set(line);
    for (let ni = 0; ni < numbers.length; ni++) {
      const n = numbers[ni];
      s.delete(n);
      if (s.size === 0) {
        if (ni < pos) {
          pos = ni;
        }
        break;
      }
    }
  }
  return pos;
}

const winnerAt = Math.max(...boards.map((b) => Math.min(winningPos(b), winningPos(transpose(b)))));
const winnerBoard = boards.find((b) => winningPos(b) === winnerAt || winningPos(transpose(b)) === winnerAt);
const winnerNum = numbers[winnerAt];

const winnerMarked = numbers.slice(0, winnerAt + 1);
const winnerSum = winnerBoard.flat().reduce((acc, v) => acc + (winnerMarked.includes(v) ? 0 : v), 0);

console.log(winnerNum * winnerSum);
