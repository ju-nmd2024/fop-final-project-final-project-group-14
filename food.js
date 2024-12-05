export default class Food {
  constructor(soda, hotDog, cottonCandy) {
    this.x = 0;
    this.y = 300;
    this.height = 100;
    this.width = 50;
    this.stepX = 2;
    this.stepY = 2;
    this.isActive = true;
    this.side = 0;
    this.number = Math.floor(Math.random() * 3); //randomly choose between one of the three images 0 = cottonCandy, 1 = soda, 2 = hotDog
    this.cottonCandy = cottonCandy;
    this.soda = soda;
    this.hotDog = hotDog;
    this.angle = 0;
  }

  generate() {
    this.side = Math.floor(Math.random() * 2); //random side 
    this.y = Math.floor(Math.random() * (700 - 100) + 100); //random restricted height between 100 & 700
    if (this.side === 0) { // 0 = left, change x and step so it moves to the right
      this.x = 0;
      this.stepX = 5;
    } else if (this.side === 1) {
      this.x = 1200;
      this.stepX = -5;
    }
    this.isActive = true;
  }

  update() {
    if (this.number === 2) { //change sizes for the hotdog
      this.width = 86.6;
      this.height = 34.6;
    }

    //move and change rotation angle
    this.x = this.x + this.stepX;
    this.y = this.y + this.stepY;
    this.angle += 0.1;

    if (this.x < 0 || this.x > 1200) {
      this.isActive = false;
    }
  }
  display() {
    if (this.isActive === true) {
      push();
      imageMode(CENTER); //ImageMode from p5js website
      translate(this.x, this.y);
      rotate(this.angle);
      if (this.number === 0) {
        image(this.cottonCandy, 0, 0, 53.2, 105);
      } else if (this.number === 1) {
        image(this.soda, 0, 0, 53.6, 91.6);
      } else if (this.number === 2) {
        image(this.hotDog, 0, 0, 86.6, 34.6);
      }
      // fill(255, 120, 0);
      // ellipse(0, 0, this.r * 2);
      pop();
    }
  }

  //food on paddle collision
  onPaddle(object) {
    return (
      this.y - this.height / 2 <= object.y + 10 &&
      this.y + this.height / 2 >= object.y - 10 &&
      this.x - this.width / 2 <= object.x + object.width / 2 &&
      this.x + this.width / 2 >= object.x - object.width / 2
    );
  }
}
