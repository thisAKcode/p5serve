let img; // Declare variable 'img'.
let projName = 'xyz123';
let pathCheck;
let description = "This code loops through each x and y position to create a rectangle object with a size of ixj pixels. The fill() function is used to give each rectangle a random color which is lerped."


// Create a 2-dimensional array to store the rectangles
let currentPalette = ["#BAA77D","#7A623C","#8E8C97","#816D6B","#1C1B20","#E0DDD4"];
var rects = [];
var _rects = [];

let step_row = 9;   // those are 'rows'
let step_col = 18;   // those are 'columns'

// Define the dimensions of each rectangle
let rectWidth;
let rectHeight;

  // Define a Rectangle object
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}


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
  createCanvas(400, 400);
  noLoop();

  rectWidth = width / step_col;
  rectHeight = height / step_row;

  for (var i = 0; i < step_row; i++) {
    // Create a new row
    var row = [];

    for (var j = 0; j < step_col; j++) {
      // Calculate the position of the rectangle
      var x = j * rectWidth;
      var y = i * rectHeight;
      // Create the rectangle
      var rect = {
        x: x,
        y: y,
        width: rectWidth,
        height: rectHeight
      };
      // Add the rectangle to the row
      row.push(rect);
    }
    // Add the row to the array
    rects.push(row);
  }
}


function draw() {
  background(0);
  noLoop();

  for (var i = 0; i < step_row; i++) {
    for (var j = 0; j < step_col; j++) {
      var _rect = rects[i][j];
      rectMode(CORNER);

      let newColor = null;

      let blockColor = random(currentPalette);
      // change randomly to darker or lighter
      if( random([true,false]) ){
        newColor = lerpColor( color(blockColor), color(0), random(0,0.07));
      }else{
        newColor = lerpColor( color(blockColor), color(255), random(0,0.07));
      }

      fill(newColor);      
      rect(_rect.x, _rect.y, _rect.width, _rect.height)
    }
addDescription();
  }


}

// This code loops through each x and y position to create a rectangle object with a size of ixj pixels. // The fill() function is used to give each rectangle a random color to set the rectangle.