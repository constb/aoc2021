let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let re = /^(\d+),(\d+) -> (\d+),(\d+)$/;

let grid = Array.from({ length: 1000 }, (line) => Array.from({ length: 1000 }, (v) => 0));

for (const line of lines) {
  let m = re.exec(line);
  let x1 = +m[1];
  let y1 = +m[2];
  let x2 = +m[3];
  let y2 = +m[4];
  if (x1 === x2) for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) grid[y][x1]++;
  else if (y1 === y2) for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) grid[y1][x]++;
  else if ((x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2))
    for (let x = Math.min(x1, x2), y = Math.min(y1, y2); x <= Math.max(x1, x2); x++, y++) grid[y][x]++;
  else for (let x = Math.min(x1, x2), y = Math.max(y1, y2); x <= Math.max(x1, x2); x++, y--) grid[y][x]++;
}
// console.log(grid.map((line) => line.map((v) => v || ".").join("")).join("\n"));

console.log(grid.reduce((acc, line) => acc + line.filter((v) => v > 1).length, 0));
