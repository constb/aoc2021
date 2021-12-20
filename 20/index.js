let test = 0;
let data = require("fs")
  .readFileSync(test ? "input.test.txt" : "input.txt", { encoding: "utf-8" })
  .trim();
let groups = data.split(/\n{2,}/);

let algo = groups[0].split("").map((v) => v === "#");

const lines = groups[1].split(/\n/);
const width = lines[0].length;
const height = lines.length;

let map = new Set();

for (const [i, line] of Object.entries(lines))
  for (const [j, char] of Object.entries(line.split(""))) if (char === "#") map.add(`${j},${i}`);

function neighbors(x, y, [minX, minY, maxX, maxY]) {
  let res = [];
  for (const dy of [-1, 0, 1]) {
    for (const dx of [-1, 0, 1]) {
      if (x + dx < minX || x + dx > maxX || y + dy < minY || y + dy > maxY) res.push("void");
      else res.push(`${x + dx},${y + dy}`);
    }
  }
  return res;
}

function pixel(x, y, [minX, minY, maxX, maxY], _void) {
  let bin = "";
  for (const key of neighbors(x, y, [minX, minY, maxX, maxY])) {
    bin += key === "void" ? _void : map.has(key) ? "1" : "0";
  }

  return algo[parseInt(bin, 2)];
}

// function dump(i) {
//   for (let y = 0 - i; y < height + i; y++) {
//     for (let x = 0 - i; x < width + i; x++) {
//       process.stdout.write(map.has(`${x},${y}`) ? "#" : ".");
//     }
//     process.stdout.write("\n");
//   }
//   process.stdout.write("\n");
// }

// dump(0);

for (let i = 0; i < 50; i++) {
  let next = new Set();

  for (let x = -1 - i; x < width + i + 1; x++)
    for (let y = -1 - i; y < height + i + 1; y++)
      if (pixel(x, y, [0 - i, 0 - i, width + i - 1, height + i - 1], algo[0] ? i % 2 : 0)) next.add(`${x},${y}`);

  map = next;
  // dump(i + 1);

  if (i === 1 || i === 49) console.log(map.size);
}
