export default class Button{
    constructor (x, y, width, height, text){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    display(){
        push();
        translate(this.x, this.y);
        stroke(250, 230, 0);
        strokeWeight(3);
        fill(255, 255, 255);
        rect(0, 0, this.width, this.height, this.height/6);
        
        noStroke();
        fill(0, 0, 0);
        textFont("Courier New");
        textStyle(BOLD);
        textSize(this.height/3);
        textAlign(CENTER);
        text(this.text, 0, this.height/3, this.width);
        pop();
    }

    hitTest(x, y){
        return(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this. height);
    }
}