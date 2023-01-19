function setup() {
  createCanvas(1420, 680);
  angleMode(DEGREES);

}

function draw() {
  background(180);
  //background(Math.floor(Math.random()*256));
  arc(90, 60, 80, 80, 0, 90);
  arc(190, 60, 80, 80, 0, 270);

  // nested loop
  // make a 10 by 5 grid of circles that are 25 pixels apart horizontally and 50 pixels vertically.
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 5; j++){
      circle(i*25, j*50, 10)
    }
  }
}
