let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let pos = data.trim().split(",").map(Number);

function fuel(n) {
  return (n * (n + 1)) / 2;
}

function cost(p) {
  return pos.reduce((acc, n) => acc + fuel(Math.abs(n - p)), 0);
}

let r = Math.min(...pos) + 1;
let rf = cost(r);
while (true) {
  let next = cost(r + 1);
  if (next > rf) break;
  r++;
  rf = next;
}

console.log(rf);
