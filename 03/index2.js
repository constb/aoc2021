let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let bits = lines[0].length;
let input = lines.map((l) => parseInt(l, 2));

let oxy = new Set(input),
  co2 = new Set(input);

for (let i = bits - 1; i >= 0; i--) {
  if (oxy.size === 1 && co2.size === 1) break;
  const mask = 1 << i;
  if (oxy.size > 1) {
    let n1 = new Set(),
      n2 = new Set();
    oxy.forEach((n) => ((n & mask) > 0 ? n1 : n2).add(n));
    if (n1.size >= n2.size) oxy = n1;
    else oxy = n2;
  }
  if (co2.size > 1) {
    let n1 = new Set(),
      n2 = new Set();
    co2.forEach((n) => ((n & mask) === 0 ? n1 : n2).add(n));
    if (n2.size >= n1.size) co2 = n1;
    else co2 = n2;
  }
}

console.log([...oxy][0] * [...co2][0]);
