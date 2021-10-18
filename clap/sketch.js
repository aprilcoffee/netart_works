function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  text("Loading the video...", 20, 20);
  
  vidElement = createVideo("002.mp4", afterLoad);
  vidElement.position(20, 20);
  vidElement.size(300);
}
  
function afterLoad() {
  text("The video has finished loading and will"+
                           " now play!", 20, 40);
  vidElement.play();
}
function draw(){
  
  
}