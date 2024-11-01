let c0 = [[255, 0, 0],
  [255, 165, 0],
  [255,255,0],
  [0,255,0],
  [0,127,255],
  [35, 48, 103],
  [139,0,255]
];
var img1;
var img2;

function imgPathChecker(_img) {
  let pathCheck;
  const projName = 'juxtapose'; // Define projName
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = `assets/${_img}.JPG`;
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/assets/${_img}.JPG`;
  }
  return pathCheck;
}
function preload() {
  img1 = loadImage(imgPathChecker('image'), img => {
    imgClone = img.get();
    img.loadPixels();
    imgClone.loadPixels();
  });
  img2 = loadImage(imgPathChecker('v_and_f'), img => {
    imgClone = img.get();
    img.loadPixels();
    imgClone.loadPixels();
  });
}



function setup() {
  let canvas = createCanvas(680, 720);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  noLoop();
  const hardcodeX = 100;
  const hardcodeY = 100;

  var stepX = width / 1.5;
  var stepY = height / 3;
  tint(255, 128); // Apply transparency to the image (128 is 50% opacity)
  image(img1, 100, 0, 620, 800)
  for (var gridY = 0; gridY < height; gridY += stepY + hardcodeY) {
    for (var gridX = 0; gridX < width; gridX += stepX + 100) {
      tint(255, 128); // Apply transparency to the image (128 is 50% opacity)
      image(img2, gridX / 2, gridY * 2, stepX, stepY);
    }
  }
  img1.loadPixels();  // Load the image pixels

  // Draw the filtered image in the cell
}
