var monsters;
var shooter;
var shooterImg,monsterImg;
var bg,bgImg;
var monstersGroup;
var laser,laserImg,laserGroup;
var score = 0;
var gameOver,gameOverImg;


function preload(){
monsterImg = loadImage("monster.png");
shooterImg = loadImage("shooter.png");
bgImg = loadImage("background.png");
laserImg = loadImage("laser.png");
gameOverImg = loadImage("gameover.png");
}


function setup(){
createCanvas(700,600);

bg = createSprite(600,300);
bg.addImage(bgImg);
bg.scale = 1;
bg.velocityX = -2;


shooter = createSprite(50,500);
shooter.addImage(shooterImg);
shooter.scale = 0.5;

monstersGroup = new Group;
laserGroup = new Group;



score = 0;
stroke("red");
fill("red");
textSize(20);

}


function draw(){
background(0);

if (bg.x <50){
    bg.x = bg.width/2;
  }


  if(keyDown("UP_ARROW")){
    shooter.y = shooter.y - 4;
  }
  
  if(keyDown("DOWN_ARROW")){
    shooter.y = shooter.y + 4;
  }

  if(keyDown("space")){
    laser = createSprite(shooter.x,shooter.y);
    laser.addImage(laserImg);
    laser.velocityX = 5;
    laserGroup.add(laser);
    laser.scale = 0.15;
  }
  if(laserGroup.isTouching(monstersGroup)){
  monstersGroup[0].destroy();
  laserGroup[0].destroy();
  score = score + 25;

  }

  if(monstersGroup.isTouching(shooter)){
    monstersGroup.setVelocityXEach(0);
    monstersGroup.setVelocityYEach(0);
    monstersGroup.setVisibleEach(false);
    bg.velocityX = 0;
    

    gameOver = createSprite(350,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.9;
  }


spawnmonsters();
drawSprites();
text("Score: " + score, 300, 50);
}

function spawnmonsters(){
if(World.frameCount % 150 === 0){
monsters = createSprite(700,500);

monsters.addImage(monsterImg);

monsters.scale = 0.32;

monsters.velocityX = -(6 + score/100);

monsters.y = Math.round(random(550,50));

monstersGroup.add(monsters);
}

}