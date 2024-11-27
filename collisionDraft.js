class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.isActive = true;
  }

  display() {
    if (this.isActive) {
      push();
      translate(this.x, this.y);
      fill(255, 255, 255);
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

  hit(ball) {
    return (
      ball.y + ball.r >= this.y &&
      ball.x <= this.x + this.width / 2 &&
      ball.x >= this.x - this.width / 2
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

    // wall collisions
    if (this.x < this.r || this.x > 600 - this.r) {
      // Left or right wall
      this.angle = PI - this.angle;
    }

    if (this.y < this.r || this.y > 600 - this.r) {
      // Top or bottom wall (horizontal collision)
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

  directionX() {
    this.angle = PI - this.angle;
  }

  directionY() {
    this.angle = -this.angle;
  }
}

function randomAngle() {
  return Math.floor(
    Math.random() * (2 * PI - QUARTER_PI - (PI + QUARTER_PI)) +
      (PI + QUARTER_PI)
  );
}

function setup() {
  createCanvas(600, 600);
}

let ball2 = new Ball(400, 400);
let paddle = new Paddle(150);
let ball = new Ball(paddle.x, 480, randomAngle());
let player = new Player();
let blocks = [];
let gameState = "start";

function gridBlocks() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      let block = new Block(50 + 50 * i, 100 + 50 * j);
      blocks.push(block);
    }
  }
}

function gamePage() {
  for (let block of blocks) {
    if (block.isActive && block.hit(ball)) {
      block.isActive = false;

      let overlapLeft = ball.x + ball.r - block.x;
      let overlapRight = block.x + block.width - (ball.x - ball.r);
      let overlapTop = ball.y + ball.r - block.y;
      let overlapBottom = block.y + block.height - (ball.y - ball.r);

      // Find the smallest overlap to determine the collision side
      let minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      if (minOverlap === overlapTop || minOverlap === overlapBottom) {
        // Top or bottom collision
        ball.directionY();
      } else if (minOverlap === overlapLeft || minOverlap === overlapRight) {
        // Left or right collision
        ball.directionX();
      }
    } else {
      block.display();
      fill(255, 0, 0);
    }
  }

  //brick.hitBall(ball);

  ball.display();
  paddle.display();
  paddle.update();

  if (paddle.hit(ball) === true) {
    ball.directionY();
  }

  ball.update();
  //paddle.bigger();
  //paddle.smaller();
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
