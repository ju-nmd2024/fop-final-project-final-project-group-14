export default class PowerUp {
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
        fill(10, 230, 0);
      }
      ellipse(0, 0, this.r * 2);
      pop();
    }
  }