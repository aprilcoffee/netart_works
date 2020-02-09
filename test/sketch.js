let backGroundColorTop;
let backGroundColorDown;
let backGroundColorGradient;
let myFont;

let system;

let camTarget;

let pStatus = 'none';
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

	push();	
	translate(0,5,5);
	textSize(12);
	fill(255);
	text(pRotationX,0,-10);
	text(pRotationY,0,0);
	text(pRotationZ,0,10);
	text(pStatus,0,20);

	pop();

	texture(backGroundColorGradient);
	textureMode(NORMAL);
	noStroke();
	translate(500,0);
	sphere(1000); 

	//shakeCheck();  
}
navigator.permissions.query({name:'accelerometer'}).then(function(result) {
  if (result.state === 'granted') {
		  console.log('granted');
		  pStatus = 'granted';
  } else if (result.state === 'prompt') {
		  console.log('prompt');
		  pStatus = 'prompt';
  }else{
		console.log('denied');
		  pStatus = 'denied';
  }
  // Don't do anything if the permission was denied.
});
window.addEventListener('devicemotion', function(e){
	console.log(e);
}
)

function touchEnded(){
	var spk = new p5.Speech();
	var currentText = char(int(97+random(26)));
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

//Prevent mouse dragging event
function touchMoved(event){
	console.log(event);
	return false;
}
