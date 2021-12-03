let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

let pos = 0;
let depth = 0;

for (const line of lines) {
  if (line.substr(0, 7) === "forward") pos += +line.substr(8);
  else if (line.substr(0, 2) === "up") depth -= +line.substr(3);
  else if (line.substr(0, 4) === "down") depth += +line.substr(5);

  if (depth < 0) depth = 0;
}

console.log({ pos, depth });
console.log(pos * depth);
