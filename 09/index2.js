let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
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

function fillBasin(set, i, j) {
  if (set.has(`${i}x${j}`) || map[j][i] === 9) return;
  set.add(`${i}x${j}`);
  adjacent(i, j).forEach(([a, b]) => fillBasin(set, a, b));
  return set;
}

let basins = [];
for (let j = 0; j < height; j++)
  for (let i = 0; i < width; i++)
    if (adjacent(i, j).every(([a, b]) => map[b][a] > map[j][i])) basins.push(fillBasin(new Set(), i, j).size);

console.log(
  basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, v) => acc * v, 1)
);
