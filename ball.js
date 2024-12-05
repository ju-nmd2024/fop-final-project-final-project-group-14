export default class Ball {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.r = 7;
      this.speed = 9;
      this.hasBounced = false;
    }
  
    update() {
      this.x = this.x + Math.cos(this.angle) * this.speed;
      this.y = this.y + Math.sin(this.angle) * this.speed;
  
      // Left or right wall collision
      if (this.x - this.r < 100 || this.x > 1100 - this.r) {
        this.angle = PI - this.angle;
      }
      // Top or bottom wall collision
      if (this.y - this.r < 250  || this.y > 800 - this.r) {
        this.angle = -this.angle;
      }
    }
  
    display() {
      push();
      translate(this.x, this.y);
      // fill(255, 255, 255);
      // ellipse(0, 0, this.r * 2);
      
    scale(0.2);
    
    //body
    fill(150, 0, 0);
    ellipse(0, 0, 100);

    //head
    fill(255, 255, 255);
    arc(0, -10, 90, 80, PI, + TWO_PI);

    //eyes
    fill(0, 0, 0);
    ellipse(-15, -30, 10, 12);
    ellipse(15, -30, 10, 12);

    //jacket
    push();
    noStroke();
    fill(100, 0, 0);
    triangle(-35, -5, -30, 10, -50, 5);
    triangle(-33, 0, -42, 20, -20, 40);
    triangle(35, -5, 30, 10, 50, 5);
    triangle(33, 0, 42, 20, 20, 40);
    pop();

    //jacket buttons
    fill(237, 200, 33);
    line(-20, 0, 20, 0);
    line(-15, 15, 15, 15);
    line(-10, 30, 10, 30);
    ellipse(-20, 0, 8);
    ellipse(20, 0, 8);
    ellipse(-15, 15, 8);
    ellipse(15, 15, 8);
    ellipse(-10, 30, 8);
    ellipse(10, 30, 8);

    //moustache left
    beginShape();
    fill(0, 0, 0);
    vertex(-2, -15);
    bezierVertex(-5, -15, -5, -5, -25, -15);
    bezierVertex(-25, -10, -5, 10, -2, -15);
    endShape();

    //moustache right
    beginShape();
    vertex(2, -15);
    bezierVertex(5, -15, 5, -5, 25, -15);
    bezierVertex(25, -10, 5, 10, 2, -15);
    endShape();

    //nose
    push();
    noFill();
    strokeWeight(3);
    beginShape();
    vertex(0, -35);
    bezierVertex(0, -25, 10, -30, 0, -20);
    endShape();
    pop();

    //hat
    push();
    translate(-35, -45);
    rotate(-0.3);
    fill(0, 0, 0);
    rect(-20, 0, 80, 10);
    rect(0, -30, 40, 30);
    pop();
    pop();


    
    }
  
    reset (paddle){
          this.x = paddle.x;
          this.y = 740;
          this.angle = Math.random() * (2 * PI - QUARTER_PI - (PI + QUARTER_PI)) +
          (PI + QUARTER_PI); 
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