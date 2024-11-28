let conductorX = 100;
let conductorY = 100;
let conductorS = 1;

function circusConductor(){
    
    //body
    fill(150, 0, 0);
    ellipse(200, 400, 100);

    //head
    fill(255, 255, 255);
    arc(200, 390, 90, 80, PI, + TWO_PI);

    //eyes
    fill(0, 0, 0);
    ellipse(185, 370, 10, 12);
    ellipse(215, 370, 10, 12);

    //jacket
    push();
    noStroke();
    fill(100, 0, 0);
    triangle(165, 395, 170, 410, 150, 405);
    triangle(167, 400, 158, 420, 180, 440);
    triangle(235, 395, 230, 410, 250, 405);
    triangle(233, 400, 242, 420, 220, 440);
    pop();

    //jacket buttons
    fill(237, 200, 33);
    line(180, 400, 220, 400);
    line(185, 415, 215, 415);
    ellipse(180, 400, 8);
    ellipse(220, 400, 8);
    ellipse(185, 415, 8);
    ellipse(215, 415, 8);

    //moustache left
    beginShape();
    fill(0, 0, 0);
    vertex(198, 385);
    bezierVertex(195, 385, 195, 395, 175, 385);
    bezierVertex(175, 390, 195, 410, 198, 385);
    endShape();

    //moustache right
    beginShape();
    vertex(202, 385);
    bezierVertex(205, 385, 205, 395, 225, 385);
    bezierVertex(225, 390, 205, 410, 202, 385);
    endShape();

    //hat
    push();
    translate(165, 355);
    rotate(-0.3);
    fill(0, 0, 0);
    rect(-20, 0, 80, 10);
    rect(0, -30, 40, 30);
    pop();

}

function draw(){

    circusConductor();
}