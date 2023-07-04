let img; // Declare variable 'img'.
let projName = 'a2';
let pathCheck;

function imgPathChecker() {
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = 'images/image.JPG';
  } else {
    pathCheck = 'https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/images/image.JPG'; // message = `Hello, ${name}! You are ${age} years old.`;
  }
  return pathCheck 
}

function setup() {
  createCanvas(720, 400);
  //C:\p5serve\sketches\a2
  //console.log(process.cwd())
  let pathCheck = 'images/image.JPG';
  if (window.location.href == 'http://localhost:8000/') {
    console.log('local file')
  //  block of code to be executed if the condition is true
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/images/image.JPG`; // message = `Hello, ${name}! You are ${age} years old.`;
  //  block of code to be executed if the condition is false
  }
  pathCheck = imgPathChecker()
  console.log('here I am',window.location.href);
  img = loadImage(pathCheck);
  //img = loadImage('https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/a2/images/image.JPG'); 
  //img = loadImage('https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3BlbiUyMHNvdXJjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'); // Load the image
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height / 2, img.width / 2, img.height / 2);
}
