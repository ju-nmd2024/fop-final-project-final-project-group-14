class Block {
  constructor(x, y, hitPoint) {
    this.x = x;
    this.y = y;
    this.hitPoint = hitPoint;
    this.width = 50;
    this.height = 50;
    this.isActive = true;
    this.justHit = false;
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
    //this.life = 3;
  }
}

class Ball {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.r = 7;
    this.speed = 5;
    this.dead = false;
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
    this.number = Math.floor(Math.random() * 4);
    this.isActive = false;
  }

  update() {
    this.y = this.y + 2;
  }

  display() {
    push();
    translate(this.x, this.y);
    if (this.number === 0) {
      fill(255, 0, 255);
    } else if (this.number === 1) {
      fill(255, 200, 0);
    } else if (this.number === 2) {
      fill(100, 0, 250);
    } else if (this.number === 3) {
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
let ball = new Ball(paddle.x, 480, randomAngle());
let ball2 = new Ball(paddle.x, 480, randomAngle());
let player = new Player();
let food = new Food();
let blocks = [];
let gameState = "start";
let row = 5;
let column = 10;
let powerUp = new PowerUp(50, 50);
let specialRow = Math.floor(Math.random() * row);
let specialColumn = Math.floor(Math.random() * column);

function gridBlocks() {
  for (let i = 0; i < column; i++) {
    blocks[i] = [];
    for (let j = 0; j < row; j++) {
      blocks[i][j] = new Block(50 + 50 * i, 100 + 50 * j, 4);
    }
  }
}

function checkCollision(ball) {
  specialBlock = blocks[1][4];
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

        // Deactivate block if no hits remain
        if (block.hitPoint <= 0) {
          block.isActive = false;
          // if the block is the special one, drop the powerUp
          if (block === specialBlock) {
            powerUp.x = specialBlock.x + specialBlock.width / 2;
            powerUp.y = specialBlock.y + specialBlock.height / 2;
            powerUp.isActive = true;
          }
        }
      }

      // Display the block if it's active
      if (block.isActive) {
        block.display();
      }
      //reset just hit flag
      block.justHit = false;
    }
  }
}

function gamePage(specialBlock) {
  checkCollision(ball);
  checkCollision(ball2);

  ball.display();
  ball2.display();
  paddle.display();
  paddle.update();

  if (ball.y > paddle.y) {
    ball.x = paddle.x;
    ball.y = 480;
    ball.angle = randomAngle();
  }
  if (paddle.hit(ball) === true) {
    ball.directionY();
  }
  if (paddle.hit(ball2) === true) {
    ball2.directionY();
  }

  if (paddle.hit(powerUp) === true && powerUp.isActive === true) {
    powerUp.isActive = false;

    if (powerUp.number === 0) {
      paddle.bigger();
    } else if (powerUp.number === 1) {
      paddle.smaller();
    } else if (powerUp.number === 2) {
      paddle.smaller();
    }
  }

  ball.update();
  ball2.update();
  //paddle.bigger();
  //paddle.smaller();

  if (powerUp.isActive) {
    powerUp.display();
    powerUp.update();
  }

  if (powerUp.isActive) {
    powerUp.display();
    powerUp.update();
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

    gameState = "game";
  } else if (gameState === "game") {
    gamePage();
  }
}
