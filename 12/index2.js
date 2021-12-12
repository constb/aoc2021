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
  if (pos === "start" && current.length > 0) return;
  if (pos === "end") {
    found.push([...current, pos]);
    return;
  }
  const next = [...current, pos];

  const counts = {};
  for (const a of next) if (a.toLowerCase() === a) counts[a] = (counts[a] ?? 0) + 1;
  const hasLowDup = Object.values(counts).some((v) => v > 1);

  for (const dir of paths[pos])
    if (!hasLowDup || dir.toLowerCase() !== dir || current.indexOf(dir) === -1) pathFind(dir, next);
}

pathFind("start", []);

console.log(found.length);
