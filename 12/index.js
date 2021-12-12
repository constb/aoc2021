let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);

const paths = {};

for (const line of lines) {
  const [b, e] = line.split("-");
  paths[b] = [...(paths[b] ?? []), e];
  paths[e] = [...(paths[e] ?? []), b];
}

const found = [];

function pathFind(pos, current) {
  if (pos === "end") {
    found.push([...current, pos]);
    return;
  }
  const next = [...current, pos];
  for (const dir of paths[pos]) if (dir.toLowerCase() !== dir || current.indexOf(dir) === -1) pathFind(dir, next);
}

pathFind("start", []);

console.log(found.length);
