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
          }
        }
      }
    }
    img.updatePixels();
    return img;
  }

function setup() {
  createCanvas(720, 720);
  angleMode(DEGREES);
}


function draw() {
  background(0);
  noLoop();
  
  // Calculate cell dimensions
  cellWidth = width / 2;  // Two columns: one for gray, one for posterized
  cellHeight = height;    // Full height for each column

  

  // Loop through each column (only two columns)
  for (let col = 0; col < 2; col++) {
    // Calculate x position for each cell
    let x = col * cellWidth;
    let y = 0;  // Start from the top

    // Get the corresponding filter for each column
    imgIn.loadPixels();  // Load the image pixels
    let filteredImg = imgIn.get();  // Create a copy of the image to filter

    // Apply filters based on column
    if (col === 0) {
      filteredImg.filter(GRAY);
    } else if (col === 1) {
      filteredImg.filter(POSTERIZE, 3);  // Posterize with 3 levels
    }

    // Draw the filtered image in the cell
    image(filteredImg, x, y, cellWidth);
    
    image2 = applyDithering(imgIn, 10)
    image(image2, x + cellWidth, y, cellWidth, cellHeight);
  // Add description text
  addDescription();
  }
}
