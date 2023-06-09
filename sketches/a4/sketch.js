let [dashLength,gapLength] = [5,5]; // Length of each dash, gap

function setup() {
  createCanvas(400, 400);
}

function straightDashLines(coordinatesIn){
  let [x,y,x2,y2] = coordinatesIn;
};

function draw() {
  background(220);
  strokeWeight(2);
  stroke(0);
  // array destructuring
  let [x, y, w, h] = [100, 100, 200, 150];
  
  line(x, y, x + w, y); // Top side
  line(x + w, y, x + w, y + h); // Right side
  line(x + w, y + h, x, y + h); // Bottom side
  line(x, y + h, x, y); // Left side
  
  // Draw lines for the diagonals
  line(x, y, x + w, y + h); // Top-left to bottom-right
  line(x, y + h, x + w, y); // Bottom-left to top-right

}
