export default class Player {
    constructor() {
      this.name = "";
      this.score = 0;
      this.life = 3;
    }
  
    loseLife(){
      this.life -= 1;
    }
  }