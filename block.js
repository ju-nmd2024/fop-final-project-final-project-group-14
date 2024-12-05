export default class Block {
  constructor(x, y, hitPoint) {
    this.x = x;
    this.y = y;
    this.hitPoint = hitPoint;
    this.width = 80;
    this.height = 50;
    this.isActive = true;
    this.justHit = false;
    this.isSpecial = false;
    this.isBad = false;
  }

  display() {
    push();
    if (this.isActive) {
      translate(this.x, this.y);

      // Different colors for different number of hits needed to deactivate
      if (this.hitPoint <= 1) {
        fill(218, 238, 250);
      } else if (this.hitPoint === 2) {
        fill(142, 205, 238);
      } else if (this.hitPoint === 3) {
        fill(99, 188, 232);
      } else if (this.hitPoint > 3) {
        fill(39, 170, 225);
      }
      if (this.isBad) {
        this.isSpecial = false;
        fill(100, 100, 100);
      } else if (this.isSpecial) {
        // fill(255, 255, 0);
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