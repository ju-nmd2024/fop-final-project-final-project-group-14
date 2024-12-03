export default class Food {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.height = 100;
    this.width = 50;
    this.stepX = 2;
    this.stepY = 2;
    this.isActive = true;
    this.side = 0;
    this.number = Math.floor(Math.random()*3);
    this.cottonCandy = loadImage("Images/Cotton Candy.png");
    this.soda = loadImage("Images/Soda.png");
    this.hotDog = loadImage("Images/Hot Dog.png");
  }

  generate(){
  this.side = Math.floor(Math.random()*2);
  this.y = Math.floor(Math.random()*(700 - 100) + 100);
    if (this.side === 0) {
        this.x = 0;
        this.stepX = 3;
        
      } else if (this.side === 1) {
        this.x = 1200;
        this.stepX = -3;
      }
      this.isActive = true;
  }

  update() {
    if (this.number === 2) {
      this.width = 86.6;
      this.height = 34.6;}
   
      this.x = this.x + this.stepX;
      this.y = this.y + this.stepY;
    

    if (this.x < 0 || this.x > 1200) {
       this.isActive = false;
    }
  }
  display() {
    if (this.isActive === true) {
      push();
      translate(this.x, this.y);
      if (this.number === 0) {
        image(this.cottonCandy, 0, 0, 53.2, 105);
      } else if (this.number === 1) {
        image(this.soda, 0, 0, 53.6, 91.6);
      }else if (this.number === 2) {
        image(this.hotDog, 0, 0, 86.6, 34.6);
      }
      // fill(255, 120, 0);
      // ellipse(0, 0, this.r * 2);
      pop();
    }
  }

  
  onPaddle(object) {
    return (
      this.y <= paddle.y + 10 &&
      this.y + this.height >= paddle.y - 10 &&
      this.x <= paddle.x + paddle.width / 2 &&
      this.x + this.width >= paddle.x - paddle.width / 2
    );
  }

}
