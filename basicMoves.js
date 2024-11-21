class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 255, 255);
    rect(0, 0, this.width, this.height, 10);
    pop();
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.stepX = 2;
    this.stepY = 2;
  }

  update() {
    this.x = this.x + this.stepX;
    this.y = this.y - this.stepY;

    if (this.x <= 0 || this.x >= 600) {
      this.stepX = this.stepX * -1;
    }

    if (this.y <= 0 || this.y >= 600) {
      this.stepY = this.stepY * -1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 255, 255);
    ellipse(0, 0, this.width);
    pop();
  }
}

class Paddle {
  constructor(x) {
    this.x = x;
    this.y = 500;
    this.width = 100;
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

  display() {
    push();
    translate(this.x, this.y);
    translate(-this.width / 2, 0);
    stroke(255, 255, 255);
    strokeWeight(15);
    line(0, 0, this.width, 0);
    pop();
  }
}

function setup() {
  createCanvas(600, 600);
}

let ball = new Ball(400, 400);
let paddle = new Paddle(200);

function draw() {
  background(0, 0, 0);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      let block = new Block(50 + 100 * i, 100 + 50 * j);
      block.display();
    }
  }

  ball.display();
  ball.update();

  paddle.display();
  paddle.update();
}
