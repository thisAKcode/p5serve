// credits https://www.deconbatch.com/2021/10/node-garden.01.html
// https://www.deconbatch.com/2021/10/node-garden.01.html
let img; // Declare variable 'img'.
let palette = ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9"];
let palette2 = ["#90e0ef","#001219","#240046", "#edede9","#3a7ca5", "#33415c"];
let description = "I wanted to make herringbone but ended up with zickzack pattern. Way it turned out. Herringbone will be the next time. ";
//// create class Tile that can be of following parameters 
// x, y, size, color, stroke, transparency, rotation, flipX, flipY
let floorDenominator = Math.random() < 0.5 ? 2 : 3;
// Create a grid of 4x4
let gridSize = 8;

const buNodes = new Array();

function addDescription(){ 
      // Add description text
      
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
      // Reset everything to get white text
      resetMatrix();
      fill('white');
      //stroke('red');
 
      textAlign(LEFT, BOTTOM);
      textSize(fontSize);
      //fill(0, 102, 153);
      
    for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        const xPos = margin;
        const yPosLine = yPos + (i + 1) * lineHeight;
        
        text(lineText, xPos, yPosLine);
      }
}

function noOOPcreateZickzackPatternI(gridSize) {
  let tileSize = width / gridSize;
  let one_of_palettes = random([palette, palette2]);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let color = random(one_of_palettes);
      //let rowGroupCategory = (i % 2 === 0) ? 'even' : 'odd';
      
      let columnCategory = (j % 2 === 0) ? 'even': 'odd';
      let rowGroupCategory = floor(i / floorDenominator) % floorDenominator;
      //let rowGroupCategory = floor(i / 2) % 2;
      x = j * tileSize+tileSize/2; 
      y = i * tileSize+tileSize/2 ;
      let _vector = createVector(x, y);
      buNodes.push({
        _vector: _vector,
        rowGroupCategory: rowGroupCategory,
        columnCategory: columnCategory,
        color: color
      });
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
//one_of_palettes = random(palette2);

let size = width / gridSize;

let one_of_palettes = random([palette, palette2]);
noOOPcreateZickzackPatternI(gridSize);

//draw 
buNodes.forEach((node) => {
  strokeWeight(2);
  print(node)
  let endX = node._vector.x + size/2;
  let endY = node._vector.y + size/2;
  
  line(node._vector.x+size/2, node._vector.y+size/2, endX, endY);

  text('+', node._vector.x, node._vector.y);
  //ellipse(this.x, this.y, gridSize/2, gridSize/2);
 // draw lines
 let nodeNum = buNodes.length;
  for (let i = 0; i < nodeNum; i++) {
    let n = buNodes[i];
    for (let j = i + 1; j < nodeNum; j++) {
      let m = buNodes[j];
      //if (n.rowGroupCategory === m.rowGroupCategory) {
        strokeWeight(1);
        stroke(n.color);
        let condition1 = n.rowGroupCategory === m.rowGroupCategory;
        let condition2 = (dist(n._vector.x, n._vector.y, m._vector.x, m._vector.y) < 300)
        let condition3 = n.columnCategory === m.columnCategory;
        if (condition1 && condition2 && condition3) {
          line(n._vector.x, n._vector.y, m._vector.x, m._vector.y);
          let endX = n._vector.x + size/4;
          let endY = n._vector.y + size/4;
          line(n._vector.x, n._vector.y, endX, endY);
          line(n._vector.x+ size/4, n._vector.y+ size/4, m._vector.x+ size/4, m._vector.y+ size/4)
      }
      ;
    }
  }
});

addDescription();

}

