let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let bits = lines[0].length;
let input = lines.map((l) => parseInt(l, 2));

let gamma = 0;
for (let i = 0; i < bits; i++) {
  const mask = 1 << i;
  if (input.filter((n) => (n & mask) > 0).length > input.length / 2) gamma |= mask;
}

console.log(gamma * (gamma ^ ((1 << bits) - 1)));
