// I would like to reference to those two materials:
// https://kimnewzealand.github.io/2019/02/21/celestial-maps/
// geojson https://github.com/ofrohn/d3-celestial/blob/master/data/mw.json`


let img; // Declare variable 'img'.
let projName = 'constellations';
let pathCheck;
let description = "I wanted to make map of night sky, I do not know why."
let padding = 20;
let boundary;

let geom;
let polygons;
let coords;
let labels;

function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function addDescription(){ 
      let indent = 0;
      console.log('hiVtit')
      const fontSize = 12;
      //textFont('monospace', fontSize);
      textFont('Courrier New', fontSize);
      const lineHeight = fontSize * 1.2;
      const margin = 10; // Margin between lines and edges
      
      const maxTextWidth = width - margin * 2; // Maximum text width
      const words = description.split(' '); // Split description into words
      console.log(words)
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
        fill(0, 102, 153);
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
function otherAssetPathChecker(_filename){
 if (window.location.href == 'http://localhost:8000/') {
  pathCheck = `assets/${_filename}`;
} else {
  pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/assets/${_filename}`;	
}
return pathCheck;
};

function preload() {
  // preload() runs once
  img = loadImage(imgPathChecker());
  geojson_1 = loadJSON(otherAssetPathChecker('constellation.json'));
  geojson_2 = loadJSON(otherAssetPathChecker('constellations_labels.json'));
}

function setup() {
  createCanvas(720, 720);
  background('black');
  noLoop();
}

function draw() {
push();
  translate(width/2, height/2); 
  //scale(1, -1);
  scale(1.6);
  let features = geojson_1.features;
  fill('#81b214');
  stroke('white');
  
  let array1 = [];    
  for (let i = 0; i < features.length; i++) {
      geom = features[i].geometry;
      polylines = geom.coordinates;
      coords = polylines[0];
      beginShape();
      // Iterate through the array of coordinates and add them to the shape
      for (let i = 0; i < coords.length; i++) {
        if (i<coords.length-1)
        {
          strokeWeight(0.1)
          let edge_len = calculateDistance(coords[i][0],  coords[i][1], coords[i+1][0],  coords[i+1][1]);
          array1.push(edge_len);
          if(edge_len<100){
            strokeWeight(0.3)
            line(coords[i][0],  coords[i][1], coords[i+1][0],  coords[i+1][1]);
            strokeWeight(1); 
            point(coords[i][0],  coords[i][1]);        
            point(coords[i+1][0], coords[i+1][1])
          }
        }
      };
      endShape();
  }
  let features2 = geojson_2.features;
  for (let i = 0; i < features2.length; i++) {
      geom = features2[i].geometry;
      coords = geom.coordinates;
      labels = features2[i].properties.name;
      display = features2[i].properties.display
      let fontSize = 5;
      textFont('monospace', fontSize);
      noStroke();
      text(labels, display[0],  display[1]);
    }

    pop();   
    scale(1);
    addDescription();
  };