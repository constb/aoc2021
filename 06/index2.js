let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let fishes = data.trim().split(",").map(Number);

const generations = Array.from({ length: 9 }, (v, i) => fishes.filter((n) => n === i).length);

function generate() {
  const zeroes = generations.shift();
  generations[6] += zeroes;
  generations.push(zeroes);
}

for (let i = 0; i < 256; i++) generate();

console.log(generations.reduce((acc, v) => acc + v, 0));
