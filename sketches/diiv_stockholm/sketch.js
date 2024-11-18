
let projName = 'diiv_stockholm';
let filenames = ['diiv1.mp4', 'diiv2.mp4', 'diiv3.mp4', 'diiv4.mp4', 'diiv5.mp4', 'diiv6.mp4'];
let cloudVideo, starsVideo, staticVideo, humanVideo;
let videos = [];
let outsideVideos;

let margin = 20;
let numOfScreensTall = 4;
let numOfScreensWide = 4;

let counter = 1;

function imgPathChecker(_filename) {
  if (window.location.href == 'http://localhost:8000/') {
    pathCheck = `assets/${_filename}`;
  } else {
    pathCheck = `https://raw.githubusercontent.com/thisAKcode/p5serve/master/sketches/${projName}/assets/${_filename}`;
  }
  return pathCheck;
}

/*
function preload() {
   
  for (let i = 0; i < filenames.length; i++) {
    let pathn = imgPathChecker(filenames[i]);
    videos.push(createVideo(pathn)); 
  }
}
*/



function setup() {
  frameRate(10);
  createCanvas(600, 500);
  /*
  // TODO: Load videos
  cloudVideo = createVideo(cloudPath);
  starsVideo = createVideo(starsPath);
  staticVideo = createVideo(staticPath);
  humanVideo = createVideo(humanPath);
  */

  // TODO: Populate videos array
  videos = [];
  for (let i = 0; i < filenames.length; i++) {
    let pathn = imgPathChecker(filenames[i]);
    
    videos.push(createVideo(pathn)); 
  }

  // TODO: Iterate over videos to loop, mute, and hide each one
  for (let i = 0; i < videos.length; i++) { 
    videos[i].volume(0);
    videos[i].loop();
    videos[i].hide();
  }
  // TODO: Populate outsideVideos array
  outsideVideos = [videos[1], videos[2], videos[3]]
}

function draw() {
  background(0);
  print(videos.length === 0)
  // Calculate the width and height for each "screen" in the grid
  let w = (width - margin * (numOfScreensWide + 1)) / numOfScreensWide;
  let h = (height - margin * (numOfScreensWide + 1)) / numOfScreensWide;
  humanVideo = videos[0]; 
  print('onyx',humanVideo); 

  // Create a 4x4 grid of screens with a margin of 20px
  for (let i = 0; i < numOfScreensWide; i++) { 
    for (let j = 0; j < numOfScreensTall; j++) {
    
      // Calculate current x, y position where this "screen" should be drawn
      let x = margin + i * (w + margin);
      let y = margin + j * (h + margin);
      
      // Draw a white rectangle to demonstrate where this "screen" is
      fill(255);
      rect(x, y, w, h);
      
      // TODO: Fill this "screen" with a video, according to its (i,j) position
    // image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
  let inTopLeft = i ===1 && j ===1;
  let inBotLeft = i ===1 && j ===2;
  let inTopRight = i === 2 && j===1;
  let inBotRight = i === 2 && j===2;
  
  if (inTopLeft){
    image(humanVideo, x, y, w, h, 0, 0, humanVideo.width/2, humanVideo.height/2);
  } else if (inBotLeft){
    image(humanVideo, x, y, w, h,0, humanVideo.height/2, humanVideo.width/2, humanVideo.height/2);
  } else if (inTopRight){
    image(humanVideo, x, y, w, h,humanVideo.width/2, 0, humanVideo.width/2, humanVideo.height/2);
  } else if (inBotRight){
    image(humanVideo, x, y, w, h,humanVideo.width/2, humanVideo.height/2, humanVideo.width/2, humanVideo.height/2);
  } else {
    let selectedIndex = (i + j * counter) % outsideVideos.length
    let selectedVideo = outsideVideos[selectedIndex];
    image(selectedVideo, x, y, w, h);
  }
    }
  }
}

// TODO: Make videos on the outside change when mouse is clicked
