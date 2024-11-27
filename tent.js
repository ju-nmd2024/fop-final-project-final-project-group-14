let rectX = 100;
let rectY = 250;
let roofDetailX = 100;
let roofDetailY = 250;
// let rectRedX = 150;
// let rectRedY = 300;


function setup(){
    createCanvas(1200, 900);
    background(255, 255, 255);
}
 
function tentBackground(rectX, rectY) {
    noStroke();
    fill(100, 10, 10);
    rect(rectX, rectY, 100, 700);
    fill(200, 215, 215);
    rect(rectX + 50, rectY, 50, 700);
}

function roofDetail() {
    fill(100, 10, 10);
    arc(100, 250, 80, 80, HALF_PI + PI);
}

function draw () {
    for (let i = 2; i < 10; i++){
        tentBackground(rectX * i , rectY);
    }

    roofDetail();
}