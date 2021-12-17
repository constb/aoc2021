let [x1, x2, y1, y2] = [96, 125, -144, -98];

function fly(dx, dy) {
  let [x, y] = [0, 0];
  let maxY = -Infinity;
  while (x <= x2 && y >= y1) {
    x += dx;
    y += dy;
    maxY = Math.max(maxY, y);
    dx -= Math.sign(dx);
    dy--;
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return maxY;
  }
}

let m = -Infinity;
let c = 0;
for (let vy = y1; vy < -y1; vy++) {
  for (let vx = x2; vx > 0; vx--) {
    let r = fly(vx, vy);
    if (r != null) {
      c++;
      m = Math.max(m, r);
    }
  }
}

console.log(m, c);
