let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let fishes = data.trim().split(",").map(Number);

function nextDay() {
  let zeroes = fishes.filter((n) => n === 0).length;
  for (let i = 0; i < fishes.length; i++) {
    if (fishes[i] === 0) fishes[i] = 6;
    else fishes[i]--;
  }
  for (let i = 0; i < zeroes; i++) fishes.push(8);
}

for (let i = 0; i < 80; i++) nextDay();

console.log(fishes.length);
