var spaceImg, space, player, playerImg, asteroid1, asteroid2, laser1, laserGroup, asteroidGroup, ammoImg, ammoGroup;
var score=0;
var PLAY=1;
var END=0;
var START=2;
var gameState=START;
var ammo=100;
var lives=1;
var wall;
function preload(){
  spaceImg=loadImage("spaceBg.jpg");
  playerImg=loadImage("astronautimg.jpg");
  asteroid1=loadImage("asteroid1.png");
  asteroid2=loadImage("asteroid2.jpg");
  laser1=loadImage("laser.jpg");
  ammoImg=loadImage("ammo.jpg");
}
function setup(){
  createCanvas(600,600);
  space=createSprite(300,300);
  player=createSprite(50,300,10,10);
  asteroidGroup=new Group();
  laserGroup= new Group();
  ammoGroup=new Group();
  wall=createSprite(0,300,2,600);
  space.velocityX=-5;
}
function draw(){
  space.addImage(spaceImg);
  player.addImage(playerImg);
  player.scale=0.4;
  
  
  if(gameState==START && keyDown("space")){
    gameState=PLAY;
  }
  
  if(gameState==PLAY){
    if(space.x<100){
       space.x=space.width/2;
       }
    if(keyDown("space")){
       bullets();
      ammo=ammo-1;
       }
    if(laserGroup.isTouching(asteroidGroup)){
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      score=score+10;
    
   }
    if(ammoGroup.isTouching(player)){
      ammo=150;
      ammoGroup.destroyEach();
    }
    
    if(keyDown("W")||keyDown(UP_ARROW)){
      player.y=player.y-8;
    }
    if(keyDown("S")||keyDown(DOWN_ARROW)){
      player.y=player.y+8;
    }
    score=Math.round(score+getFrameRate()/50); 
    asteroids();
    ammunition();
  
  if(ammo==0){
    gameState=END;
    textSize(20);
    text("Ammo Finished ",200,200);
  }
    if(asteroidGroup.isTouching(wall)){
      lives=lives-1;
    }
  
  if(lives==0){
    gameState=END;
    textSize(20);
    text("Lives Finished ",200,200);
  }
   
  }
  if(gameState==END){
    textSize(20);
    text("YOU LOST", 200,200);
  }
  drawSprites();
  text("Lives: "+lives,500,100);
      text("Score: "+score,500,50);
      text("Ammo: "+ammo,500,75);

}  
function asteroids(){
  if(World.frameCount%80==0){
    var r=Math.round(random(1,2));
    if(r==1){
    var asteroid3=createSprite(620,random(100,500),10,10);  
    asteroid3.velocityX=-6;
    asteroid3.addImage(asteroid1);
    asteroid3.scale=0.1;
    asteroidGroup.add(asteroid3);
    asteroid3.lifetime=120;
    }
    else if(r==2){
    var asteroid4=createSprite(620,random(100,500),10,10); 
    asteroid4.addImage(asteroid2);
    asteroid4.scale=0.3;
    asteroid4.velocityX=-6;
    asteroidGroup.add(asteroid4)
    asteroid4.lifetime=120;
    }
  }
    }

function ammunition(){
  if(World.frameCount%1200==0){
  var ammoBox=createSprite(620,random(100,500),10,10);
  ammoBox.velocityX=-6;
    ammoBox.lifetime=120;
  ammoBox.addImage(ammoImg);
  ammoGroup.add(ammoBox);
    ammoBox.scale=0.3;
}   
}

function bullets(){
   var bullet=createSprite(player.x,player.y,10,10);
  bullet.addImage(laser1);
  bullet.velocityX=12;
  laserGroup.add(bullet);
}

  
  
  


