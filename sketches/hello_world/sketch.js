let img; // Declare variable 'img'.
let projName = 'hello_world';
let pathCheck;
let font; // Declare variable 'font'

let description = "I wanted to distort texty, I do not know why."


// funktion to draw the letter X as polyline
function drawLetterX(x, y, size) {
  const points = font.textToPoints('X', x, y, size, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
}

// is there a way to make some of the 
// text parts saved as vector points 
// and then distort them?
// I am thinking of using the bezierVertex()
function distortText(text, x, y) {
  return font.textToPoints(text, x, y, 90, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
}

function addDescription(){ 
      const fontSize = 12;
      textFont('monospace', fontSize);
      const lineHeight = fontSize * 1.2;
      const margin = 10; // Margin between lines and edges
      
      const maxTextWidth = width - margin * 2; // Maximum text width
      const words = description.split(' '); // Split description into words
      
      let line = 'foo';
      const lines = [];
      
      // Split the description into lines
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = line + word + ' ';
        const testWidth = textWidth(testLine);
        
        if (testWidth > maxTextWidth && i > 0) {
          lines.push(line);
          line = word + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      const yPos = height - margin - lines.length * lineHeight;
    
      textAlign(LEFT, BOTTOM);
      textSize(fontSize);
      fill(0, 102, 153);
      for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        const xPos = margin;
        const yPosLine = yPos + (i + 1) * lineHeight;
        
        text(lineText, xPos, yPosLine);
      }
}

function imgPathChecker() {
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = 'assets/image.JPG';
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/assets/image.JPG`;
  }
  return pathCheck;
}
function preload() {
  // preload() runs once
  img = loadImage(imgPathChecker());
  font = loadFont('assets/monospace.ttf'); // Load the font
}


function setup() {
  noLoop();
  createCanvas(720, 720);
  background('black');
}

function draw() {
  background(100);

  fill(0,0);
  stroke(0);
  strokeWeight(10);

  textSize(90);
  textAlign(CENTER, CENTER);

  

  push();
  fill(0,0);
  stroke(0);
  strokeWeight(15);
  strokeJoin(ROUND);
  drawingContext.setLineDash([1,1]);
  strokeCap(SQUARE);
  textStyle(BOLD);
  text("Hello World!", 300, 100);
  pop();


  push();
  fill(0,0);
  stroke(0);
  strokeWeight(1);
  strokeJoin(BEVEL);
  drawingContext.setLineDash([1,5]);
  strokeCap(PROJECT);
  textStyle(BOLDITALIC);
  text("Hello World!", 300, 300);
  pop();


let points = distortText("Hello World!", 100, 400);
console.log(points);
//beginShape();
for (let i = 0; i < points.length; i++) {
  let pt = points[i];
  let offsetX = sin(pt.y * 0.05 + frameCount * 0.1) * 10;
  let offsetY = cos(pt.x * 0.05 + frameCount * 0.1) * 10;
  vertex(pt.x, pt.y );
}
//endShape(CLOSE);
beginShape();
for (let i = 0; i < points.length; i++) {
  let pt = points[i];
  let offsetX = sin(pt.y * 0.05 + frameCount * 0.1) * 10;
  let offsetY = cos(pt.x * 0.05 + frameCount * 0.1) * 10;
  //ellipse(pt.x, pt.y, 0.1, 0.1);
  if(i % 2 == 0){
    //vertex(pt.x + offsetX, pt.y + offsetY);
    // fill('red');
    ellipse(pt.x, pt.y, 0.1, 0.1);
}
endShape(CLOSE);
}


 drawLetterX(250, 250, 100) 

}