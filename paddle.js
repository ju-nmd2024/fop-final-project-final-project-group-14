export default class Paddle {
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
  
    hit(object) {
      return (
        object.y + object.r >= this.y &&
        object.y - object.r <= this.y + 2 &&
        object.x <= this.x + this.width / 2 &&
        object.x >= this.x - this.width / 2
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