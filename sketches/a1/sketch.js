let c0 = [[255, 0, 0],
  [255, 165, 0],
  [255,255,0],
  [0,255,0],
  [0,127,255],
  [35, 48, 103],
  [139,0,255]
];

function addDescription(){ 
      // Add description text
      let description = "Nested loop makes a 10 by 10 grid of circles that are 50 pixels apart horizontally and 50 pixels vertically. The modulo operator used to cycle through the colors in a loop."
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
  let canvas = createCanvas(680, 780);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  noLoop();
  // nested loop
  // make a 10 by 10 grid of circles that are 50 pixels apart horizontally and 50 pixels vertically.
  // use the modulo operator to cycle through the colors in a loop
  let colorIdx = 0;
  for(let i = 0; i <10 ; i++){
    for(let j = 0; j < 10; j++){
      let colorIdx = i % c0.length;
      fill(color(c0[colorIdx]));
      circle((i+2)*50, (j+2)*50, 20)
    }
  }
  addDescription();
    }

