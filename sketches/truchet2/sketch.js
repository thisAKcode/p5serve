let img; // Declare variable 'img'.
let pathCheck;
let palette = ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9"];
let palette2 = ["#90e0ef","#001219","#240046", "#edede9","#3a7ca5", "#33415c"];

let darkPalette = ["#001219", "#005f73", "#0a9396", "#240046", "#3d314a","#5A1A0E"];
let lightPalette = ["#f9ed69", "#f08a5d", "#b83b5e", "#6a2c70", "#94d2bd",  "#e9d8a6"];

let description = "I wanted to mix triangles with arcs."

// create class Tile that can be of following parameters 
// x, y, size, color, stroke, transparency, rotation, flipX, flipY

// as class instances
// of n types
// each jumping to x, y position
// each with a size of tile_size
// each with a color from the palette
// each with a stroke of 0
// each with variying transparency in range (0,35%, 70%)
// each (except square) with a random rotation of 0, 90, 180, 270 degrees
// each with a random flip in x or y
// each with a random flip in y and x (diagonal flip)
// class
class Tile {
  constructor(x, y, size, color, stroke, transparency, rotation, flipX, flipY) {
    this.x = x; this.y = y; this.size = size; this.color = color; this.stroke = stroke;
    this.transparency = transparency; this.rotation = rotation;
    this.flipX = flipX; this.flipY = flipY;
  }

  // a method to draw a polygon that starts at top left corner, go to top right corner, 
  // and then makes an arc to bottom left corner
  
  drawArcHALF_PI() {
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
    vertex(0, 0); // Top left corner
    vertex(this.size, 0); // Top right corner
    arc(0, 0, this.size * 2, this.size * 2, 0, HALF_PI); // Arc to bottom left corner
    endShape(CLOSE);
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
    if (this.type === 'polygon') {
      this.drawArcHALF_PI();
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
let gridSize = 4;
let tileSize = width / gridSize;
//one_of_palettes = random(palette2);
let one_of_palettes = random([palette, palette2]);
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    // Randomly select color, transparency, rotation, flipX, and flipY
    let color = random(one_of_palettes);
    let transparency = random([0.10, 0,25]);
    let rotation = random([0, 90, 180, 270]);
    let flipX = random([true, false]);
    let flipY = random([true, false]);

    // Create an instance of Tile class
    let tile = new Tile(j * tileSize, i * tileSize, tileSize, color, 0, transparency, rotation, flipX, flipY);

    // Randomly assign type to tile
    tile.type = random(['polygon', 'triangle']);

    // Render the tile
    tile.draw();
  }
}

}

