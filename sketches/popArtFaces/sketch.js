let img; // Declare variable 'img'.
let projName = 'popArtFaces';
let pathCheck;
let description = "This sketch is a blueprint "
var originalImage, thresholdImage, invertImage, posterImage;
let gridSize = 4;
let cellSize;

function addDescription(){ 
      const fontSize = 12;
      textFont('monospace', fontSize);
      const lineHeight = fontSize * 1.2;
      const margin = 10; // Margin between lines and edges

      const maxTextWidth = width - margin * 2; // Maximum text width
      const words = description.split(' '); // Split description into words

      let line = '';
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
  originalImage = loadImage(imgPathChecker());
  thresholdImage = loadImage(imgPathChecker())
  grayImage = loadImage(imgPathChecker());
  posterImage = loadImage(imgPathChecker());
};

function setup() {
  createCanvas(1720, 720);
  background('black');
  cellsize = width / gridSize;
} 
function draw() {
  background(255);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = (j + 0.5) * cellSize;
      let y = (i + 0.5) * cellSize;
      
      push();
      translate(x, y);
       
      // Apply different filters to each cell
      applyFilter(i, j);
      
     originalImage.resize(400,0);
     image(originalImage, x, y); // to fit width
      pop();
    }
  }
  
  // add filters to images
  thresholdImage.filter("threshold", 0.43);
  grayImage.filter("gray"); 
  posterImage.filter(POSTERIZE, 3);
  
 ;
   // display images
   var scale = 0.3;
   let _h = scale*width
   let _w = scale*originalImage.height*width/originalImage.width
  //(CENTER);
  originalImage.resize(400,0);
  image(originalImage, 0, 0); // to fit width
  
  thresholdImage.resize(400,0)
  image(thresholdImage, 400, 0); 
  grayImage.resize(400,0) 
  image(grayImage, 800, 0);
  posterImage.resize(400,0)
  image(posterImage, 1200, 0)
  // display text labels
  fill(255);
  noStroke();
  text('Original', 0, height - 25);
  text('Threshhold', 400, height - 25);
  text('Greyscale', 800, height - 25);
  text('Posterize', 1200, height - 25);
  addDescription();
}
function applyFilter(row, col) {
  let index = row * gridSize + col; // Calculate the index of the current cell
  
  // Apply a different filter based on the index
  if (index % 4 === 0) {
    filter(GRAY); // Apply grayscale filter
  } else if (index % 4 === 1) {
    filter(THRESHOLD); // Apply threshold filter
  } else if (index % 4 === 2) {
    filter(INVERT); // Apply invert filter
  } else {
    filter(OPAQUE); // Apply opaque filter
  }
  
  image(img, 0, 0, cellSize, cellSize);
}