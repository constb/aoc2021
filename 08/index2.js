let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

let count = 0;
for (const line of lines) {
  const digits = line.split("|")[1].trim().split(" ");

  const encoded = line.split("|")[0].trim().split(" ");

  // identify some digits
  const one = encoded.find((v) => v.length === 2).split("");
  const seven = encoded.find((v) => v.length === 3).split("");
  const eight = encoded.find((v) => v.length === 7).split("");
  const four = encoded.find((v) => v.length === 4).split("");

  // find top bar
  const dTop = seven.find((c) => !one.includes(c));

  // find middle and upper left
  const dMidPossible = four.filter((c) => !one.includes(c));
  const dMidCounts = dMidPossible.map((d) =>
    encoded.filter((v) => v.length === 5).reduce((acc, e) => acc + e.split("").includes(d), 0)
  );
  const dMid = dMidCounts[0] === 3 ? dMidPossible[0] : dMidPossible[1];
  const dUpperLeft = dMidCounts[0] === 3 ? dMidPossible[1] : dMidPossible[0];

  // find upper and bottom right
  const dUpperRightPossible = [...one];
  const dUpperRightCounts = dUpperRightPossible.map((d) =>
    encoded.filter((v) => v.length === 6).reduce((acc, e) => acc + e.split("").includes(d), 0)
  );
  const dUpperRight = dUpperRightCounts[0] === 2 ? dUpperRightPossible[0] : dUpperRightPossible[1];
  const dBottomRight = one[0] === dUpperRight ? one[1] : one[0];

  // find bottom left and bottom
  const dBottomPossible = encoded
    .find((v) => v.length === 7)
    .split("")
    .filter((c) => ![dTop, dMid, dUpperLeft, dUpperRight, dBottomRight].includes(c));
  const dBottomCounts = dBottomPossible.map((d) =>
    encoded.filter((v) => v.length === 5).reduce((acc, e) => acc + e.split("").includes(d), 0)
  );
  const dBottom = dBottomCounts[0] === 3 ? dBottomPossible[0] : dBottomPossible[1];
  const dBottomLeft = dBottomCounts[0] === 3 ? dBottomPossible[1] : dBottomPossible[0];

  // normalize digits representation by sorting them
  const map = [
    [dTop, dUpperLeft, dUpperRight, dBottomLeft, dBottomRight, dBottom].sort().join(""),
    one.sort().join(""),
    [dTop, dUpperRight, dMid, dBottomLeft, dBottom].sort().join(""),
    [dTop, dUpperRight, dMid, dBottomRight, dBottom].sort().join(""),
    four.sort().join(""),
    [dTop, dUpperLeft, dMid, dBottomRight, dBottom].sort().join(""),
    [dTop, dUpperLeft, dMid, dBottomLeft, dBottomRight, dBottom].sort().join(""),
    seven.sort().join(""),
    eight.sort().join(""),
    [dTop, dUpperLeft, dUpperRight, dMid, dBottomRight, dBottom].sort().join(""),
  ];

  // map encoded to digits via normalized form
  const decoded = digits.map((s) => map.findIndex((d) => d === s.split("").sort().join(""))).join("");

  count += +decoded;
}

console.log(count);
