let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let map = lines.map((line) => [...line].map((v) => +v));

let height = map.length;
let width = map[0].length;

function adjacent(i, j) {
  let points = [];
  if (i > 0) {
    points.push([i - 1, j]);
    if (j > 0) points.push([i - 1, j - 1]);
    if (j < height - 1) points.push([i - 1, j + 1]);
  }
  if (i < width - 1) {
    points.push([i + 1, j]);
    if (j > 0) points.push([i + 1, j - 1]);
    if (j < height - 1) points.push([i + 1, j + 1]);
  }
  if (j > 0) points.push([i, j - 1]);
  if (j < height - 1) points.push([i, j + 1]);
  return points;
}

function step() {
  let next = [...map].map((line) => [...line].map((v) => v + 1));
  let flashed = new Set();
  let more;
  do {
    more = false;
    for (let j = 0; j < height; j++)
      for (let i = 0; i < width; i++)
        if (next[j][i] > 9) {
          flashed.add(`${i}x${j}`);
          next[j][i] = 0;
          adjacent(i, j).forEach(([a, b]) => {
            if (!flashed.has(`${a}x${b}`)) next[b][a]++;
          });
          more = true;
        }
  } while (more);

  return [next, flashed.size];
}

for (let i = 0; i < 10000; i++) {
  let [n, f] = step();
  if (f === 100) {
    console.log(i + 1);
    break;
  }
  map = n;
}
