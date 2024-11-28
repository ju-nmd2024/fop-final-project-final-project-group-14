let rectX = 100;
let rectY = 250;
let roofDetailWhiteX = 200;
let roofDetailWhiteY = 250;
let roofDetailRedX = 100;
let roofDetailRedY = 250;
let roofPeak = 100;

function setup(){
    createCanvas(1200, 800);
    background(255, 255, 255);
}
 
function tentBackground(rectX, rectY) {
    noStroke();
    fill(70, 10, 10);
    rect(rectX, rectY, 100, 700);
    fill(150, 150, 150);
    rect(rectX + 50, rectY, 50, 700);
}

function roofTop(){
    fill(240, 240, 240);
    triangle(100, 250, 300, 250, 600, roofPeak);
    triangle(500, 250, 700, 250, 600, roofPeak);
    triangle(900, 250, 1100, 250, 600, roofPeak);
    fill(120, 10, 10);
    triangle(300, 250, 500, 250, 600, roofPeak);
    triangle(700, 250, 900, 250, 600, roofPeak);
}

function roofDetailWhite(roofDetailWhiteX, roofDetailWhiteY) {
    fill(220, 220, 220);
    arc(roofDetailWhiteX, roofDetailWhiteY, 100, 80, 0, + PI);
}

function roofDetailRed(roofDetailRedX, roofDetailRedY){
    fill(100, 10, 10);
    arc(roofDetailRedX, roofDetailRedY, 100, 80, 0, + PI);
}

function draw () {
    for (let i = 1; i < 11; i++) {
        tentBackground(rectX * i, rectY);
    }

    for (let i = 0; i < 6; i++) {
        roofDetailWhite(roofDetailWhiteX * i, roofDetailWhiteY);
    }

    for (let i = 0; i < 6; i++) {
        roofDetailRed(roofDetailRedX * i * 2, roofDetailRedY); 
    }


    roofTop();

}