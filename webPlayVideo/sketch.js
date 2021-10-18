let playing = false;
let video;
let button;
let capture;

function setup() {
	createCanvas(displayWidth, displayHeight);
	// specify multiple formats for different browsers
	video = createVideo(['assets/testvideo.mp4']);
	video.hide()
  video.play();
	video.loop();

	capture = createCapture(VIDEO);
	capture.hide();
	// button = createButton('play');
	// button.mousePressed(toggleVid); // attach button listener
}

// plays or pauses the video depending on current state
function toggleVid() {
	if (playing) {
		video.pause();
		button.html('play');
	} else {
		video.loop();
		button.html('pause');
	}
	playing = !playing;
}

function draw() {
	background(0);
	image(video, 0, 0, displayWidth, displayHeight); // draw the video frame to canvas
  image(capture, 0, 0, width, width * capture.height / capture.width);
}
