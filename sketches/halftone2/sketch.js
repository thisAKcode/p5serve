// grunged halftone https://note.com/alchan/n/n5c530f4fa9c4
let projName = 'halftone';
let imgIn, imgClone;

let pathCheck;
let description = "This sketch is a blueprint "
let currentFilter = 0;
let gridSize =4;
let gridRows = 4;      // Number of rows in the grid
let gridCols = 4;      // Number of columns in the grid
let cellWidth, cellHeight;

let cellSize;
let imgs = [];
imgIn = null;
function imgPathChecker() {
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = 'assets/image.JPG';
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/assets/image.JPG`;
  }
  return pathCheck;
}

function preload() {
  imgIn = loadImage(imgPathChecker(), img => {
    imgClone = img.get();
    img.loadPixels();
    imgClone.loadPixels();
  });
}

function addDescription(){ 
      // Add description text
      let description = "in future I want make multicolor halftone. By now i modify gra image posted on wikipedia by Jörg Bittner Unna - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=109727478"
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


function applyDithering(img, gridSize) {
    img.loadPixels();
    for (let y = 0; y < img.height; y += gridSize) {
      for (let x = 0; x < img.width; x += gridSize) {
        let index = (x + y * img.width) * 4;
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let avg = (r + g + b) / 3;

        let newColor = avg > 128 ? 255 : 0;

        for (let dy = 0; dy < gridSize; dy++) {
          for (let dx = 0; dx < gridSize; dx++) {
            let newIndex = ((x + dx) + (y + dy) * img.width) * 4;
            img.pixels[newIndex] = newColor;
            img.pixels[newIndex + 1] = newColor;
            img.pixels[newIndex + 2] = newColor;
            img.pixels[newIndex + 3] = 255; // Ensure alpha channel is set to 255
          }
        }
      }
    }
    img.updatePixels();
        return img;
    }
    
function drawEllipsesFromBrightness(img, offsetX, offsetY, drawWidth, drawHeight) {
  let stepSize = 14; // Adjust step size as needed

  img.loadPixels();
  for (let y = 0; y < img.height; y += stepSize) {
    for (let x = 0; x < img.width; x += stepSize) {
      let i = (y * img.width + x) * 4;

      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];

      let luma = 0.299 * r + 0.587 * g + 0.114 * b;

      let diameter = map(luma, 0, 255, stepSize, 0);
      fill(0);
      noStroke();

      
      square(
        map(x, 0, img.width, offsetX, offsetX + drawWidth),
        map(y, 0, img.height, offsetY, offsetY + drawHeight),
        diameter
      );
      
    }
  }
}


function setup() {
  createCanvas(720, 720);
  angleMode(DEGREES);
}


function draw() {
  if (imgIn && imgIn.width > 0) {
    imgIn.loadPixels();
    imgClone = applyDithering(imgClone, gridSize);
    image(imgClone, 0, 0, width / 2, height);

    drawEllipsesFromBrightness(imgIn, width / 2, 0, width / 2, height);
    
    addDescription();
    noLoop();
  }
}

