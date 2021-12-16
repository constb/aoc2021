let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();

let bits = [];
for (const c of data) {
  let v = parseInt(c, 16);
  bits.push((v & 8) >> 3, (v & 4) >> 2, (v & 2) >> 1, (v & 1) >> 0);
}

function readBits(o, n) {
  let res = 0;
  for (let i = 0; i < n; i++) {
    if (o.pos === o.bits.length) return false;
    res = (res << 1) | o.bits[o.pos++];
  }
  return res;
}

function readPacket(o, cb) {
  let version = readBits(o, 3);
  let type = readBits(o, 3);
  if (version === false || type === false) return false;

  if (type === 4) {
    while (true) {
      let chunk = readBits(o, 5);
      if ((chunk & 0x10) === 0) break;
    }
    cb(version);
  } else {
    let lt = readBits(o, 1);
    if (lt === 0) {
      cb(version);
      let length = readBits(o, 15);
      let sub = o.bits.slice(o.pos, o.pos + length);
      let state = { bits: sub, pos: 0 };
      while (readPacket(state, cb));
      o.pos += length;
    } else {
      cb(version);
      let packets = readBits(o, 11);
      for (let i = 0; i < packets; i++) readPacket(o, cb);
    }
  }

  return true;
}

let state = { bits, pos: 0 };
let sum = 0;
while (readPacket(state, (version) => (sum += version)));
console.log(sum);
