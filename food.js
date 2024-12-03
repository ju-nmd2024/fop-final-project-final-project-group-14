export default class Food {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.r = 20;
    this.stepX = 2;
    this.stepY = 2;
    this.isActive = true;
    this.side = 0;
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
      image(this.cottonCandy, 0, 0, 53.2, 105);
      image(this.soda, 0, 0, 53.6, 91.6);
      image(this.hotDog, 0, 0, 43.3, 34.6);
      // fill(255, 120, 0);
      // ellipse(0, 0, this.r * 2);
      pop();
    }
  }
}
