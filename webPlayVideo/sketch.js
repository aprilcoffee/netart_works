let playing = false;
let videoIntro;
let videoCam;
let startButton;
let skipButton; //for testing
let CamButton_Yes;
let CamButton_No;
let capture;

let counter = 0 ;
let forceOpen = false;
let forceClose = false;

let firstVideoPlaying = false;
let camOpened = false;

function setup() {

	//button = createButton('play');
	//button.mousePressed(toggleVid); // attach button listener
	createCanvas(displayWidth, displayHeight,WEBGL);
	frameRate(30);
	// specify multiple formats for different browsers
	videoIntro = createVideo(['assets/video1_720.mp4']);
	videoIntro.onended(firstVideoDone);
	videoIntro.hide();

	videoCam = createVideo(['assets/video2_720.mp4']);
	videoCam.hide();

	startButton = createButton('Start');
	startButton.size(100, 100)
	startButton.position(width / 2 - 50, height / 2 - 50);
	startButton.mousePressed(startFirstVideo);

	skipButton = createButton('Skip')
	skipButton.position(0, 0);
	skipButton.mousePressed(skipFirstVideo);
}

function skipFirstVideo() {
	videoIntro.time(240);
}

function startFirstVideo() {

	firstVideoPlaying = true;
	videoIntro.play();
	startButton.hide();

}

function firstVideoDone() {
	firstVideoPlaying = false;

	videoCam.play();
	videoCam.loop();

	counter = frameCount;
	CamButton_Yes = createButton('Yes');
	CamButton_Yes.size(100, 100)
	CamButton_Yes.position(width / 2 - width / 5, height / 2);
	CamButton_Yes.mousePressed(camOpen);

	CamButton_No = createButton('No');
	CamButton_No.size(100, 100)
	CamButton_No.position(width / 2 + width / 5, height / 2);
	CamButton_No.mousePressed(camClose);
}

function camOpen() {
	CamButton_Yes.hide();
	CamButton_No.hide();

	capture = createCapture(VIDEO);
	capture.hide();
	camOpened = true;
}

function camClose() {
	forceClose = true;
	CamButton_Yes.hide();
	CamButton_No.hide();
}

function draw() {
	background(0);
	translate(-width/2,-height/2)
	if (firstVideoPlaying == true)
		image(videoIntro, 0, 0, displayWidth, displayHeight);
	else {
		if(frameCount - counter >= 300 && camOpened==false && forceOpen==false && forceClose!=true){
			forceOpen = true;
			camOpen();
		}
		image(videoCam, 0, 0, width, height);

		if (camOpened == true) {
			beginShape();
			texture(capture);
			textureMode(NORMAL);
			vertex(0.0375 * width, 0.73888886 * height, 0, 0);
			vertex(0.22083333 * width, 0.632963 * height, 1, 0);
			vertex(0.22239584 * width, 0.84814817 * height, 1, 1);
			vertex(0.0375 * width, 1.3 * height, 0, 1);
			endShape();
			image(capture, 0.08385417 * width, 0.3074074 * height, 0.042708337 * width, 0.07222223 * height);
			image(capture, 0.21354167 * width, 0.33333334 * height, 0.016145825 * width, 0.018518507 * height)
			image(capture, 0.3671875 * width, 0.3425926 * height, 0.051041663 * width, 0.032407403 * height);
			image(capture, 0.4796875 * width, 0.2361111 * height, 0.11822915 * width, 0.10092592 * height);
			image(capture, 0.49791667 * width, 0.38703704 * height, 0.06145832 * width, 0.07222223 * height);
			image(capture, 0.61927086 * width, 0.43055555 * height, 0.06718749 * width, 0.08055559 * height);
			image(capture, 0.65625 * width, 0.032407407 * height, 0.11250001 * width, 0.082407415 * height);
			image(capture, 0.8453125 * width, 0.042592593 * height, 0.09895837 * width, 0.05833333 * height);
			image(capture, 0.92864585 * width, 0.325 * height, 0.057291627 * width, 0.08425927 * height);
			image(capture, 0.85260415 * width, 0.51111114 * height, 0.056250036 * width, 0.059259236 * height);
			image(capture, 0.52135414 * width, 0.84444445 * height, 0.18020838 * width, 0.14259261 * height);
			image(capture, 0.35625 * width, 0.8435185 * height, 0.07291669 * width, 0.052777827 * height);
		}
	}
}
