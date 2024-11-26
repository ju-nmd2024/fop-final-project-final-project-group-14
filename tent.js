function setup(){
    createCanvas(1200, 900);
    background(255, 255, 255);
}
 
function tentBackground() {
    noStroke();
    fill(100, 10, 10);
    rect(100, 300, 50, 600);
    fill(210, 215, 215);
    rect(150, 300, 50, 600);
}



function draw () {
    for (let i = 0; i < 5; i++)
    tentBackground();
}