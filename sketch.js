var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg,restartImg;
 var  gameOver,restart;

var monkey , monkey_running,monkey_running2;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var BG,BGimage;
var score;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  BGimage = loadImage("Screenshot (42).png");

  monkey_running2 = loadImage("sprite_0.png");
  
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  
  
}



function setup() {

  
   BG = createSprite(200,200);
  BG.addImage(BGimage);
  BG.scale = 0.50;
 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  
  gameOver = createSprite(200,90);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  
  restart = createSprite(190,190);
  restart.addImage(restartImg);
  restart.scale = 0.4;
  
 foodGroup = createGroup();
  obstacleGroup = createGroup();
  
 
   
  
  score= 0;
  
}


function draw() {
 background("white");
 
  
  
  
  
  
  if(gameState === PLAY){
   
    if(keyDown("space")&& monkey.y >=200) {
       monkey.velocityY = -13;
    }
    
    gameOver.visible = false;
  restart.visible = false;
   
 if(foodGroup.isTouching(monkey)) {
   foodGroup.destroyEach();
      
    
   score = score+2;}
  }
 
  
  if(obstacleGroup.isTouching(monkey)){
            gameState = END;
   monkey.scale =0.1;
   
    
  }
  
   else if (gameState === END) {
  
     ground.velocityX =0;
     
    
     if(mousePressedOver(restart)) {
      reset();
    }
     
 
    ground.velocityX = 0;
      monkey.velocityY = 0;
   
     
     gameOver.visible = true;
  restart.visible = true;
     
     obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0); 
     
      foodGroup.destroyEach();
     
   }
 ground.visible = false;
  
  monkey.velocityY = monkey.velocityY + 0.9;
   monkey.collide(ground);
  
  spawnfood();                                        
   spawnObstacles();
  
  ground.x = ground.width/2;
  console.log(ground.x)
 
  
 
  
  
  drawSprites();
textSize(20);
  fill("white");
  text("Score:"+ score,320,30); 
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = true;
  restart.visible = true;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);
   score =0;
  monkey.visible = true;
  
}

function spawnfood() {
 
   if (frameCount % 80 === 0) {
      banana  = createSprite(200,100,40,10);
    banana.y = Math.round(random(120,300));
   banana.addImage(bananaImage);
   banana.scale = 0.1;
    banana.velocityX = -5;
    
    banana.lifetime = 134;
     
     foodGroup.add(banana);
     
    }
}



function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(355,309,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;     
    obstacle.scale = 0.2;
    obstacle.lifetime = 500;
   
   obstacleGroup.add(obstacle);
   
 }
}