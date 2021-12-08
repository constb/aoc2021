let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

let count = 0;
for (const line of lines) {
  const digits = line.split("|")[1].trim().split(" ");
  count += digits.filter((d) => d.length !== 5 && d.length !== 6).length;
}

console.log(count);
