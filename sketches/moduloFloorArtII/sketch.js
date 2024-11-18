let img; // Declare variable 'img'.
let palette2 = ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9", "#90e0ef","#001219","#240046", "#edede9","#3a7ca5", "#33415c"];
let description = "I wanted to play with the modulo and floor to divide the screen"
// create class Tile that can be of following parameters 
// x, y, size, color, stroke, transparency, rotation, flipX, flipY
let [gridSizeX, gridSizeY] = [10, 10];
let stepSize;
let numSteps = 8;
let [CanvasMiddleX, CanvasMiddleY] = [];
let  [subcanvasWidth, subcanvasHeigth] = [];
// i have ofthen number of categories 6 
// so when i iterate through sequence with step of 1
// I need to cycle through values again
// and map 7 to 1 8 to 2 etc
let emojis = ["😀", "😂", "😍", "😎", "😢", "😡", "🤔", "😴", "😇", "🤖"];
let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let digits = ["1", "2", "3", "4", "5", "6", "7", "8"];
let numberOfTiles = 4; // for now hardcoded, in future will be dynamically computed

const getCategoryIndex = (index, maxCategory) => (index % maxCategory);


class Category {
  constructor(idx, divider, categoryIndex) {
    this.idx = idx;
    this.divider = divider;
    this.categoryIndex = categoryIndex;
  }

  categoryFloor() {
    return Math.floor(this.idx / this.divider);
  }

  categoryModulo() {
    return this.idx % this.divider;
  }

  categoryFloorModuloI() {
    return Math.floor(this.idx % this.divider);
  }

  categoryModuloFloorI() {
    return this.idx % Math.floor(this.divider);
  }

  categoryFloorModuloII() {
    return (this.idx % 2 === 0) ? Math.floor(this.idx / this.divider) : this.idx % this.divider;
  }

  categoryModuloFloorII() {
    return (this.idx % 2 === 0) ? this.idx % this.divider : Math.floor(this.idx / this.divider);
  }

  getCategoryFunction() {
    switch (this.categoryIndex) {
      case 0: return this.categoryFloor();
      case 1: return this.categoryModulo();
      case 2: return this.categoryFloorModuloI();
      case 3: return this.categoryModuloFloorI();
      case 4: return this.categoryFloorModuloII();
      case 5: return this.categoryModuloFloorII();
      default: return this.categoryFloor();
    }
  }
}

const getcanvasPortion = (canvasPart,CanvasMiddleX, CanvasMiddleY) => {
  switch (canvasPart) {
    case 0: return [0, 0];
    case 1: return [CanvasMiddleX, 0];
    case 2: return [0, CanvasMiddleY];
    case 3: return [CanvasMiddleX, CanvasMiddleY];
  }
};

function workOnTile(gridSize, tileSize, category, quadrant) { 
  // it receives the gridSize, tileSize, category, quadrant
  // it returns the array of [[coordinates], categoryOperation]
  let result = [];
  for (let i = 1; i <= gridSize + 1; i++) {
    for (let j = 1; j <= gridSize + 1; j++) {
      // compute the middle of the tile
      let x = (j-1) * tileSize + tileSize / 2;
      let y = (i-1) * tileSize + tileSize / 2;
      let idx = i;
      let divider = j;
      let cat = new Category(idx, divider, category);
      result.push([[x, y], cat.getCategoryFunction()]);
    }
  }
  return result;
}

function setup() {
  noLoop();
  createCanvas(720, 720);
    
let [CanvasMiddleX, CanvasMiddleY] = [width / 2, height / 2];
console.log('while in setup', CanvasMiddleX)
  background('#001219');
}

function draw() {
 // Load the instances of tiles class 
// Create a grid of 4x4
let gridSize = 10;
let tileSize = width / gridSize;
//one_of_palettes = random(palette2);
let one_of_palettes = palette2;
let [CanvasMiddleX, CanvasMiddleY] = [width / 2, height / 2];
let [subcanvasWidth, subcanvasHeigth] = [CanvasMiddleX, CanvasMiddleY];

console.log(`CanvasMiddleX: ${CanvasMiddleX}, CanvasMiddleY: ${CanvasMiddleY}`);
console.log(`subcanvasWidth: ${subcanvasWidth}, subcanvasHeigth: ${subcanvasHeigth}`);

let stepSizeX = subcanvasWidth/numSteps;
let stepSizeY = subcanvasHeigth/numSteps;

// Create a grid of 2x2
// on canvas using canvas middle
// and then make the functions to process 
// the grid quadrants on special way
// depending on grid quadrants index
for (let canvasPart = 0; canvasPart <= 3; canvasPart++) {
  push();

  NodeList = {}
  let nodes = [];
  let nodeGroups = {};

  [translateToX, translateToY] = getcanvasPortion(canvasPart,CanvasMiddleX,CanvasMiddleY);
  console.log(translateToX, translateToY)
  // in a future i want to iterate through categories
  currentCategory = getCategoryIndex(canvasPart, maxCategory = 4);
  // now i use hardcoded value of 0 to only choose the modulo
  //currentCategory = 0;
  
  
  translate(translateToX, translateToY);
  console.log(subcanvasWidth)
  
  for (let i = 0; i < numSteps; i ++) {
    for (let j = 0; j < numSteps; j ++) {
      let subtileMiddleX = i*stepSizeX + stepSizeX/2;
      let subtileMiddleY = j*stepSizeY + stepSizeY/2;
      let categoryInstance = new Category(i + 1, j + 1, currentCategory);
      
      let actualCategory = categoryInstance.getCategoryFunction();
      
      // logging using template literals
      console.log(
        `i is ${i}`,`j is ${j}`, 
        `submiddlex is ${subtileMiddleX}`,`submiddley is ${subtileMiddleY}`, 
        `output of the function is ${actualCategory}`
      );
      
      let _color = one_of_palettes[actualCategory % one_of_palettes.length];
      let strokeWeightValue = random([1]);
      let transparency = random([0.5, 0.75, 1]);
      let rotation = random([0, 90, 180, 270]);
      let flipX = random([true, false]);
      let flipY = random([true, false]);
      // write the text at each subtileMddleX
      // subtileMiddleY
      let letter = digits[actualCategory % letters.length];
      textSize(22);
      textAlign(CENTER, CENTER);
      fill(_color);
      text(actualCategory, subtileMiddleX, subtileMiddleY);

      nodes.push({ x: subtileMiddleX, y: subtileMiddleY, category: actualCategory });

      if (!nodeGroups[actualCategory]) {
        nodeGroups[actualCategory] = [];
      }
    nodeGroups[actualCategory].push({ x: subtileMiddleX, y: subtileMiddleY });

  // Draw lines between nodes of the same category
  for (let category in nodeGroups) {
    let group = nodeGroups[category];
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        let nodeA = group[i];
        let nodeB = group[j];
        //The problem is that stroke is being used as a variable name, which conflicts with the stroke function in p5.js. To fix this, rename the variable stroke to something else. 
        strokeWeight(strokeWeightValue);
        _currentCathegory = nodeA.category
        //console.log(_currentCathegory)
        stroke(_color);
        line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
      }
    }
  }



    }
  }

  pop();
}
}


