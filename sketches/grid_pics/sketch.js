// i had hard times to follow along with docs regarding applying different filters to the same source 
// picture. 
// workaround was found here: 
// https://discourse.processing.org/t/image-filter-gets-stronger-every-loop-p5-js/35641/4
let imgIn, imgClone;
let projName = 'grid_pics';
let pathCheck;
let description = "This sketch is a blueprint "
let currentFilter = 0;
let gridSize =4;
let gridRows = 4;      // Number of rows in the grid
let gridCols = 4;      // Number of columns in the grid
let cellWidth, cellHeight;

let cellSize;
let imgs = [];
// JSON object to store the filters
let filters = {
  0: 'GRAY',      // Grayscale
  1: 'THRESHOLD', // Threshold
  2: 'INVERT',    // Invert
  3: 'OPAQUE',    // Opaque
};

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
  imgIn = loadImage(imgPathChecker(), img => {
    imgClone = img.get();
    img.loadPixels();
    imgClone.loadPixels();
  });
}
function transferImage(src, tgt) {
  tgt.pixels.set(src.pixels);
  tgt.updatePixels();
  return tgt;
}
function earlyBirdFilter(img) {
  borderFilter(radialBlurFilter(darkCorners(sepiaFilter(img)))).updatePixels();
  return img;
}
function setup() {
  createCanvas(400, 400);
  cellWidth = width / gridCols;    // Calculate width of each cell
  cellHeight = height / gridRows;   // Calculate height of each cell
  background(248);
  noLoop();
}
function applyFilter(imgIn,x,y, filterIndex){
  // here we use a callback to display the image after loading
  //img.filter(BLUR,1);
  //image(img,x,y)
  // Apply a different filter based on the filterIndex
  if (filterIndex === 0) {
    filter(GRAY); // Apply grayscale filter
  } else if (filterIndex === 1) {
    filter(THRESHOLD); // Apply threshold filter
  } else if (filterIndex === 2) {
    filter(INVERT); // Apply invert filter
  } else {
    filter(OPAQUE); // Apply opaque filter
  }
}
function foo(x,y){
      loadImage(imgPathChecker(), imgIn2 => {
      cellSize = width*0.7 / gridSize;
      imgIn2.resize(cellSize,0)
      currentFilter = (currentFilter+1) % 4;
      console.log('currentmodulo',currentFilter)
    
      if (currentFilter === 0) {
        imgIn2.filter(GRAY); // Apply grayscale filter
      } else if (currentFilter=== 1) {
        imgIn2.filter(THRESHOLD); // Apply threshold filter
      } else if (currentFilter === 2) {
        imgIn2.filter(INVERT); // Apply invert filter
      } else {
        imgIn2.filter(OPAQUE); // Apply opaque filter
      }
      image(imgIn2, x,y);
      });
    }
function borderFilter(img) {
  // blah, blah, blah...
  return img;
}
function sepiaFilter(img) {
  // blah, blah, blah...
  return img;
}
function darkCorners(img) {
  // blah, blah, blah...
  return img;
}

function radialBlurFilter(img) {
  // blah, blah, blah...
  return img;
}
function draw(){
  //cellSize = width / gridSize;
  imgIn.resize(cellWidth,0)
  //image(transferImage(imgIn, imgClone), 0, 0);
  //image(earlyBirdFilter(imgClone), imgIn.width, 0);  
  let imageIndex = 0;  // Index to track which image to display
  
  // Loop through each row and column
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      // Calculate x and y position for each cell
      let x = col * cellWidth;
      let y = row * cellHeight;
      // Get the corresponding filter for each quadrant
      imgIn.loadPixels();  // Load the image pixels
      let filteredImg = imgIn.get();  // Create a copy of the image to filter
      let filterType = (row * gridCols + col) % 4;
      // Apply filters based on row
      if (filterType === 0) {
        filteredImg.filter(GRAY);
      } else if (filterType === 1) {
        filteredImg.filter(INVERT);
      } else if (filterType === 2) {
        filteredImg.filter(POSTERIZE, 3);  // Posterize with 3 levels
      } else if (filterType === 3) {
        filteredImg.filter(THRESHOLD, 0.5);  // Threshold with 50% cutoff
      }

      // Draw the filtered image in the cell
      image(filteredImg, x, y, cellWidth, cellHeight);
    }
  }
}
