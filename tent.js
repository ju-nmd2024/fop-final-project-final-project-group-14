let rectX = 100;
let rectY = 250;
let roofDetailX = 200;
let roofDetailY = 250;
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

}