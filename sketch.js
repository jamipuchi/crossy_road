function setup() {
	createCanvas(400, 600);
  roadstrips = []
  speed = 0.5
  px=200
  py=400
  score = 0
  playing = true
	for (i = 14; i >= -1; i--) {
		a = []
		for (j = 0; j < 10; j++) {
			a.push(0)
		}
		roadstrips.push({
			y: i * 40,
			strip: a
		})
	}
}

function draw() {
  if (playing){
    background(220);
  	noStroke()
  	for (i = 0; i < roadstrips.length; i++) {
  		for (j = 0; j < 10; j++) {
  			if (roadstrips[i].strip[j] == 0) {
  				fill(255)
  			}
  			if (roadstrips[i].strip[j] == 1) {
  				fill(130)
  			}
  			if (roadstrips[i].strip[j] == 2) {
  				fill(0)
  			}
  			rect(j * 40, roadstrips[i].y, 40, 40)
  		}
  		roadstrips[i].y += speed
  	}
  	fill(255,0,0)
  	ellipse(px+20,py+20,30,30);
  	py+=speed
  	if (roadstrips[0].y > height){
  		generateStrip()
      score+=0.2
  	}
    fill(0)
    text(Math.floor(score), 30,30)
  	speed = 0.47*frameCount/1000 + 100/py
    if(py>height-40) playing = false
  }else{
    background(255, 0,0)
    textAlign(CENTER)
    fill(255)
    text('RETRY',width/2, height/2)
  }
}

function generateStrip() {
	r = Math.floor(random(3))
	console.log(r)
	a = []
	if (r == 0) {
		for (i = 0; i < 10; i++) {
			if (random(2) < 1) a.push(0)
			else a.push(2)
		}
	}
	if (r == 1) {
		for (i = 0; i < 10; i++) {
			if (random(5) < 1) a.push(1)
			else a.push(0)
		}
	}
	if (r == 2) {
		for (i = 0; i < 10; i++) {
			if (random(5) < 1) a.push(2)
			else a.push(0)
		}
	}
	last=roadstrips[roadstrips.length-1].y-40
	roadstrips.push({
		y:last,
		strip: a
	})
	roadstrips.shift()
}

function keyPressed() {
		if(keyCode == UP_ARROW){
			if(roadstrips[roadstrips.length-Math.floor(py/40)-1].strip[Math.floor(px/40)]==0 && py>40) py -= 40
		}
		if(keyCode == DOWN_ARROW){
			if(roadstrips[roadstrips.length-Math.floor(py/40)-3].strip[Math.floor(px/40)]==0 && py>40) py += 40
		}
		if(keyCode == RIGHT_ARROW){
			if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)+1]==0 && px<width-40){
				px += 40
			}
		}
		if(keyCode == LEFT_ARROW){
			if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)-1]==0 && px>=40){
				px -= 40
			}
		}
}

function mouseClicked(){
  if(!playing){
    setup()
  }
}
