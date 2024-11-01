let tileSize = 50; // Size of each tile
let rows, cols; // Number of rows and columns of tiles

function setup() {
  createCanvas(500, 500);
  background(255);
  
  // Calculate the number of rows and columns based on canvas size and tile size
  rows = height / tileSize;
  cols = width / tileSize;
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let xPos = x * tileSize;
      let yPos = y * tileSize;

      // Generate a random number to determine the type of tile
      let tileType = random(1);

      // Draw the appropriate tile based on the random number
      if (tileType < 0.5) {
        drawTile1(xPos, yPos);
      } else {
        drawTile2(xPos, yPos);
      }
    }
  }
}

// Function to draw tile type 1
function drawTile1(x, y) {
  fill(0);
  rect(x, y, tileSize, tileSize);
  fill(255);
  textSize(20);
  text("X", x + tileSize / 2, y + tileSize / 2);
}

// Function to draw tile type 2
function drawTile2(x, y) {
  fill(255);
  rect(x, y, tileSize, tileSize);
  fill(0);
  textSize(20);
  text("O", x + tileSize / 2, y + tileSize / 2);
}
