let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let map = lines.map((line) => [...line]);

let width = map[0].length;
let height = map.length;

function step(src) {
  let next = src.map((line) => [...line]);
  let moves = 0;
  // east
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (next[y][x] !== ">") continue;
      let nx = (x + 1) % width;
      if (src[y][nx] === ".") {
        next[y][x] = ".";
        next[y][nx] = ">";
        x++;
        moves++;
      } else next[y][x] = ">";
    }
  }
  src = next;
  next = src.map((line) => [...line]);
  // south
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (next[y][x] !== "v") continue;
      let ny = (y + 1) % height;
      if (src[ny][x] === ".") {
        next[y][x] = ".";
        next[ny][x] = "v";
        y++;
        moves++;
      } else next[y][x] = "v";
    }
  }
  return [next, moves];
}

let s = 0;
let m;
while (true) {
  [map, m] = step(map);
  s++;
  if (m === 0) return console.log(s);
}
