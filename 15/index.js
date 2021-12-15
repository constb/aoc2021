let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);

let map = lines.map((line) => [...line].map((v) => +v));

let risk = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => 0));

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (x === 0 && y === 0) risk[y][x] = 0;
    else {
      let risks = [];
      if (x > 0) risks.push(risk[y][x - 1]);
      if (y > 0) risks.push(risk[y - 1][x]);
      risk[y][x] = Math.min(...risks) + map[y][x];
    }
  }
}

console.log(risk[risk.length - 1][risk[0].length - 1]);
