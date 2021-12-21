let test = false;
let p1 = test ? 4 : 4;
let p2 = test ? 8 : 5;

let counter = 1;
let s1 = 0;
let s2 = 0;

let rolls = 0;
while (true) {
  rolls += 3;
  let add1 = counter <= 98 ? counter * 3 + 3 : counter === 99 ? 200 : 103;
  p1 += add1;
  counter += 3;
  counter = ((counter - 1) % 100) + 1;
  p1 = ((p1 - 1) % 10) + 1;
  s1 += p1;
  if (s1 >= 1000) break;

  rolls += 3;
  let add2 = counter <= 98 ? counter * 3 + 3 : counter === 99 ? 200 : 103;
  p2 += add2;
  counter += 3;
  counter = ((counter - 1) % 100) + 1;
  p2 = ((p2 - 1) % 10) + 1;
  s2 += p2;
  if (s2 >= 1000) break;
}

// console.log({ rolls, s1, s2 });
console.log(rolls * Math.min(s1, s2));
