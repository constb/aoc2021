let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let groups = data.split(/\n{2,}/);

let poly = groups[0];
let rules = {};

for (const r of groups[1].split(/\n/)) rules[r.substr(0, 2)] = r.substr(-1);

function mutate(src) {
  let next = src[0];
  for (let i = 1; i < src.length; i++) {
    let pair = src.substr(i - 1, 2);
    if (rules[pair] != null) next += rules[pair];
    next += src[i];
  }
  return next;
}

for (let i = 0; i < 10; i++) poly = mutate(poly);

const counts = {};
for (const c of poly) counts[c] = (counts[c] ?? 0) + 1;

let s = Object.values(counts).sort((a, b) => a - b);
console.log(s[s.length - 1] - s[0]);
