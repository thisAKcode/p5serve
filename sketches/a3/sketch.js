[x, y] = [2,2]
function setup() {
  createCanvas(720, 720);
  colorMode(HSB, 360,100,100,100)
  blendMode(SCREEN);
  noStroke();
  noLoop();

}
function draw() {
    background(90, 20, 10, 100);
    translate(10.0, height / 1.60);
    fill(0, 100, 100, 100);
    for (let j = 0; j <= 5; j++) {
      // pow(2, j) for 2 in power of i from range 5 * 12.5 gives us 12.5, 25, 50 and so on.
      for (let i = 0; i < TWO_PI; i += 0.03) {
        ellipse(i * pow(2, j) * 12.5, (-sin(i) * pow(2, j) * 12.5), x, y);
        ellipse(i * pow(2, j) * 12.5, (-sin(i) * pow(2, j) * 12.5)+5, x, 4);
      }
    }
}
