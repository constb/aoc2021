let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();

let bits = data
  .split("")
  .map((d) => parseInt(d, 16).toString(2).padStart(4, "0"))
  .join("");

function readPacket(str) {
  let version = parseInt(str.substr(0, 3), 2);
  let type = parseInt(str.substr(3, 3), 2);

  let num = 0;
  let pos = 0;

  if (type === 4) {
    pos = 6;
    str = str.substr(6);
    let more = true;
    while (more) {
      more = str[0] === "1";
      num = num * 16 + parseInt(str.substr(1, 4), 2);
      pos += 5;
      str = str.substr(5);
    }
    return [num, version, pos];
  }

  let subValues = [];

  if (str[6] === "0") {
    let length = parseInt(str.substr(7, 15), 2);
    let sub = str.substr(22, length);
    while (sub.length > 0) {
      let res = readPacket(sub);
      subValues.push(res[0]);
      version += res[1];
      sub = sub.substr(res[2]);
    }
    pos += 22 + length;
  } else {
    let packets = parseInt(str.substr(7, 11), 2);
    pos = 18;
    let sub = str.substr(18);
    for (let i = 0; i < packets; i++) {
      let res = readPacket(str.substr(pos));
      subValues.push(res[0]);
      version += res[1];
      pos += res[2];
      sub = sub.substr(res[2]);
    }
  }

  if (type === 0) {
    num = subValues.reduce((a, v) => a + v, 0);
  } else if (type === 1) {
    num = subValues.reduce((a, v) => a * v, 1);
  } else if (type === 2) {
    num = Math.min(...subValues);
  } else if (type === 3) {
    num = Math.max(...subValues);
  } else if (type === 5) {
    num = subValues[0] > subValues[1] ? 1 : 0;
  } else if (type === 6) {
    num = subValues[0] < subValues[1] ? 1 : 0;
  } else if (type === 7) {
    num = subValues[0] === subValues[1] ? 1 : 0;
  }

  return [num, version, pos];
}

let [part2, part1] = readPacket(bits);
console.log(part1, part2);
