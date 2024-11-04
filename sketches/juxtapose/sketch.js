var img1;
var img2;

function imgPathChecker(_img) {
  let pathCheck;
  const projName = 'juxtapose'; // Define projName
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = `assets/${_img}.JPG`;
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/assets/${_img}.JPG`;
  }
  return pathCheck;
}
function preload() {
  img1 = loadImage(imgPathChecker('image'), img => {
    imgClone = img.get();
    img.loadPixels();
    imgClone.loadPixels();
  });
  img2 = loadImage(imgPathChecker('v_and_f'), img => {
    imgClone = img.get();
    img.loadPixels();
    imgClone.loadPixels();
  });
}


function addDescription(){ 
  // Add description text
  let description = "I load two images (they are static) and overlay them on top of each other... the second image is visible through the first image. "
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
  fill('white');
  
for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i];
    const xPos = margin;
    const yPosLine = yPos + (i + 1) * lineHeight;
    
    text(lineText, xPos, yPosLine);
  }
}

function setup() {
  let canvas = createCanvas(680, 720);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  noLoop();
  const hardcodeX = 100;
  const hardcodeY = 100;

  var stepX = width / 1.5;
  var stepY = height / 3;
  tint(255, 128); // Apply transparency to the image (128 is 50% opacity)
  image(img1, 100, 0, 620, 800)
  for (var gridY = 0; gridY < height; gridY += stepY + hardcodeY) {
    for (var gridX = 0; gridX < width; gridX += stepX + 100) {
      tint(255, 128); // Apply transparency to the image (128 is 50% opacity)
      image(img2, gridX / 2, gridY * 2, stepX, stepY);
    }
  }
  img1.loadPixels();  // Load the image pixels

  // Draw the filtered image in the cell

  addDescription();
  // Save the canvas as a PNG file
  // saveCanvas('myCanvas.png', 'png');
  
}


