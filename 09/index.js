let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);
let map = lines.map((line) => [...line].map(Number));

let height = map.length;
let width = map[0].length;

function adjacent(i, j) {
  let points = [];
  if (i > 0) points.push([i - 1, j]);
  if (j > 0) points.push([i, j - 1]);
  if (i < width - 1) points.push([i + 1, j]);
  if (j < height - 1) points.push([i, j + 1]);
  return points;
}

let count = 0;
for (let j = 0; j < height; j++)
  for (let i = 0; i < width; i++) if (adjacent(i, j).every(([a, b]) => map[b][a] > map[j][i])) count += map[j][i] + 1;

console.log(count);
