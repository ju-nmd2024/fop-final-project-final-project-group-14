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

    //jacket buttons
    fill(237, 200, 33);
    line(180, 400, 220, 400);
    line(185, 415, 215, 415);
    ellipse(180, 400, 8);
    ellipse(220, 400, 8);
    ellipse(185, 415, 8);
    ellipse(215, 415, 8);

    //moustache

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