let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);

let re = /^(on|off) x=([0-9-]+)..([0-9-]+),y=([0-9-]+)..([0-9-]+),z=([0-9-]+)..([0-9-]+)$/;

let src = lines.map((line) => {
  let m = re.exec(line);
  return { s: m[1] === "on", x: [+m[2], +m[3]], y: [+m[4], +m[5]], z: [+m[6], +m[7]] };
});

let part1 = src.filter((t) => [...t.x, ...t.y, ...t.z].every((c) => c >= -50 && c <= 50));

console.log(compute(part1));
console.log(compute(src));

function compute(transitions) {
  let on = [];

  for (const t of transitions) {
    let next = [];
    let dropT = false;
    for (const cube of on) {
      if (dropT) {
        next.push(cube);
      } else if (embedded(cube, t)) {
        // drop cube
      } else if (embedded(t, cube)) {
        // t is covered by cube
        if (t.s) next.push(cube);
        else for (const c of diff(cube, t)) next.push(c);
        dropT = true;
      } else if (intersect(t, cube)) {
        // cut t from cube
        for (const c of diff(cube, t)) next.push(c);
      } else {
        next.push(cube);
      }
    }
    if (t.s && !dropT) next.push(t);
    on = next;
  }

  return on.reduce((acc, c) => (acc += (c.x[1] - c.x[0] + 1) * (c.y[1] - c.y[0] + 1) * (c.z[1] - c.z[0] + 1)), 0);
}

function intersect(t1, t2) {
  if (t1.x[1] < t2.x[0]) return false;
  if (t1.x[0] > t2.x[1]) return false;
  if (t1.y[1] < t2.y[0]) return false;
  if (t1.y[0] > t2.y[1]) return false;
  if (t1.z[1] < t2.z[0]) return false;
  if (t1.z[0] > t2.z[1]) return false;
  return true;
}

function embedded(t1, t2) {
  // if t1 is inside t2 entirely
  if (
    t1.x[0] >= t2.x[0] &&
    t1.x[1] <= t2.x[1] &&
    t1.y[0] >= t2.y[0] &&
    t1.y[1] <= t2.y[1] &&
    t1.z[0] >= t2.z[0] &&
    t1.z[1] <= t2.z[1]
  )
    return true;

  return false;
}

function diff(a, b) {
  // only parts of a that aren't inside b
  let res = [];
  let p = [intervals(a.x, b.x), intervals(a.y, b.y), intervals(a.z, b.z)];
  for (const x of p[0])
    for (const y of p[1])
      for (const z of p[2]) {
        let c = { x, y, z };
        if (embedded(c, a) && !embedded(c, b)) res.push(c);
      }
  return res;
}

function intervals(v1, v2) {
  // non-intersecting parts of v1 and v2, must convert to [start, end) first, end is exclusive
  const values = [v1[0], v1[1] + 1, v2[0], v2[1] + 1];
  const v = [...new Set(values)].sort((a, b) => a - b);
  const res = [];
  if (v.length === 1) return [[v[0], v[0]]];
  let prev = v[0];
  for (let i = 1; i < v.length; i++) {
    res.push([prev, v[i] - 1]); // result ranges are inclusive again
    prev = v[i];
  }
  return res;
}

function dump(t) {
  return `${t.s ? "on" : "off"} x=${t.x[0]}..${t.x[1]},y=${t.y[0]}..${t.y[1]},z=${t.z[0]}..${t.z[1]}`;
}
