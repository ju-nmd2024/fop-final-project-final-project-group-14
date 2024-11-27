let rectX = 100;
let rectY = 250;
let roofDetailX = 200;
let roofDetailY = 250;
let roofPeak = 100;
// let rectRedX = 150;
// let rectRedY = 300;


function setup(){
    createCanvas(1200, 900);
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

function roofDetail(roofDetailX, roofDetailY) {
    fill(220, 220, 220);
    arc(roofDetailX, roofDetailY, 100, 80, 0, + PI);
    fill(100, 10, 10);
    arc(roofDetailX + 100, roofDetailY, 100, 80, 0, + PI);
}

function draw () {
    for (let i = 1; i < 11; i++) {
        tentBackground(rectX * i, rectY);
    }

    for (let i = 0; i < 7; i++) {
        roofDetail(roofDetailX * i, roofDetailY);
    }

    roofTop();

}