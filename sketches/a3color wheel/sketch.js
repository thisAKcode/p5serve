let colors = [];
let colors2 = []
let t = 10
let rez = 0.1        
        function setup() {
          createCanvas(400, 400);
          colorMode(HSB);
          noStroke();
          for (let i = 0; i < 360; i++) {
            colors[i] = color(i, 100, 100);
          }
		  for(i = 0; i < 360; i++){
              for(j = 360; j > 0; j--){
              var n = noise(i*rez,j*rez, t)
              var n1 = noise(j*rez, t, i*rez)
              var n2 = noise(t,j*rez,i*rez)

			  colors2[i] = color(n*255, n1*255, n2*255);
		  }}
		}
          
        function draw() {
          translate(width / 4, height / 4);
          for (let i = 0; i < 360; i++) {
            fill(colors[i]);
            let angle = map(i, 0, 360, 0, TWO_PI);
            let x = 100 * cos(angle);
            let y = 100 * sin(angle);
            arc(0, 0, 200, 200, angle, angle + TWO_PI / 360);
          }
		  
		  translate(width / 2, height / 2);
          for (let i = 0; i < 360; i++) {
            fill(colors2[i]);
            let angle = map(i, 0, 360, 0, TWO_PI);
            let x = 100 * cos(angle);
            let y = 100 * sin(angle);
            arc(0, 0, 200, 200, angle, angle + TWO_PI / 360);
          }
        }