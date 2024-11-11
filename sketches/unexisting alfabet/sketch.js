let img; // Declare variable 'img'.
let pathCheck;
let font; // Declare variable 'font'
let palette = ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9"];
let description = "I wanted to distort texty, I do not know why."
//
let availableFonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];

function imgPathChecker() {
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = 'assets/image.JPG';
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/hello_world/assets/image.JPG`;
  }
  return pathCheck;
}

function preload() {
  // preload() runs once
  img = loadImage(imgPathChecker());
  font = loadFont('assets/monospace.ttf'); // Load the font
}

// all helpers goes here
// Function to draw the letter X as polyline
function drawLetterX(x, y, size, _letter) {
  const points = font.textToPoints(_letter, x, y, size, {
    sampleFactor: 0.01,
    simplifyThreshold: 0
  });
  fill(random(palette));
  strokeWeight(0);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
}


function setup() {
  noLoop();
  createCanvas(720, 720);
  background('black');
}


function draw() {
  background(100);
//  drawLetterX(250, 250, 100, "å"); 
//
let swedishLetters = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,å,ä,ö".split(",");
let gridSize = Math.ceil(Math.sqrt(swedishLetters.length));
let letterSize = width / gridSize;

for (let i = 0; i < swedishLetters.length; i++) {
  let col = i % gridSize;
  let row = Math.floor(i / gridSize);
  let x = col * letterSize + letterSize / 2;
  let y = row * letterSize + letterSize / 2;
  drawLetterX(x - letterSize * 0.45,
               y + letterSize * 0.45, 
               letterSize * 1.8, 
               swedishLetters[i]);
}
}

