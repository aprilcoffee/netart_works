var wait = [];
//var pos = 25;
var spread = 280;
var pos = 0;
var ppos = pos;

function setup() {
  createCanvas(window.innerWidth - 50, window.innerHeight - 50);
  background(255);
  for (var s = 0; s < 120; s++) {
    wait.push(new Wait(width / 2, -(12 * spread) + height / 2 + (s * spread), s % 12, s));
  }
}

function draw() {
  background(255);
  for (var s = 0; s < 120; s++) {
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
  pos += (ppos - pos) * 0.1;
}

function mouseWheel(event) {
  print("delta :" + event.delta + "\t pos :" + pos);
  //move the square according to the vertical scroll amount
  if (event.delta < 0) {
    if (event.delta*2 >= -spread)
      ppos -= event.delta*2;
    else
      ppos += spread;
  } else {
    if (event.delta*2 <= spread)
      ppos -= event.delta*2;
    else
      ppos -= spread;
  }
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
    if (this.orgY + D < 0) {
      this.y = - (((abs(this.orgY + D)) % (120 * spread)));
    } else {
      this.y = (this.orgY + D) % (120 * spread);
    }
    
    // if (this.y >= -(spread * 12) + height / 2 + 24 * spread) {
    //   this.y = -spread * 13;
    // } else if (this.y <= -spread * 13) {
    //   this.y = -(spread * 12) + height / 2 + 24 * spread;
    // }
  }
  this.show = function() {
    push();
    strokeWeight(10);
    translate(this.x, this.y);
    textSize(50);
    text(this.num, 0, 0);
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
/*
function touchMoved(){
	console.log(mouseY);
	pos += (mouseY-pmouseY);
}*/
function touchMoved(event) {
  return false;
}

function mouseDragged() {
  fill(0);
  //console.log(mouseX);

}