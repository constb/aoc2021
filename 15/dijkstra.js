let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let src = lines.map((line) => [...line].map((v) => +v));

let map = Array.from({ length: src.length * 5 }, () => Array.from({ length: src[0].length * 5 }, () => 0));

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    map[y][x] =
      ((src[y % src.length][x % src[0].length] + Math.floor(y / src.length) + Math.floor(x / src[0].length) - 1) % 9) +
      1;
  }
}

const steps = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function search(map) {
  const height = map.length;
  const width = map[0].length;

  let queueHead = { v: [0, 0, 0] };
  let costs = {};

  while (true) {
    let [cost, x, y] = queueHead.v;
    if (x === width - 1 && y === height - 1) return cost;

    for (const [dx, dy] of steps) {
      const xx = x + dx;
      const yy = y + dy;
      if (xx < 0 || xx >= width || yy < 0 || yy >= height) continue;
      let newCost = cost + map[yy][xx];
      let key = `${xx}:${yy}`;
      if (!(key in costs) || costs[key] > newCost) {
        costs[key] = newCost;
        let p = queueHead;
        while (p.n != null && p.n.v[0] < newCost) p = p.n;
        p.n = { v: [newCost, xx, yy], n: p.n };
      }
    }

    if (!queueHead.n) {
      console.error("not found");
      process.exit(1);
    }
    queueHead = queueHead.n;
  }
}

console.log(search(src));
console.log(search(map));
