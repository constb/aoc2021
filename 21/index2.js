let test = false;
let player1 = test ? 4 : 4;
let player2 = test ? 8 : 5;

let combinations = [
  [1, 1, 1],
  [1, 1, 2],
  [1, 1, 3],
  [1, 2, 1],
  [1, 2, 2],
  [1, 2, 3],
  [1, 3, 1],
  [1, 3, 2],
  [1, 3, 3],
  [2, 1, 1],
  [2, 1, 2],
  [2, 1, 3],
  [2, 2, 1],
  [2, 2, 2],
  [2, 2, 3],
  [2, 3, 1],
  [2, 3, 2],
  [2, 3, 3],
  [3, 1, 1],
  [3, 1, 2],
  [3, 1, 3],
  [3, 2, 1],
  [3, 2, 2],
  [3, 2, 3],
  [3, 3, 1],
  [3, 3, 2],
  [3, 3, 3],
];

let wins = new Map();

function count(p1, p2, s1, s2) {
  // always p1's turn, p2 just made theirs
  if (s2 >= 21) return [0, 1];

  const key = [p1, p2, s1, s2].join(",");
  const cached = wins.get(key); // very slow without cache
  if (cached != null) return cached;

  let res = [0, 0];
  for (const rolls of combinations) {
    let n1 = p1 + rolls[0] + rolls[1] + rolls[2];
    n1 = ((n1 - 1) % 10) + 1;
    let ns1 = s1 + n1;
    let w = count(p2, n1, s2, ns1);
    res[0] += w[1];
    res[1] += w[0];
  }

  wins.set(key, res); // memoize result
  return res;
}

const cnt = count(player1, player2, 0, 0);
// console.log(wins.size);
// console.log(cnt);
console.log(Math.max(...cnt));
