class Block {
  constructor(x, y, hitPoint) {
    this.x = x;
    this.y = y;
    this.hitPoint = hitPoint;
    this.width = 50;
    this.height = 50;
    this.isActive = true;
    this.justHit = false;
    this.isSpecial = false;
  }

  display() {
    push();
    if (this.isActive) {
      translate(this.x, this.y);

      // Different colors for different number of hits needed to deactivate
      if (this.hitPoint === 1) {
        fill(255, 255, 255);
      } else if (this.hitPoint === 2) {
        fill(255, 0, 0);
      } else if (this.hitPoint === 3) {
        fill(0, 255, 0);
      } else if (this.hitPoint > 3) {
        fill(0, 0, 255);
      }
      if (this.isSpecial) {
        fill(255, 255, 0);
      }
      rect(0, 0, this.width, this.height, 10);
      pop();
    }
  }

  hit(ball) {
    return (
      ball.x >= this.x &&
      ball.x <= this.x + this.width &&
      ball.y <= this.y + this.height &&
      ball.y >= this.y
    );
  }
}

class Paddle {
  constructor(x) {
    this.x = x;
    this.y = 500;
    this.width = 100;
    this.weight = 15;
  }

  update() {
    if (keyIsDown(39)) {
      if (this.x <= 600 - this.width / 2) {
        this.x = this.x + 5;
      }
    } else if (keyIsDown(37)) {
      if (this.x >= this.width / 2) {
        this.x = this.x - 5;
      }
    }
  }

  //paddle collision

  hit(object) {
    return (
      object.y + object.r >= this.y &&
      object.x <= this.x + this.width / 2 &&
      object.x >= this.x - this.width / 2
    );
  }

  bigger() {
    this.width = 150;
  }
  smaller() {
    this.width = 50;
  }

  display() {
    push();
    translate(this.x, this.y);
    translate(-this.width / 2, 0);
    stroke(255, 255, 255);
    strokeWeight(this.weight);
    line(0, 0, this.width, 0);
    pop();
  }
}

class Player {
  constructor() {
    this.name = "";
    this.score = 0;
    this.life = 3;
  }

  loseLife(){
    this.life -= 1;
  }
}

class Ball {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.r = 7;
    this.speed = 5;
    
  }

  update() {
    this.x = this.x + Math.cos(this.angle) * this.speed;
    this.y = this.y + Math.sin(this.angle) * this.speed;

    // Left or right wall collision
    if (this.x < this.r || this.x > 600 - this.r) {
      this.angle = PI - this.angle;
    }
    // Top or bottom wall collision
    if (this.y < this.r || this.y > 600 - this.r) {
      this.angle = -this.angle;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 255, 255);
    ellipse(0, 0, this.r * 2);
    pop();
  }

  //change orizontal direction
  directionX() {
    this.angle = PI - this.angle;
  }
  //change vertical direction
  directionY() {
    this.angle = -this.angle;
  }
}

class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 15;
    this.type = 0;
    this.isActive = false;
  }

  generate() {
    this.type = Math.floor(Math.random() * 4);
    this.isActive = false;
  }

  update() {
    this.y = this.y + 2;
  }

  display() {
    push();
    translate(this.x, this.y);
    if (this.type === 0) {
      fill(255, 0, 255);
    } else if (this.type === 1) {
      fill(255, 200, 0);
    } else if (this.type === 2) {
      fill(100, 0, 250);
    } else if (this.type === 3) {
      fill(0, 250, 250);
    }
    ellipse(0, 0, this.r * 2);
    pop();
  }
}

class Food {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.r = 20;
    this.stepX = 2;
    this.stepY = 2;
    this.isActive = true;
  }
  update() {
    this.x = this.x + this.stepX;
    this.y = this.y + this.stepY;

    if (this.y > 600) {
      this.isActive = false;
    }
  }
  display() {
    if (this.isActive === true) {
      push();
      translate(this.x, this.y);
      fill(255, 120, 0);
      ellipse(0, 0, this.r * 2);
      pop();
    }
  }
}

//calculates a random angle for the start of the ball
function randomAngle() {
  return 4.5; /* (
    Math.random() *
    (2 * PI - QUARTER_PI - (PI + QUARTER_PI) + (PI + QUARTER_PI))
  ); */
}

function setup() {
  createCanvas(600, 600);
}

let paddle = new Paddle(150);
let player = new Player();
let food = new Food();
let blocks = [];
let balls = [];
let gameState = "start";
let row = 5;
let column = 10;
let powerUp = new PowerUp(50, 50);
let powerUps = [];



function gridBlocks() {
  let specialIndexes = [];

  // Generate unique random indices for special blocks
  while (specialIndexes.length < 100) {
    let specialIndex = Math.floor(Math.random() * (row * column));
    specialIndexes.push(specialIndex);
  }

  //let special = Math.floor(Math.random() * (row * column));
  let count = 0;
  for (let i = 0; i < column; i++) {
    blocks[i] = [];
    for (let j = 0; j < row; j++) {
      blocks[i][j] = new Block(50 + 50 * i, 100 + 50 * j, 1);
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
      
    if (paddle.hit(ball) === true) {
      ball.directionY(); 
    } else if (ball.y + ball.r >= height){
      
      if(player.life > 0){  
        if(balls.length > 1 ){ 
          balls.splice(balls.indexOf(ball), 1);
        } else {
          player.loseLife();
        console.log(player.life);
        ball.x = paddle.x;
        ball.y = 480;
        ball.angle = randomAngle();
        }
        
        }  
       else {
          gameState ="game out";
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
