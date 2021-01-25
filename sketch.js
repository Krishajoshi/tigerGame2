var tigerImage,tiger,tigerImage1;
var ground,invisibleGround;
var alien,alienGroup,alienImage;
var food,foodGroup,foodImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;



function preload(){
    tigerImage =   loadAnimation("tigersprite.png","tigersprite2.png","tigersprite3.png");
    tigerImage1 = loadImage("tigersprite4.png");
    alienImage = loadImage("alienImage1.png");
    foodImage = loadImage("meatsprite.png");
}

function setup() {
    createCanvas(400,200);

    tiger = createSprite(50,180,20,50);
    tiger.addAnimation("running", tigerImage);
    

    ground = createSprite(200,180,600,10);
    ground.x=ground.width/2;
    
    alienGroup = new Group();
    foodGroup = new Group();
     

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;


 
}

function draw() {
background(250);

if (gameState===PLAY)
{
    
    console.log(tiger.y);
    if(keyDown("space") && tiger.y >= 160) {
      tiger.velocityY = -12;
    }
  
    tiger.velocityY = tiger.velocityY + 0.8

    if (ground.x < 0){
        ground.x = ground.width/2;
    }


    for(var i=0;i<foodGroup.length;i++)
    {
      if(foodGroup.get(i).isTouching(tiger))
      {
        score=score+2;
        foodGroup.get(i).destroy();
      }
     if(alienGroup.isTouching(tiger)){
       gameState = END;
       alienGroup.destroyEach();
       foodGroup.destroyEach();
     }
    }

     if (gameState === END) {

       ground.velocityX = 0;
       tiger.velocityY = 0;
       tiger.addImage(tigerImage1);
       alienGroup.setVelocityXEach(0);
       foodGroup.setVelocityXEach(0);

       alienGroup.setLifetimeEach(-1);
       foodGroup.setLifetimeEach(-1);

       //alienGroup.destroyEach();
       //foodGroup.destroyEach();

       
    }
   
}



tiger.collide(invisibleGround);

 spawnObstacles();
 spawnFood();
 drawSprites();
 text("SCORE: "+score, 260,20);
}

function spawnObstacles(){
    if(frameCount % 60 === 0) {
        var alien = createSprite(600,150,10,40);
        
        alien.y = Math.round(random(50,150));
        alien.addImage(alienImage);
        
        alien.scale = 0.5;
        alien.velocityX = -2;
        alien.setLifetime=100;
           
  
   
        alienGroup.add(alien);
     }
  }

  function spawnFood() {
    
    if (frameCount % 120 === 0) {
      var food = createSprite(600,120,40,10);
      food.addImage(foodImage);
      food.y = Math.round(random(20,90));
      food.scale = 0.5;
      food.velocityX = -5;
      
       
      food.lifetime = 200;
      
      
      
      foodGroup.add(food);
    }
}
