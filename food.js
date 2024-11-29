export default class Food {
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