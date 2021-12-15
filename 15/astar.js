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

  let openSet = new Set(["[0,0]"]);
  let queueHead = { v: ["[0,0]", width - 1 + height - 1] };
  let costs = { ["[0,0]"]: 0 };

  while (true) {
    let key, x, y;
    let minWeight = queueHead.v[1];
    key = queueHead.v[0];

    [x, y] = JSON.parse(key);
    openSet.delete(key);
    let cost = costs[key];

    if (x === width - 1 && y === height - 1) return cost;

    for (const [dx, dy] of steps) {
      const xx = x + dx;
      const yy = y + dy;
      if (xx < 0 || xx >= width || yy < 0 || yy >= height) continue;
      let newKey = JSON.stringify([xx, yy]);
      let newCost = cost + map[yy][xx];
      if (!costs[newKey] || costs[newKey] > newCost) {
        let weightChange = openSet.has(newKey);
        if (!weightChange) openSet.add(newKey);
        costs[newKey] = newCost;
        const newWeight = newCost + (width - xx - 1) + (height - yy - 1);
        // const newWeight = newCost + Math.sqrt((width - xx - 1) ** 2 + (height - yy - 1) ** 2);
        let p = queueHead;
        while (p.n != null && p.n.v[1] < newWeight) p = p.n;
        p.n = { v: [newKey, newWeight], n: p.n };
        if (weightChange) {
          p = p.n;
          while (p.n != null && p.n.v[0] !== newKey) p = p.n;
          if (p.n) p.n = p.n.n;
        }
      }
    }
    queueHead = queueHead.n;
  }
}

console.log(search(src));
console.log(search(map));
