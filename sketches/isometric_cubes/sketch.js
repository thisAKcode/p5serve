let img; // Declare variable 'img'.
let pathCheck;
let palette = ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9"];
let palette2 = ["#90e0ef","#001219","#240046", "#edede9","#3a7ca5", "#33415c"];

let darkPalette = ["#001219", "#031B29", "#032124", "#240046", "#3d314a","#5A1A0E"];
let lightPalette = ["#f9ed69", "#f08a5d", "#b83b5e", "#6a2c70", "#94d2bd",  "#e9d8a6"];

let description = "I wanted to use different kind of arcs."
let gridSize = 25;

class _3dShape {
  constructor(x, y, z, width, height, depth, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
  }

  drawCube() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.color);
    box(this.width, this.height, this.depth);
    pop();
  }

  drawGlobe() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.color);
    sphere(this.width);
    pop();
  }
}

function drawShape(shape) {
  if (shape.type === 'cube') {
    shape.drawCube();
  } else if (shape.type === 'globe') {
    shape.drawGlobe();
  }
}

  

function setup() {
  createCanvas(720, 720, WEBGL);
  //ortho(height / 2, -height / 2, -width / 2, width / 2, 0, 1000);
  
  rotateX(-PI / 6);
  rotateY(PI / 4);
  rotateX(-PI / 6);
  rotateY(PI / 4);
  //noStroke();
  noLoop();
  background('#006d77');
}


function draw() {
 // Load the instances of tiles class 
// Create a grid of 4x4

let tileSize = width / gridSize;
//one_of_palettes = random(palette2);
let one_of_palettes = random([palette, palette2, darkPalette, lightPalette]);
// i want to create a 3d array of coordinates (cubes) with the step of grid size and then pick 20 random coordinates to draw the cubes

// Create a 3D array of coordinates
let coordinates = [];
for (let k = 0; k < width; k += tileSize) {
  for (let i = 0; i < width; i += tileSize) {
    for (let j = 0; j < width; j += tileSize) {
      coordinates.push([j - width / 2, i - width / 2, k - width / 2]);
    // Introduce noise to generate coordinates with random jumps
    if (noise(i * 0.1, j * 0.1, k * 0.1) > 0.5) {
      coordinates.push([j - width / 2, i - width / 2, k - width / 2]);
    }
    }
  }
}

console.log(coordinates);
let randomCoordinates = [];
for (let i = 0; i < 200; i++) {
  let noiseFactor = noise(i * 0.1) * coordinates.length;
  randomCoordinates.push(coordinates[int(noiseFactor)]);
}

// Draw the cubes
for (let coord of randomCoordinates) {
  let [x, y, z] = coord;
  let width = gridSize;
  let height = gridSize;
  let depth = gridSize;
  let type = random(['cube', 'globe']);
  let color = random(one_of_palettes);
  let shape = new _3dShape(x, y, z, width, height, depth, color);
  shape.type = type;

  drawShape(shape);
}

}

