let numberColor = 0;
let colors = [];
let blocks = [];

class Block {
    constructor(x, y, randomColor) {
      this.x = x;
      this.y = y;
      this.randomColor = randomColor;
      this.width = 80;
      this.height = 40;
    }
  
    display() {
      push();
      translate(this.x, this.y);
  
      //assign a different color to the blocks
      if (this.randomColor === 0){
        fill(255, 255, 255);
      } else if (this.randomColor === 1){
        fill(255, 0, 0);
      } else if (this.randomColor === 2){
        fill(0, 255, 0);
      } else if (this.randomColor === 3){
        fill(0, 0, 255);
      }
      
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
  
      // if the ball hits the sides it bounces
      if (this.x <= this.width/2 || this.x >= 600 - this.width/2) {
        this.stepX = this.stepX * -1;
      }
  
      if (this.y <= this.width/2 || 
          this.y >= 600 - this.width/2) {
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
  
      //paddle movement with arrow keys
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
      // the x and y refer to the center or the paddle
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
  let start = false;
  
  function draw() {
    background(0, 0, 0);
    
    
    //generate block in the Block class?
    if (start === false){
      for (let i = 0; i < 5; i++){
        colors.push(Math.floor (Math.random() * 4));
        }
        start = true;
    }
    
    let count = 0;
    for (let i = 0; i < 5; i++) {
        let block = new Block(50 + 100 * i, 100, colors[count]);
        blocks.push(block);
        count++;
        block.display();
      }
    
   /*  for (let block of blocks){
        if(ball.y >= block.y+block.height){
           if (ball.x >= block.x || ball.x<=block.x+block.width)
            block.stepY = block.stepY * -1;
        }
    } */
  
    ball.display();
    ball.update();
  
    paddle.display();
    paddle.update();
}