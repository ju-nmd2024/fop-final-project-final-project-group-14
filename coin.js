export default class Coin {
  constructor() {
    this.x = random(100, 1100);
    this.y = 0;
    this.r = 10;
    this.speed = 4;
    this.active = true;
  }

  //when active fall at a certain speed
  update() {
    if (this.active) {
      this.y += this.speed;
    }
  }

  display() {
    if (this.active) {
      push();
      fill(200, 204, 0);
      ellipse(this.x, this.y, this.r * 2);
      fill(0, 0, 0);
      textFont("Courier New");
      textSize(16);
      text("10", this.x, this.y);
      pop();
    }
  
  }

  //reset coin on paddle
  reset(paddle) {
    return (this.y + this.r >= paddle.y && this.x > paddle.x - paddle.width / 2 && this.x < paddle.x + paddle.width / 2);

  }

}