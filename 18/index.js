let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data
  .trim()
  .split(/\n/)
  .map((l) => JSON.parse(l));

function arrToTree(a) {
  if (typeof a === "number") return { t: "n", v: a };
  else return { t: "a", l: arrToTree(a[0]), r: arrToTree(a[1]) };
}

function treeToArr(t) {
  if (t.t === "n") return t.v;
  else return [treeToArr(t.l), treeToArr(t.r)];
}

function add(t1, t2) {
  return { t: "a", l: t1, r: t2 };
}

function explode(t, path = []) {
  if (path.length < 5) {
    if (t.t === "n") return;
    if (explode(t.l, [...path, t])) return true;
    return explode(t.r, [...path, t]);
  }

  const exploded = path.pop();
  const parent = path.pop();
  if (parent.l === exploded) {
    let f = parent.r;
    while (f.t !== "n") f = f.l;
    f.v += exploded.r.v;
    let prev = parent;
    for (const node of path.reverse()) {
      if (node.r === prev) {
        f = node.l;
        while (f.t !== "n") f = f.r;
        f.v += exploded.l.v;
        break;
      } else {
        prev = node;
      }
    }
    parent.l = { t: "n", v: 0 };
  } else {
    let f = parent.l;
    while (f.t !== "n") f = f.r;
    f.v += exploded.l.v;
    let prev = parent;
    for (const node of path.reverse()) {
      if (node.l === prev) {
        f = node.r;
        while (f.t !== "n") f = f.l;
        f.v += exploded.r.v;
        break;
      } else {
        prev = node;
      }
    }
    parent.r = { t: "n", v: 0 };
  }

  return true;
}

function split(t) {
  if (t.t === "n") {
    if (t.v >= 10) {
      t.t = "a";
      t.l = { t: "n", v: Math.floor(t.v / 2) };
      t.r = { t: "n", v: Math.ceil(t.v / 2) };
      delete t.v;
      return true;
    }
    return;
  }
  if (split(t.l)) return true;
  return split(t.r);
}

function magnitude(t) {
  if (t.t === "n") return t.v;
  else return 3 * magnitude(t.l) + 2 * magnitude(t.r);
}

function sum(t1, t2) {
  let s = add(t1, t2);
  while (explode(s) || split(s));
  return s;
}

let r;
for (const line of lines) r = r == null ? arrToTree(line) : sum(r, arrToTree(line));
console.log(magnitude(r));

let max = 0;
for (let i = 0; i < lines.length - 1; i++)
  for (let j = i + 1; j < lines.length; j++)
    max = Math.max(
      max,
      magnitude(sum(arrToTree(lines[i]), arrToTree(lines[j]))),
      magnitude(sum(arrToTree(lines[j]), arrToTree(lines[i])))
    );

console.log(max);
