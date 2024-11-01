let yOff = 10; // Noise offset
let funcT = 'sin';
function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  //background(220);
  background(237, 237, 217);

  // Set up the parameters for the curve
  let amplitude = 25; // Amplitude of the sine curve
  let frequency = 0.1; // Frequency of the sine curve
  let distortion = 100; // Amount of distortion
  let spacing = 30; // Spacing between parallel curves
  let shuffler = 1; 
  for (let y = height*0.3; y < 0.5+height/0.7; y += spacing) {
    fill(0,0,100,40)
    beginShape();
    shuffler = random() < 0.5; 
    for (let x = 0; x < width/1.3; x++) {
      // Calculate the x position on the distorted curve
      let distortionAmount = map(noise(x * 0.01, yOff), 0, 1, -distortion*random()*100, distortion*485*random());
      let distortedX = x + distortionAmount;

      // Calculate the y position on the sine curve
      let sinY = sin(distortedX * frequency) * amplitude;
      let cosY = cos(distortedX * frequency) * amplitude;
      // Add the vertex to the shape
      /*
      if (random() <0.5){
      vertex(x, y + sinY);
      }
      else{
        vertex(x, y + cosY);
      }

      if (shuffler) {
      vertex(x,y + sinY)
      }
      else { 
      vertex(x,y + cosY)
      }

      */

      vertex(x,y + sinY)
    }
    endShape();
  }

  // Update the noise offset
}