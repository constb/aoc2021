let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);

const openers = "([{<";
const closers = ")]}>";
const iScores = { ")": 1, "]": 2, "}": 3, ">": 4 };
let incomplete = [];
for (const line of lines) {
  let stack = [];
  let corrupted = false;
  for (const char of line) {
    const op = openers.indexOf(char);
    if (op !== -1) stack.push(closers[op]);
    else if (stack.pop() !== char) {
      corrupted = true;
      break;
    }
  }
  if (!corrupted && stack.length > 0) {
    let i = 0;
    for (const c of stack.reverse()) i = i * 5 + iScores[c];
    incomplete.push(i);
  }
}

console.log(incomplete.sort((a, b) => a - b)[Math.floor(incomplete.length / 2)]);
