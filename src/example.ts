export function setup() {}

let leftControllerColor = "darkblue";
export function leftControllerPressed() {
  leftControllerColor = "blue";
}
export function leftControllerReleased() {
  leftControllerColor = "darkblue";
}

let rightControllerColor = "darkred";
export function rightControllerPressed() {
  rightControllerColor = "red";
}
export function rightControllerReleased() {
  rightControllerColor = "darkred";
}

export function draw() {
  lights();

  applyMatrix(leftControllerMatrix);
  fill(leftControllerColor);
  sphere(0.05);

  resetMatrix();
  applyMatrix(rightControllerMatrix);
  fill(rightControllerColor);
  sphere(0.05);

  resetMatrix();
  translate(0, 1.6, -1.5);
  fill("white");
  sphere(0.1);
}
