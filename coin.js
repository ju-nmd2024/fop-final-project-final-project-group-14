export default class Coin {
  constructor() {
    this.x = random(100, 1100);
    this.y = 0;
    this.r = 10;
    this.speed = 4;
    this.active = true;
  }

  update() {
    if (this.active) {
      this.y += this.speed;
    }
  }

  display() {
    if (this.active) {
      fill(200, 204, 0);
      ellipse(this.x, this.y, r * 2);
    }
  
  }

  reset(paddle) {
    return (this.y + this.r >= paddle.y && this.x > paddle.x - paddle.width / 2 && this.x < paddle.x + paddle.width / 2);

  }

}