let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let groups = data.split(/\n{2,}/);

let scanners = [];

for (const g of groups) {
  let lines = g.split(/\n/);
  let id = +lines.shift().match(/(\d+)/)[1];
  scanners[id] = lines.map((line) => line.split(",").map((v) => +v));
}

let fullMap = scanners.shift();
fullMap.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]));

const permCoord = permute([0, 1, 2]);
const multCoord = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [-1, 1, 1],
  [1, -1, -1],
  [-1, -1, 1],
  [-1, 1, -1],
  [-1, -1, -1],
];

let scannerPos = [[0, 0, 0]];

outer: while (scanners.length > 0) {
  for (let i = 0; i < scanners.length; i++) {
    const s = scanners[i];
    for (const perm of permCoord) {
      for (const mult of multCoord) {
        const rotated = s.map((c) => [c[perm[0]] * mult[0], c[perm[1]] * mult[1], c[perm[2]] * mult[2]]);
        rotated.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]));

        for (const fullMapPoint of fullMap) {
          for (const point of rotated) {
            let displacement = point.map((c, i) => fullMapPoint[i] - c);
            let pointsFound = [];
            let pointsNotFound = [];
            for (const check of rotated) {
              let fixed = check.map((v, i) => v + displacement[i]);
              let found = binarySearch(fullMap, fixed, (a, b) =>
                a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]
              );
              if (!found) {
                pointsNotFound.push(fixed);
              } else {
                pointsFound.push(fixed);
              }
              if (pointsNotFound.length > s.length - 12) break;
            }

            if (pointsNotFound.length <= s.length - 12) {
              console.log(`found (${scanners.length} left)`);
              fullMap.push(...pointsNotFound);
              fullMap.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]));
              scanners.splice(i, 1);
              scannerPos.push(displacement);
              continue outer;
            }
          }
        }
      }
    }
  }
  console.log("not found");
  process.exit(1);
}

let maxDist = 0;
for (let i = 0; i < scannerPos.length - 1; i++) {
  for (let j = i + 1; j < scannerPos.length; j++) {
    const dist =
      Math.abs(scannerPos[i][0] - scannerPos[j][0]) +
      Math.abs(scannerPos[i][1] - scannerPos[j][1]) +
      Math.abs(scannerPos[i][2] - scannerPos[j][2]);
    maxDist = Math.max(maxDist, dist);
  }
}
console.log(maxDist);

function permute(arr) {
  let length = arr.length,
    result = [arr.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = arr[i];
      arr[i] = arr[k];
      arr[k] = p;
      c[i]++;
      i = 1;
      result.push(arr.slice());
    } else {
      c[i] = 0;
      i++;
    }
  }
  return result;
}

function binarySearch(arr, val, cmpFn) {
  let m = 0;
  let n = arr.length - 1;
  while (m <= n) {
    let k = (n + m) >> 1;
    let cmp = cmpFn(val, arr[k]);
    if (cmp > 0) m = k + 1;
    else if (cmp < 0) n = k - 1;
    else return true;
  }
  return false;
}
