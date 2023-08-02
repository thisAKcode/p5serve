let img; // Declare variable 'img'.
let projName = 'grid_pics';
let pathCheck;
let description = "This sketch is a blueprint "
let currentFilter = 0;
let gridSize =5;
let cellSize;

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
  // preload() runs once
  img = loadImage(imgPathChecker());
}

function setup() {
  createCanvas(720, 720);
  background('black');
  noLoop();
}
function applyFilter(img,x,y, filterIndex){
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

function foo(img,x,y, filterIndex){
      img.filter(BLUR,5);
      image(img, x,y);
}


function draw() {
  cellSize = width / gridSize;
  // Displays the image
  img.resize(cellSize,0)
  //image(img, 0, 0);
  addDescription();
  //let clone = Object.assign({}, img) // Copies user into clone
  let clone = {...img}
  //clone.resize(cellSize,0)
  let index=0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = (j) * cellSize;
      let y = (i) * cellSize;
      loadImage(imgPathChecker(), img2 => {
      cellSize = width / gridSize;
      img2.resize(cellSize,0)
   
      indx = index + 1;
      console.log('indx',indx)
      currentFilter = (currentFilter + 1) % 4;
      console.log('currentmodulo',currentFilter)
      foo(img2,x,y,indx)
    });
      //foo(img, x, y,indx)
  //    applyFilter(img,x,y, currentFilter);

      //img.filter(BLUR,1);
      //image(img, x, y);
      // Apply different filters to each cell
    }
  }
  

}
