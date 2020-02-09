var wait = [];
var pos = 25;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  for (var s = 0; s < 108; s++) {
    wait.push(new Wait(width / 2, height / 2 + s * height/2, s%12));
  }
}

function draw() {
  background(255);
  for (var s = 0; s <108; s++) {
    wait[s].update(pos);
    wait[s].show();
  }
  strokeWeight(1);
  stroke(200);
  var loc = 200;
  line(width/2+loc,height/2-loc,width/2+loc-30,height/2-loc)
  line(width/2+loc,height/2-loc,width/2+loc,height/2-loc+30)
  line(width/2-loc,height/2+loc,width/2-loc+30,height/2+loc)
  line(width/2-loc,height/2+loc,width/2-loc,height/2+loc-30)
  
}
function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  pos -= event.delta;
  //uncomment to block page scrolling
  //return false;
}

function Wait(A, B, C) {
  this.orgY =B;
  this.x = A;
  this.y = B;
  this.flag = C;
  this.update = function(D) {
    this.y = this.orgY+D;
  }
  this.show = function() {
    push();
    strokeWeight(10);
    translate(this.x, this.y);
    rotate(radians(30 * this.flag))
    for (var s = 0; s < 12; s++) {
      rotate(radians(-30));
      var colorFlag = map(s, 0, 12, 100, 280);
      if (colorFlag < 0) colorFlag = 0;
      stroke(colorFlag);
      noFill();
      line(0, 50, 0, 100);
    }
    pop();
  }
}
function touchMoved(event){
	console.log(event);
		return false;
}
