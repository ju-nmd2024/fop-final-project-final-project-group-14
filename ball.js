export default class Ball {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.r = 7;
      this.speed = 7;
      this.hasBounced = false;
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
  
    reset (){
          this.x = paddle.x;
          this.y = 480;
          this.angle = randomAngle(); 
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