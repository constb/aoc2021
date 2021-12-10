let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);

const openers = "([{<";
const closers = ")]}>";
const cScores = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
let corrupted = 0;
for (const line of lines) {
  let stack = [];
  for (const char of line) {
    const op = openers.indexOf(char);
    if (op !== -1) stack.push(closers[op]);
    else {
      if (stack.pop() !== char) {
        corrupted += cScores[char];
        break;
      }
    }
  }
}

console.log(corrupted);
