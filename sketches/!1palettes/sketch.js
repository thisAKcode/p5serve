let palettes_nested = [
  ["#BFA77D", "#7A623C", "#8E8C97", "#816D6B", "#1C1B20", "#E0DDD4"],
  ["#FFFFFF", "#747A86", "#303133", "#FDE946", "333B30"],
  ["#D3BB99", "#6C6754", "#DD4622", "#5A1A0E", "#181310", "#F2EFE9"],
  ["#888483", "#862D29", "#202020", "#BF8F5F", "#647378", "#E3D4B3", "#DAB487", "333B30"],
  ["#5C1213", "#23342E", "#7D4047", "#2F2A24", "#57605F", "#2F0E29", "#30555D", "#20414A"],
  ["#125B86", "#880D21", "#880D21", "#F9BD7E", "#2B6141", "#307191", "#034B73", "#80409C", "#32133E"]
];

// Adjust colors in palettes2
palettes2 = palettes2.map(palette => palette.map(adjustColor));


function addDescription(){ 
      // Add description text
      let description = "My fine palettes. Nested loop makes a grid of squares that are 30 pixels apart horizontally and vertically. The modulo operator is used to cycle through the colors in a loop."
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


function setup() {
  let canvas = createCanvas(680, 720);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  noLoop();
  // nested loop
  // make a i by j grid of squares that are n pixels apart horizontally and k pixels vertically.
  // use the modulo operator to cycle through the colors in a loop
  let gridSize = 24;
  let stepSize = 24;
  let offsetX = (width - (gridSize - 1) * stepSize) / 2;
  let offsetY = (height - (gridSize - 1) * stepSize) / 2;
  noStroke(); // Remove the outline of each grid

  // Repeat the loop to copy the same rectangles 10 points to the left and up with 25% transparency
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let palette = palettes_nested[j % palettes_nested.length];
      let colorIdx = (i + j) % palette.length; // Reset cycle in inner palette
      let c = color(palette[colorIdx]);
      
      fill(c);
      rect(offsetX + i * stepSize, offsetY + j * stepSize, 20, 20);
    }
  
  

  }
  addDescription();
  // Save the canvas as a PNG file
  // saveCanvas('myCanvas.png', 'png');
    }

