let conductorX = 100;
let conductorY = 100;
let conductorS = 1;

function circusConductor(){

    push();

    translate(200, 400);
    scale(conductorS);
    
    //body
    fill(150, 0, 0);
    ellipse(conductorX, 0, 100);

    //head
    fill(255, 255, 255);
    arc(0, -10, 90, 80, PI, + TWO_PI);

    //eyes
    fill(0, 0, 0);
    ellipse(-15, -30, 10, 12);
    ellipse(15, -30, 10, 12);

    //jacket
    push();
    noStroke();
    fill(100, 0, 0);
    triangle(-35, -5, -30, 10, -50, 5);
    triangle(-33, 0, -42, 20, -20, 40);
    triangle(35, -5, 30, 10, 50, 5);
    triangle(33, 0, 42, 20, 20, 40);
    pop();

    //jacket buttons
    fill(237, 200, 33);
    line(-20, 0, 20, 0);
    line(-15, 15, 15, 15);
    line(-10, 30, 10, 30);
    ellipse(-20, 0, 8);
    ellipse(20, 0, 8);
    ellipse(-15, 15, 8);
    ellipse(15, 15, 8);
    ellipse(-10, 30, 8);
    ellipse(10, 30, 8);

    //moustache left
    beginShape();
    fill(0, 0, 0);
    vertex(-2, -15);
    bezierVertex(-5, -15, -5, -5, -25, -15);
    bezierVertex(-25, -10, -5, 10, -2, -15);
    endShape();

    //moustache right
    beginShape();
    vertex(2, -15);
    bezierVertex(5, -15, 5, -5, 25, -15);
    bezierVertex(25, -10, 5, 10, 2, -15);
    endShape();

    //nose
    push();
    noFill();
    strokeWeight(3);
    beginShape();
    vertex(0, -35);
    bezierVertex(0, -25, 10, -30, 0, -20);
    endShape();
    pop();

    //hat
    push();
    translate(-35, -45);
    rotate(-0.3);
    fill(0, 0, 0);
    rect(-20, 0, 80, 10);
    rect(0, -30, 40, 30);
    pop();
    pop();

}

function draw(){

    circusConductor();
}