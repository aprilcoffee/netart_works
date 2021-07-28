let backGroundColorTop;
let backGroundColorDown;
let backGroundColorGradient;
let myFont;

let system;

let camTarget;
function preload(){
	myFont = loadFont ('assets/sans.otf');

}
function setup() {
	const canvasElt = createCanvas(400,600,WEBGL).elt;
	canvasElt.style.width='100%', canvasElt.style.height='100%';
	//	createCanvas(displayWidth, displayHeight, WEBGL);
  	backGroundColorTop = loadImage("img/oceanAbove.jpg");
  	backGroundColorDown = loadImage("img/oceanBelow.jpg");
  	backGroundColorGradient = loadImage("img/oceanBackground.jpg");
	textFont(myFont);
	system = new ParticleSystem(createVector(0,5,10));
	//system = new particle

	camTarget=createVector(0,0,0);
}

function draw() {
	background(0);
	//fill(255);
	//text('p5*js', 10, 50);

	fill(0,0,0,0);
	//let angleX = map(mouseX,0,displayWidth,-179,179);
	//let angleZ = map(mouseY,0,displayHeight,-45,45);
	let angle_t = map(constrain(pRotationX,0,180),0,180,89,-89);
	let angle_a = map(constrain(pRotationY,0,180),0,180,-89,89);
	let fixR = 100;

	let camX = fixR*cos(radians(angle_a))*cos(radians(angle_t));
	let camY = fixR*sin(radians(angle_t));
	let camZ = fixR*sin(radians(angle_a))*cos(radians(angle_t));
	camTarget=createVector(camX,camY,camZ);
	camera(0, 0, 0, camX, camY,camZ, 0, 1, 0);

	system.show();
	push();
	translate(0,5,5);
	textSize(12);
	fill(255);
	text(pRotationX,0,-10);
	text(pRotationY,0,0);
	text(pRotationZ,0,10);

	pop();

	texture(backGroundColorGradient);
	textureMode(NORMAL);
	noStroke();
	translate(500,0);
	sphere(1000);

	//shakeCheck();
}

function touchEnded(){
	var spk = new p5.Speech();
	var currentText = char(int(97+random(26)));
	system.add(camTarget,currentText);
	spk.speak(currentText);
}

function shakeCheck() {

  var shakeThreshold = 50;
  accX = abs(accelerationX - pAccelerationX);
  accY = abs(accelerationY - pAccelerationY);
  accT = accX + accY;
  // If shake
  if (accT >= shakeThreshold) {
		  var spk = new p5.Speech();
		  var currentText = char(int(97+random(26)));
		  system.add(camTarget,currentText);
		  spk.speak(currentText);
  }
  // If not shake
  else {
  }
}


//particles behavior
//***************************
let Particle = function(_position,_showChar){
	this.acc = createVector(0,-0.005,0);
	this.vel = createVector(random(-0.3,0.3),random(-0.1,0),0);
	this.pos = _position.copy();
	this.lifespan = 255;
	this.showChar = _showChar;
}
Particle.prototype.run=function(){
	this.update();
	this.display();
}
Particle.prototype.update=function(){
	this.vel.add(this.acc);
	this.pos.add(this.vel);
	this.lifespan-=1.1;
}
Particle.prototype.display=function(){
	fill(255);
	noStroke();
	push();
	translate(this.pos.x,this.pos.y,this.pos.z);
	textSize(this.lifespan/10);
	text(this.showChar,0,0);
	pop();
}
Particle.prototype.isDead = function(){
	return this.lifespan < 0;
}
//****************************



//Particle system arraylist
//**************************
let ParticleSystem = function(_position){
	this.origin = _position.copy();
	this.particles=[];
}
ParticleSystem.prototype.add=function(_target,_showChar){
	this.particles.push(new Particle(_target,_showChar));
}
ParticleSystem.prototype.show=function(){
	for (let i = this.particles.length-1;i>=0;i--){
		let p = this.particles[i];
		p.run();
		if(p.isDead()){
			this.particles.splice(i,1);
		}
	}
}
//***************************
//arraylist init ended


//Prevent mouse dragging event
function touchMoved(event){
	console.log(event);
	return false;
}
