import Block from "./block.js";
import Ball from "./ball.js";
import Paddle from "./paddle.js";
import PowerUp from "./powerup.js";
import Food from "./food.js";
import Player from "./player.js";

let paddle = new Paddle(300);
let player = new Player();
let food = new Food();
let blocks = [];
let balls = [];
let gameState = "start";
let row = 5;
let column = 10; 
let powerUps = [];
  
function setup() {
  createCanvas(600, 600);
}
window.setup = setup;

//calculates a random angle for the start of the ball
function randomAngle() {
  return (
    Math.random() * 
    (2 * PI - QUARTER_PI - (PI + QUARTER_PI)) + (PI + QUARTER_PI)
  );
} 

function gridBlocks() {
  let specialIndexes = [];

  // Generate unique random indices for special blocks
  while (specialIndexes.length < 8) {
    let specialIndex = Math.floor(Math.random() * (row * column));
    specialIndexes.push(specialIndex);
  }

  
  let count = 0;
  for (let i = 0; i < column; i++) {
    blocks[i] = [];
    for (let j = 0; j < row; j++) {
      blocks[i][j] = new Block(50 + 50 * i, 100 + 50 * j, row - 1 - j); 
      count++;
      if (specialIndexes.includes(count)) {
        blocks[i][j].isSpecial = true;
      } 
    }
  }
}

function checkCollision(ball) {
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      let block = blocks[i][j];
      //if the block is hit
      if (block.isActive && block.hit(ball) && block.justHit === false) {
        // flag so you cant hit it repeatedly in same frame
        block.justHit = true;
        //decrease hit point
        block.hitPoint -= 1;

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

        if (minOverlap === overlapTop || minOverlap === overlapBottom) {
          ball.directionY(); // Top or bottom collision
        } else if (minOverlap === overlapLeft || minOverlap === overlapRight) {
          ball.directionX(); // Left or right collision
        }

        // Deactivate block if no hits left
        if (block.hitPoint <= 0) {
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
      }

      // Display the block if it's active
      if (block.isActive) {
        block.display();
      }
    }
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
    
    if (ball.y + ball.r >= 600) {
      if (player.life > 0) {
        if (balls.length > 1) {
          balls.splice(balls.indexOf(ball), 1);
        } else {
          player.loseLife(); 
          console.log(player.life);
          ball.reset();
        }
      } else {
        gameState = "game out";
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
        for (let i = 0; i < 3; i++) {
          balls.push(new Ball(paddle.x, 480, randomAngle()));
        }
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
  if (frameCount % 10 === 0) {
    for (let i = 0; i < column; i++) {
      for (let j = 0; j < row; j++) {
        blocks[i][j].justHit = false;
      }
    }
  }

  if (paddle.hit(food) === true && food.isActive === true) {
    food.isActive = false;
    //score decrease
  }
  if (food.isActive) {
    food.display(); 
    food.update();
  }
}

function draw() {
  background(0, 0, 0);

  if (gameState === "start") {
    gridBlocks();
    balls[0] = new Ball(paddle.x, 480, randomAngle());
    gameState = "game";
  } else if (gameState === "game") {
    gamePage();
  }
}
window.draw = draw;
