var wait = [];
//var pos = 25;
var spread = 280;
var pos = -280 * 6;
var fixed_pos = pos;
var ppos = pos;
var currentColor = 255;
var speed = 0;
var rolling = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  for (var s = 0; s < 480; s++) {
    wait.push(new Wait(width / 2, //-(12 * spread) +
      (s * spread), s % 12, s));
  }
}

function draw() {
  //console.log(pos);
  background(255);
  for (var s = 0; s < 480; s++) {
    wait[s].update(pos);
    wait[s].show();
  }
  strokeWeight(3);
  stroke(200);
  var loc = 200;
  //line(width/2+loc,height/2-loc,width/2+loc-50,height/2-loc);
  //line(width/2+loc,height/2-loc,width/2+loc,height/2-loc+50);
  //line(width/2-loc,height/2+loc,width/2-loc+50,height/2+loc);
  //line(width/2-loc,height/2+loc,width/2-loc,height/2+loc-50);
  pos += (ppos - pos) * 0.5;
}

function mouseWheel(event) {
  print("delta :" + event.delta + "\t pos :" + pos);
  // if (speed >= spread) {
  //   currentColor = 0;
  //   speed *= 0.9;
  //   if (event.delta < 0) {
  //     ppos -= event.delta;
  //     ppos = int(ppos / spread) * spread;
  //     currentColor = 0;
  //   } else {
  //     ppos -= event.delta;
  //     ppos = int(ppos / spread) * spread;
  //     currentColor = 0;
  //   }
  // }
  //move the square according to the vertical scroll amount
  //else {

  speed = event.delta;

  //Site Going Up
  //event.Delta < 0
  if (event.delta < 0) {
    if (-event.delta < spread) {
      ppos -= event.delta;
      currentColor = map(-event.delta, 0, -spread, 255, 0);
    } else {
      ppos += spread;
      ppos = int(ppos / spread) * spread;
      currentColor = 255;
    }
  }

  //Site Going Down
  //event.Delta > 0
  else if (event.delta > 0) {
    if (event.delta < spread) {
      ppos -= event.delta;
      currentColor = map(event.delta, 0, spread, 255, 0);
    } else {
      ppos -= spread;
      ppos = int(ppos / spread) * spread;
      currentColor = 255;
    }
  }
  // }
  //uncomment to block page scrolling
  //return false;
}

function Wait(A, B, C, E) {
  this.orgY = B;
  this.x = A;
  this.y = B;
  this.flag = C;
  this.num = E;
  this.update = function(D) {
    this.y = this.orgY + D;
    if (pos - this.orgY <= -12 * spread) {
      //       this.orgY = pos + this.orgY;
    }
    // if (this.orgY + D < 0) {
    //   this.Y = - (((abs(this.orgY + D)) % (120 * spread)));
    // } else {
    //   this.Y = (this.orgY + D) % (120 * spread);
    // }

    // if (this.y > -(spread * 12) + height / 2 + 24 * spread) {
    //   this.orgY = -spread * 13;
    // } else if (this.y < -spread * 13) {
    //   this.orgY = -(spread * 12) + height / 2 + 24 * spread;
    // }
  }
  this.show = function() {
    push();
    strokeWeight(10);
    translate(this.x, this.y + height / 2);
    textSize(50);
    text(this.num, 0, 0);
    text(this.orgY, 200, -50);
    text(this.y, 200, 50);
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

function touchMoved(){
	console.log(mouseY-pmouseY);
	ppos += (mouseY-pmouseY);
}
// function touchMoved(event) {
//   return false;
// }

function mouseDragged() {
  fill(0);
  //console.log(mouseX);

}