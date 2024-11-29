export default class Block {
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