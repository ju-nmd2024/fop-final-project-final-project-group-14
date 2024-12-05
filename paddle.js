export default class Paddle {
  constructor(x) {
    this.x = x;
    this.y = 750;
    this.width = 70;
    this.weight = 15;
    this.isDifferent = false; //flag if the paddle is smaller or bigger
    this.timer = 0;
  }

  update() {
    // timer for the powerup and reset size after the timer is done
    if(this.isDifferent){
      this.timer--;
      if(this.timer === 0){
      this.width = 70;
    }
    }  
    
    // movement with keys
    if (keyIsDown(39)) {
      if (this.x <= 1200 - this.width / 2) {
        this.x = this.x + 5;
      }
    } else if (keyIsDown(37)) {
      if (this.x >= this.width / 2) {
        this.x = this.x - 5;
      }
    }

    // restrict movement to the tent size
    if(this.x - this.width / 2 <= 100 ) {
      this.x = 100 + this.width/2;
    }
    if(this.x + this.width / 2 >= 1100 ) {
      this.x = 1100 - this.width/2;
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
    this.isDifferent = true;
    this.width = 140;
    this.timer = 300;
  }
  smaller() {
    this.isDifferent = true;
    this.width = 50;
    this.timer = 300;
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

  reset(){
    this.x = 600;
    this.width = 70;
  }
}