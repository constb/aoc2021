let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let groups = data.substring(5).split(/inp w/);

let ops = groups.map((g) => {
  let lines = g.trim().split("\n");
  const pop = lines[3].split(" ")[2] === "26";
  const val = Number(pop ? lines[4].split(" ")[2] : lines[14].split(" ")[2]);
  return [pop, val];
});

let stack = [];
let part1 = Array.from({ length: ops.length });
let part2 = Array.from({ length: ops.length });

for (const [i, op] of Object.entries(ops)) {
  if (op[0]) {
    let m = stack.pop();
    let diff = op[1] + m[1];
    part1[i] = diff > 0 ? 9 : 9 + diff;
    part1[m[0]] = diff <= 0 ? 9 : 9 - diff;
    part2[i] = diff > 0 ? 1 + diff : 1;
    part2[m[0]] = diff <= 0 ? 1 - diff : 1;
  } else {
    stack.push([i, op[1]]);
  }
}

console.log(part1.join(""));
console.log(part2.join(""));
