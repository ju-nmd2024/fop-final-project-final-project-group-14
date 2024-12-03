/* import Block from "./block.js";
import Ball from "./ball.js";
import Paddle from "./paddle.js";
import PowerUp from "./powerup.js";
import Food from "./food.js";
import Player from "./player.js";

let paddle = new Paddle(600);
let player = new Player();
let food = new Food();
let blocks = [];
let balls = [];
let gameState = "start";
let rowNumber = 5;
let columnNumber = 10;
let powerUps = [];


function setup(){
  frameRate(30);
  createCanvas(1200, 800);
  background(255, 255, 255);
}
window.setup = setup;

let rectX = 100;
let rectY = 250;
let roofDetailWhiteX = 200;
let roofDetailWhiteY = 250;
let roofDetailRedX = 200;
let roofDetailRedY = 250;
let roofPeak = 100;

function setup(){
    createCanvas(1200, 800);
    background(255, 255, 255);
}  
 
function tentBackground(rectX, rectY) {
    noStroke();
    fill(70, 10, 10); 
    rect(rectX, rectY, 100, 700);
    fill(150, 150, 150);
    rect(rectX + 50, rectY, 50, 700);
} 

function roofTop(){
    fill(240, 240, 240);
    triangle(100, 250, 300, 250, 600, roofPeak);
    triangle(500, 250, 700, 250, 600, roofPeak);
    triangle(900, 250, 1100, 250, 600, roofPeak);
    fill(120, 10, 10);
    triangle(300, 250, 500, 250, 600, roofPeak);
    triangle(700, 250, 900, 250, 600, roofPeak);
}

function roofDetailWhite(roofDetailWhiteX, roofDetailWhiteY) {
    fill(220, 220, 220);
    arc(roofDetailWhiteX, roofDetailWhiteY, 100, 80, 0, + PI);
}

function roofDetailRed(roofDetailRedX, roofDetailRedY){
    fill(100, 10, 10);
    arc(100 + roofDetailRedX, roofDetailRedY, 100, 80, 0, + PI);
}

//calculates a random angle for the start of the ball
function randomAngle() {
  return (
    Math.random() * (2 * PI - QUARTER_PI - (PI + QUARTER_PI)) +
    (PI + QUARTER_PI)
  );
}

function allBlocksHit(){
  let count = 0;
  for (let i = 0; i < columnNumber; i++) { 
    for (let j = 0; j < rowNumber; j++) {
      if(blocks[i][j].isActive === false || blocks[i][j].isBad ){
        count++;
      }
    } 
  }
  return(columnNumber * rowNumber === count);   
}

function gridBlocks() {
  let specialIndexes = [];
  let badIndexes = [];
  // Generate random indices for special and bad blocks
  while (specialIndexes.length < 8) {
    let specialIndex = Math.floor(Math.random() * (rowNumber * columnNumber));
    specialIndexes.push(specialIndex);
  }
  
  while (badIndexes.length < 5) {
    let badIndex = Math.floor(Math.random() * (rowNumber * columnNumber));
    badIndexes.push(badIndex);
  } 

  let count = 0;  
  for (let i = 0; i < columnNumber; i++) {
    blocks[i] = [];
    for (let j = 0; j < rowNumber; j++) {
      blocks[i][j] = new Block(200 + 80 * i, 350 + 50 * j, rowNumber - 1 - j);
      count++;
      if (badIndexes.includes(count)){
        blocks[i][j].isBad = true;
      }
      if (specialIndexes.includes(count)) {
        blocks[i][j].isSpecial = true;
      }  
    }
  }
} 

function checkCollision(ball) {
  let adjustX = false;
  let adjustY = false;
  let angle = 0;
  
  for (let i = 0; i < columnNumber; i++) {
    for (let j = 0; j < rowNumber; j++) {
      let block = blocks[i][j];
     
      
      //if the block is hit
      if (block.isActive && block.hit(ball) && block.justHit===false) {
        // flag so you cant hit it repeatedly in same frame
        block.justHit = true;
        
        if(block.isBad === false){ 
          
          player.score += 5;
          //decrease hit point
          block.hitPoint -= 1;  
        }
        
 
        // calculate overlaps
        let overlapLeft = ball.x + ball.r - block.x;
        let overlapRight = block.x + block.width - (ball.x - ball.r);
        let overlapTop = ball.y + ball.r - block.y;
        let overlapBottom = block.y + block.height - (ball.y - ball.r);

        // find the smallest overlap to determine collision side
        let minOverlap = Math.min( 
          overlapLeft, 
          overlapRight,
          overlapTop,
          overlapBottom
        );
 
        //Reposition ball and change of direction
        if (minOverlap === overlapTop) {
          adjustY = true; 
          ball.y = block.y - ball.r - 1;
          ball.y -=2;
          angle = - randomAngle();
        } else if (minOverlap === overlapBottom) {
          adjustY = true; 
          ball.y = block.y + block.height + ball.r + 1;
          ball.y += 2;
          angle = randomAngle();
        } else if (minOverlap === overlapLeft) {
          adjustX = true; 
          ball.x = block.x - ball.r - 1;
          angle = randomAngle();
        } else if (minOverlap === overlapRight) {
          adjustX = true;
          ball.x = block.x + block.width + ball.r + 1;
          angle = randomAngle();
        }   
 
        // Deactivate block if no hits left
        if (block.hitPoint <= 0 && block.isBad ===false) {
          block.isActive = false;
          // if the block is the special one, drop the powerUp
          if (block.isSpecial) {
            let newPowerUp = new PowerUp(
              block.x + block.width / 2,
              block.y + block.height / 2
            );
            newPowerUp.generate();
            newPowerUp.isActive = true;
            powerUps.push(newPowerUp);
          }
        }
        if(block.isBad){
          ball.angle = angle;
        }
      }

      // Display the block if it's active
      if (block.isActive) {
        block.display();
      }
    } 
  }
  
    // Adjust the ball's direction after all collisions
  // the adjustY and adjustX logic comes from chatGPT https://chatgpt.com/share/674b4c5e-ffec-8006-bfa8-695afdac74ad
  
  if (adjustY) {
    ball.directionY();  
  }
  if (adjustX) {
    ball.directionX();
  }

  
}   
  
function gamePage() {
  //check if the balls hit the blocks
  for (let ball of balls) {
    checkCollision(ball);
  }
  
  paddle.display();
  paddle.update();

  //check if ball hit paddle
  for (let ball of balls) {
    ball.display();

    if (paddle.hit(ball)) {
      if (ball.hasBounced !== true) {
        ball.directionY();
        ball.hasBounced = true;
      }
    } else {
      ball.hasBounced = false;
    }

    //remove life only when player has 0 balls
    if (ball.y + ball.r >= 800) {
      if (player.life > 0) {
        if (balls.length > 1) {
          balls.splice(balls.indexOf(ball), 1);
        } else {
          player.loseLife();
          ball.reset();
        }
      } else {
        gameState = "game over";
        console.log("lives");
      }
    }
    ball.update();
  }

  paddle.display();
  paddle.update();

  for (let powerUp of powerUps) {
    // catch the powerUp with the paddle
    if (paddle.hit(powerUp) === true && powerUp.isActive === true) {
      powerUp.isActive = false;

      // different types, different functions
      if (powerUp.type === 0) {
        paddle.bigger();
      } else if (powerUp.type === 1) {
        paddle.smaller();
      } else if (powerUp.type === 2) {
        for (let i = balls.length; i < 3; i++) {
          balls.push(new Ball(paddle.x, paddle.y-10, randomAngle()));
        }
      } else if (powerUp.type === 3) {
        player.life++;
      }

      powerUps.splice(powerUps.indexOf(powerUp), 1);
    } else if (powerUp.y > height) {
      // Remove power-up off screen
      powerUps.splice(powerUps.indexOf(powerUp), 1);
    } else if (powerUp.isActive) {
      powerUp.display();
      powerUp.update();
    }
  }

  // re-set just hit flag 

    for (let i = 0; i < columnNumber; i++) {
      for (let j = 0; j < rowNumber; j++) {
        blocks[i][j].justHit = false;
      }
    }
  

  // Audince throwing food
  food.generate();
  if (paddle.hit(food) === true && food.isActive === true) {
    food.isActive = false;
    player.score -= 2; 
  }
  if (food.isActive) {
    food.display();
    food.update();
  }
  
  
  if (allBlocksHit()){
    gameState = "game over";
    console.log("blocks");
  }
}

function draw() {
  noStroke();
  background(220, 255, 255);

push();
  for (let i = 1; i < 11; i++) {
    tentBackground(rectX * i, rectY);
  }
  for (let i = 0; i < 6; i++) {
    roofDetailWhite(roofDetailWhiteX * i, roofDetailWhiteY);
  }
for (let i = 0; i < 6; i++) {
    roofDetailRed(roofDetailRedX * i, roofDetailRedY); 
}


roofTop();
pop();


  if (gameState === "start") {
    gridBlocks();
    balls[0] = new Ball(paddle.x, paddle.y - 10, randomAngle());
    gameState = "game";
    gameTimer = 10000;
  } else if (gameState === "game") {
    if (gameTimer > 0) {
      gamePage();
      gameTimer--;
      push();
      fill(0);
      text("TIMER: " + Math.floor(gameTimer / 30), 50, 50);
      text("SCORE: " + player.score, 50, 30);
      text("LIVES: " + player.life, 50, 70);
      pop();
    } else {
      gameState = "game over";
      console.log("time");
    }
  }
}
window.draw = draw;
 */