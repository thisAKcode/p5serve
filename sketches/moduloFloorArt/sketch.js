let img; // Declare variable 'img'.
let palette = ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9"];
let palette2 = ["#90e0ef","#001219","#240046", "#edede9","#3a7ca5", "#33415c"];
let description = "I wanted to play with the modulo and floor."
// create class Tile that can be of following parameters 
// x, y, size, color, stroke, transparency, rotation, flipX, flipY
let [gridSizeX, gridSizeY] = [10, 10];
let [CanvasMiddleX, CanvasMiddleY] = [canvas.width / 2, canvas.height / 2];


function getcanvasPortion(canvasPart) {
// i want to create 4 quadrants each of 10x10 tiles
// each on both side of the middle of canvas
// with the same size and color
// with the same transparency


// the switch statement is more readable and easier to understand
switch (canvasPart) {
    case 1: [translateToX, translateToY] = [0, 0]; break;
    case 2: [translateToX, translateToY] = [CanvasMiddleX, 0]; break;
    case 3: [translateToX, translateToY] = [0, CanvasMiddleY]; break;
    case 4: [translateToX, translateToY] = [CanvasMiddleX, CanvasMiddleY]; break;
    default: [translateToX, translateToY] = [0, 0];
}

switch (canvasPart) {
    case 1: category = floor; break;  // Math.floor(idx / divider); break;
    case 2: category = modulo; break;
    case 3: category = floor_modulo; break;
    case 4: category = modulo_floor; break; // each [gridSizeX, gridSizeY] = [10, 10]; break;
    default: [gridSizeX, gridSizeY] = [10, 10];
}

for (let i = 1; i <= gridSize + 1; i++) {
  for (let j = 1; j <= gridSize + 1; j++) {
    // compute the middle of the tile
    let x = (j-1) * tileSize + tileSize / 2;
    let y = (i-1) * tileSize + tileSize / 2;
    let idx = i;
    let divider = j;

    let categoryFloor = Math.floor(idx / divider);
    let categoryModulo = idx % divider;
    let categoryFloorModuloI = Math.floor(idx % divider); 
    let categoryModuloFloorI = idx % Math.floor(divider);

    let categoryFloorModuloII;
    categoryFloorModuloII = (idx % 2 === 0) ? Math.floor(idx / divider) : idx % divider;
    let categoryModuloFloorII;
    categoryModuloFloorII = (idx % 2 === 0) ? idx % divider : Math.floor(idx / divider);
  }
}
}

class canvasGrid {
  constructor(x, y, size, color, stroke, transparency, rotation, flipX, flipY) {
    this.x = x; this.y = y; this.size = size; this.color = color; this.stroke = stroke;
    this.transparency = transparency; this.rotation = rotation;
    this.flipX = flipX; this.flipY = flipY;
  }

  drawSquare() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotation));
    if (this.flipX) scale(-1, 1);
    if (this.flipY) scale(1, -1);
    let c = color(this.color);
    c.setAlpha(this.transparency * 255); // Apply transparency
    fill(c);
    strokeWeight(this.stroke);
    rect(0, 0, this.size, this.size);
    pop();
  }

 
drawTriangle() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotation));
    if (this.flipX) scale(-1, 1);
    if (this.flipY) scale(1, -1);
    let c = color(this.color);
    c.setAlpha(this.transparency * 255); // Apply transparency
    fill(c);
    strokeWeight(this.stroke);
    beginShape();
    vertex(0, 0);
    vertex(this.size, 0);
    vertex(0, this.size);
    endShape(CLOSE);
    pop();
  }


  draw() {
    if (this.type === 'square') {
      this.drawSquare();
    } else if (this.type === 'triangle') {
      this.drawTriangle();
    }
  }
}

function setup() {
  noLoop();
  createCanvas(720, 720);

  background('#006d77');
}


function draw() {
 // Load the instances of tiles class 
// Create a grid of 4x4
let gridSize = 10;
let tileSize = width / gridSize;
//one_of_palettes = random(palette2);
let one_of_palettes = random([palette, palette2]);


// Create a grid of 4x4
// on canvas using canvas middle

  }


