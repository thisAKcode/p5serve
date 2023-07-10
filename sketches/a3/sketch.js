
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360,100,100,100)
  blendMode(SCREEN);
  noStroke();
  noLoop();

}
function draw() {
    background(90, 20, 10, 100);
    translate(40.0, height / 3.0);
    fill(0, 100, 100, 100);
    for (i = 0; i < TWO_PI; i += 0.03) {
      ellipse(i * 50, -sin(i) * 50, 2, 2);
    }
}

