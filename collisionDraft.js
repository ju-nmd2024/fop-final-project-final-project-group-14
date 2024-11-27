class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 7;
    this.stepX = 5;
    this.stepY = 5;
    this.dead = false;
  }

  update() {
    this.x = this.x + this.stepX;
    this.y = this.y - this.stepY;

    // wall collisions
    if (this.x <= this.r || this.x >= 600 - this.r) {
      this.stepX = this.stepX * -1;
    }

    if (this.y <= this.r || this.y >= 600 - this.r) {
      this.stepY = this.stepY * -1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 255, 255);
    ellipse(0, 0, this.r * 2);
    pop();
  }

  directionY() {
    this.stepY = this.stepY * -1;
  }

  /* isDead() { 
    if (this.dead === true) {  
       // player.life -=1;
        //if(player.life > 0){
          this.x=paddle.x; 
          this.y=480; 
          this.stepY=this.stepY * -1;
          this.dead=false;
        /* } else {this.x=paddle.x; 
                this.y=480;
              } 

  } 
 } */
}

function setup() {
  createCanvas(600, 600);
}

let ball = new Ball(400, 400);
let ball2 = new Ball(400, 400);
let paddle = new Paddle(150);
let player = new Player();
let blocks = [];
let gameState = "start";

function gridBlocks() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      let block = new Block(50 + 100 * i, 100 + 50 * j);
      blocks.push(block);
    }
  }
}

function gamePage() {
  for (let block of blocks) {
    if (block.isActive && block.hit(ball)) {
      block.isActive = false;
      ball.directionY();
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
