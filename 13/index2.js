let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let groups = data.split(/\n{2,}/);

let dots = groups[0].split(/\n/).map((l) => l.split(",").map((v) => +v));

for (const instruction of groups[1].split(/\n/)) {
  let axis = instruction[11] === "x" ? 0 : 1;
  let val = +instruction.substring(13);
  for (const dot of dots) if (dot[axis] >= val) dot[axis] = 2 * val - dot[axis];
}

let map = Array.from({ length: Math.max(...dots.map((d) => d[1])) + 1 }, () =>
  Array.from({ length: Math.max(...dots.map((d) => d[0])) + 1 }, () => " ")
);

for (const d of dots) map[d[1]][d[0]] = "█";
for (const line of map) console.log(line.join(""));
