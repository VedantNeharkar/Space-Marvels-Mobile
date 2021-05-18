var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage,Earth;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var win = 3;

var earth;
var gameState = instruction;
var endline,canvas;
var bigasteroid1,bigasteroid2,bigasteroid3;
var winImage,win;
var endlineImage;
function preload() {
  spaceImage = loadImage("Sprite_background_effects_0009.png");
  spaceShipImage = loadImage("Spaceship.png");
  laserImage = loadImage("laser-unscreen.gif");
  asteroid1 = loadImage("asteroid.png");
  asteroid2 = loadImage("asteroid.png");
  asteroid3 = loadImage("asteroid.png");
  blastImage = loadImage("blst.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
  endlineImage = loadImage("earth.gif");
  
 

}

function setup() {  
  canvas = createCanvas(2000,1000);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);
  space.scale = 16;


  endline = createSprite(950,1650,1000,5);
  
  endline.addImage(endlineImage);
  endline.scale = 6;

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 1;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  laserGroup = new Group;
  
  
}

function draw() {
  background(0);

  if(gameState === play) {

    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -10; 
      laser.scale = 1.4;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 2000) {
      spaceShip.x = spaceShip.x + 20;
      p1.x = p1.x + 20;
      p2.x = p2.x + 20;
    }

    if(keyDown("left") && spaceShip.x > 10) {
      spaceShip.x = spaceShip.x - 20;
      p1.x = p1.x - 20;
      p2.x = p2.x - 20;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      //spaceShip.destroy();
      spaceShip.visible = false;
      gameState = end;
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 5;
    }

    asteroids();
    drawSprites();
    
    stroke("white");
    textFont("Apple Chancery");
    fill("white");
    textSize(50);
    text("Score :  " + score,canvas.width/2+300,60);
    text("Target : 100" , canvas.width/2,60);



    if(score === 50 && gameState==play){
      
      textFont("Menlo");
      text("50 Points Earned, 50 to win",500,900);
      
    }


    if(score === 10 && gameState==play){
      
      textFont("Menlo");
      text("10 Points Earned , 90 to win",500,900);
      
    }
    if(score === 20 && gameState==play){
      textFont("Menlo");
      text("20 Points Earned , 80 to win",500,900);
      
    }
    if(score === 30 && gameState==play){
      
      textFont("Menlo");
      text("30 Points Earned , 70 TO WIN",500,900);
      

    }
    if(score === 40 && gameState==play){
      
      textFont("Menlo");
      text("40 Points Earned , 60 TO WIN",500,900);
      
    }
    if(score === 70 && gameState==play){
      
      textFont("Menlo");
      text("70 Points Earned , 30 TO WIN",500,900);
      
    }
    if(score === 80 && gameState==play){
   
      textFont("Menlo");
      text("80 Points Earned , 20 TO WIN",500,900);
      
    }
    if(score === 90 && gameState==play){
    
      textFont("Menlo");
      text("90 Points Earned , 10 TO WIN",500,900);
      
    }
    if(score === 95 && gameState==play){
      
      textFont("Menlo");
      text("95 Points Earned , 5 TO WIN",500,900);
      
    }

    if(score === 10){
      gameState = win;
    }

    
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(60);
    textFont("Menlos");
    
    text("GAME OVER!",canvas.width/2-200,canvas.height/2-400);
    text("The asteroids destroyed the planet, You gave your best! ",canvas.width/2-600,canvas.height/2-300);
    text("Your final score:   "+score,canvas.width/2-600,canvas.height/2-250);
    

    /*if(keyDown("s")){
      gameState = play;
      space = createSprite(250,350,30,20);
      space.addImage(spaceImage);
      space.velocityY = (5 + score/10);
      space.scale = 16;
    
    spaceShip.x = 250;
    spaceShip.y = 600;
    }*/
    
    

  
  }



if(gameState === end && keyDown("v") ){
  gameState = play;
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);
  space.scale = 16;

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 1;

  
  endline = createSprite(950,1650,1000,5);
  
  endline.addImage(endlineImage);
  endline.scale = 6;

  score = 0;

}

  if(gameState === instruction) {
    stroke("white");
    fill("Aqua");
    textFont("Menlo")
    textSize(90);
    
    text(".....Space Marvels....",590,canvas.height/2-400);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+350);
    stroke("yellow");
    fill("yellow");
    textSize(65);
    textFont("Apple Chancery");
    text("Help!",980,canvas.height/2-320);
    text("Click Me",)
    fill("Blue");
    stroke("green");
    
    text(" Some asteroids are coming towords Earth.",canvas.width/2-430, canvas.height/2 - 250);
    
    fill("Red");
    text("  You are the famous Marvel's guardians of the galaxy",canvas.width/2-560,canvas.height/2-180);
    text("  Help the people and Earth !",canvas.width/2-300,canvas.height/2-110);
    
    fill("lightgreen")
    textFont("Apple Chancery");
    
    text("How to play :" ,canvas.width/2-100,canvas.height/2-25)
    text("  ➡Use right and left arrows to move.",canvas.width/2-300,canvas.height/2+155);
    text("  ➡Press 'Space' to shoot",canvas.width/2-300,canvas.height/2+95);
    text("  ➡Press 's' to start game.",canvas.width/2-300,canvas.height/2+35);
    
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }





  }


  if(gameState === win){

   



    stroke("white");
    fill("white");
    textSize(45)
    textFont("Apple Chancery");
    text("GAME OVER!",canvas.width/2-200,100);
    text("The spaceship destroyed the asteroid, You gave your best! ",canvas.width/2-500,300);
    text("Your final score:"+score,canvas.width/2-200,550);

    textFont("Apple Chancery")
    textSize(40);
    text("You won the game!",canvas.width/2-200,650);
    text("Press 'S' TO PLAY ", canvas.width/2-200,750);
    stroke("yellow");
    fill("yellow");

        

 



    if(keyDown("s") && gameState == win || gameState == end){
      gameState = play;
     score = 0;
    }
    
    //game Over = 500,100
// you won = 100,400
// asteroids.... = 100,500
//final = 100,600
  
  }
}
  

function asteroids() {
  if(frameCount % 100 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1950)),-20);
    asteroid.velocityY = (3 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.7,0.9);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }

  function asteroids() {
    if(frameCount % 200 === 0) {
    
      var bigasteroid = createSprite(Math.round(random(50,1950)),-20);
      bigasteroid.velocityY = (3 + score/10);
      bigasteroid.lifetime = 200;
      bigasteroid.scale = score/2-44;
      //asteroid.debug = true;
  
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: bigasteroid.addImage(asteroid1);
                bigasteroid.setCollider("circle",-80,10,160);
                break;
        case 2: bigasteroid.addImage(asteroid2);
                bigasteroid.setCollider("circle",50,0,150);
                break;
        case 3: asteroid.addImage(asteroid3);
                asteroid.setCollider("circle",0,0,170)
        default: break;
      }
      
      //console.log(asteroid.x);
      asteroidGroup.add(asteroid);
    }

  }
}

