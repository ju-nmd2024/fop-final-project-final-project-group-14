export default class Player {
    constructor(name) {
      this.name = name;
      this.score = 0;
      this.life = 3;
    }
  
    loseLife(){
      this.life -= 1;
    }
  }