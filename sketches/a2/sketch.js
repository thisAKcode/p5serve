let img; // Declare variable 'img'.

function setup() {
  createCanvas(720, 400);
  img = loadImage('./assets/image_1.jpg');
  //img = loadImage('https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3BlbiUyMHNvdXJjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'); // Load the image
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height / 2, img.width / 2, img.height / 2);
}
