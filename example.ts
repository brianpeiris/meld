export function setup() {
}

let x = 0;
export function draw() {
  translate(x, 0, 0);
  fill(100 + x * 100, 0, 0)
  sphere();
  translate(0, 0.5, 0);
  fill("white")
  sphere();
  x+=0.01;
}