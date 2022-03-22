var airplane, airplaneImg;
var background, backgroundImg;
var runway, runwayImg;
var gameOver, gameOverImg;
var cargoBoxGroup,cargoBoxImg;
var geeseGroup,geeseImg;;
var gameState = "wait";
var button, buttonImg
var cargoBoxPosX
var waitingInLobbySound;
var gameOverSound
var playAgain;
var gameOver1, gameOver1Img;
var cargoBoxCollected = 0 
var enginesRunning = 4
var speedofAircraft = 480;
var restart, restartImg;
var airplaneCloudAnimation,airplaneCloudAnimationImg;
var airTraffic, airTrafficImg;
function preload(){
  airplaneImg = loadImage("airplane.png");
  cargoBoxImg = loadImage("cargoBox.png")
  //cargoBoxesImg = loadImage("cargoBoxes.png")
  geeseImg = loadImage("geese.png")
  buttonImg = loadImage("playButton.png")
  backgroundImg = loadImage("background.jpg")
  //waitingInLobbySound = loadSound("wait.mp3")
  runwayImg = loadImage("runway.png");
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.jpg")
  //gameOverSound = loadSound("lose.wav")
  airplaneCloudAnimationImg = loadImage("airplaneCloudAnimation.png")
  airTrafficImg = loadImage("airTraffic.jpg");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  //bg = createSprite(width/2,height/2);
  //bg.addImage(backgroundImg);
airplane = createSprite(250,380)
 airplane.addImage(airplaneImg);
 airplane.scale = 0.05;
airplane.visible = false;
airplane.debug=true;
gameOver = createSprite(width/2,height/2,width*1.5,height);
gameOver.addImage(gameOverImg);
gameOver.visible = false;
restart = createSprite(width/2,height/2 + 250,200,200);
  restart.addImage(restartImg);
  restart.scale = 0.05;
  restart.visible = false;
  //cargoBoxes = createSprite(40,272);
  //cargoBoxes.addImage(cargoBoxesImg);
  //cargoBoxes.scale = 0.4;
  button = createSprite(width/2-100,height/2,100,100);
  button.addImage(buttonImg);
  button.scale = 0.22;
  airplaneCloudAnimation = createSprite(200,150,20,20);
  airplaneCloudAnimation.addImage(airplaneCloudAnimationImg)
  airplaneCloudAnimation.scale = 0.5

  airTraffic = createSprite(1260,105,20,20);
  airTraffic.addImage(airTrafficImg);
  airTraffic.scale = 0.3;
  cargoBoxGroup = new Group();
  geeseGroup = new Group();
  rotateSprite(airTraffic);
 
}

function draw(){
//background("black");
 if(gameState==="wait"){
fill("blue")
textSize(50);
text("Airplane Simulator",width/2-250,height/2-150)
background(runwayImg)
button.visible = true;
airplaneCloudAnimation.visible = true;
airTraffic.visible = true;
gameOver.visible = false;
restart.visible = false;
//waitingInLobbySound.play();
//bg.addImage(backgroundImg);
  }
if(mousePressedOver(button) && gameState ==="wait"){
gameState = "play";
}
if(gameState ==="play"){
  button.visible = false;
  airplane.visible = true;
  spawnCargoBox();
  spawnGeese();
  image(backgroundImg,0,0,width*1,height);
  handlePlayerControls();
  fill("green");
textSize(12)
text("Number of Cargo Boxes Collected:" + " " + cargoBoxCollected,76,67);
fill("red");
textSize(12);
text("Number of Engines Still Running:" + " "  + enginesRunning,76,100);
   //background(background1Img);
   fill("blue");
   textSize(12);
   text("Speed of the Aircraft in Knots:" + " " + speedofAircraft,76,30);
  //bg.addImage(background1Img);
}
if(cargoBoxGroup.isTouching(airplane)){
cargoBoxCollected = cargoBoxCollected + 1;
speedofAircraft = speedofAircraft + 10;
airplane.velocityX += 0.5;
}
if(geeseGroup.isTouching(airplane)){
  enginesRunning = enginesRunning - 1;
  cargoBoxCollected = cargoBoxCollected - 1;
}
if(enginesRunning == 0){
  gameState = "end";
}
if(gameState === "end"){
  //gameOverSound.play();
  gameOver.visible = true;
  //geeseGroup.setVisibilityEach(false);
  //cargoBoxGroup.setVisibilityEach(false);
  cargoBoxGroup.destroyEach();
geeseGroup.destroyEach(); 
airplane.visible = false;
  restart.visible = true;
}
if(mousePressedOver(restart)){
  reset();
}

drawSprites();
}
function handlePlayerControls(){
  if(keyIsDown(RIGHT_ARROW)){
  airplane.x +=2;
  }
  if(keyIsDown(UP_ARROW)&& keyIsDown(RIGHT_ARROW)){
    airplane.x +=2;
    airplane.y -=2;
  }
  if(keyIsDown(DOWN_ARROW)){
    airplane.y -=-2;
  }
}

function spawnGeese(){
  if(frameCount % 100 ==0){
    geese = createSprite(width,200);
    geese.addImage(geeseImg);
   geese.scale = 0.04;
   geeseGroup.add(geese);
   geese.velocityX = -5;
   geese.depth = airplane.depth;
   airplane.depth = airplane.depth + 1;
   geese.lifetime = width/5
  }
}
function spawnCargoBox(){
  for(var i=50; i<width; i=i+300)
  {    
    cargoBox = createSprite(width,145);
    cargoBox.x = i;
    cargoBox.addImage(cargoBoxImg);
    cargoBox.scale = 0.04;
    cargoBoxGroup.add(cargoBox);
    cargoBox.depth = airplane.depth;
    airplane.depth = airplane.depth + 1;
  }
}
function reset(){
  gameState = "wait";
  gameOver.visible = false;
  restart.visible = false;
  
}

function rotateSprite(sprite) {
  sprite.rotation +=10;
}