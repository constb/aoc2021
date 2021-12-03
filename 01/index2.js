let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/).map(Number);

let count = 0;
for (let i = 3; i < lines.length; i++) {
  if (lines[i] + lines[i - 1] + lines[i - 2] > lines[i - 1] + lines[i - 2] + lines[i - 3]) count++;
}

console.log(count);
