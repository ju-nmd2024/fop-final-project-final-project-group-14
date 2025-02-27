import Block from "./block.js";
import Ball from "./ball.js";
import Paddle from "./paddle.js";
import PowerUp from "./powerup.js";
import Food from "./food.js";
import Player from "./player.js";
import Button from "./button.js";
import Coin from "./coin.js";

// game elements variables
let paddle = new Paddle(600);
let player = new Player();
let blocks = [];
let rowNumber = 5; //how many rows
let columnNumber = 10; //how many columns
let balls = [];
let powerUps = [];
let foods = [];
let gameState = "start";
let gameTimer = 0;
let paused = false;
let coins = [];

// images variables
let titleImage;
let soda;
let cottonCandy;
let hotDog;

// buttons
const againButton = new Button(650, 700, 150, 60, "PLAY AGAIN");
const backHomeButton = new Button(400, 700, 150, 60, "BACK HOME");
const rulesButton = new Button(400, 600, 150, 60, "RULES");
const playButton = new Button(650, 600, 150, 60, "PLAY");
const backButton = new Button(550, 700, 150, 60, "BACK");
const resumeButton = new Button(525, 500, 150, 60, "RESUME");

// background variables
let rectX = 100;
let rectY = 250;
let roofDetailWhiteX = 200;
let roofDetailWhiteY = 250;
let roofDetailRedX = 200;
let roofDetailRedY = 250;
let roofPeak = 100;

// leaderboard variables
let currentPlayer;
let player1 = new Player("--");
player1.score = 0;
let player2 = new Player("--");
player2.score = 0;
let player3 = new Player("--");
player3.score = 0;
let player4 = new Player("--");
player4.score = 0;
let player5 = new Player("--");
player5.score = 0;
let player6 = new Player("--");
player6.score = 0;
let player7 = new Player("--");
player7.score = 0;
let player8 = new Player("--");
player8.score = 0;
let player9 = new Player("--");
player9.score = 0;
let player10 = new Player("--");
player10.score = 0;

let winners = [
  player10,
  player9,
  player8,
  player7,
  player6,
  player5,
  player4,
  player3,
  player2,
  player1,
];

let nameField;
let settingUp = true;
let nameOk = false;


function setup() {
  frameRate(30);
  createCanvas(1200, 800);
  background(255, 255, 255);
}
window.setup = setup;

function preload() {
  titleImage = loadImage("Images/Mr.Giffords Aerial Circus v5 Mirrored.png");
  cottonCandy = loadImage("Images/Cotton Candy.png");
  soda = loadImage("Images/Soda.png");
  hotDog = loadImage("Images/Hot Dog.png");
}
window.preload = preload;


// change page when click on button
function mouseClicked() {
  if (gameState === "start") {
    if (playButton.hitTest(mouseX, mouseY)) {
      gameState = "load";
    } else if (rulesButton.hitTest(mouseX, mouseY)) {
      gameState = "rules";
    }
  } else if (gameState === "rules") {
    if (backButton.hitTest(mouseX, mouseY)) {
      gameState = "start";
    }
  } else if (gameState === "game over") {
    if (againButton.hitTest(mouseX, mouseY)) {
      gameState = "load";
    } else if (backHomeButton.hitTest(mouseX, mouseY)) {
      gameState = "start";
    }
  } else if (paused && resumeButton.hitTest(mouseX,mouseY)) {
    paused = false;
  }
}
window.mouseClicked = mouseClicked;

// functions for the backgroung graphics
function tentBackground(rectX, rectY) {
  noStroke();
  fill(70, 10, 10);
  rect(rectX, rectY, 100, 700);
  fill(150, 150, 150);
  rect(rectX + 50, rectY, 50, 700);
}

function roofTop() {
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

function roofDetailRed(roofDetailRedX, roofDetailRedY) {
  fill(100, 10, 10);
  arc(100 + roofDetailRedX, roofDetailRedY, 100, 80, 0, + PI);
}


//calculates a random angle for the start of the ball on the paddle
function randomAngle() {
  return (
    Math.random() * (2 * PI - QUARTER_PI - (PI + QUARTER_PI)) +
    (PI + QUARTER_PI)
  );
}

// checks if all the blocks are not active
function allBlocksHit() {
  let count = 0;
  for (let i = 0; i < columnNumber; i++) {
    for (let j = 0; j < rowNumber; j++) {
      if (blocks[i][j].isActive === false || blocks[i][j].isBad) {
        count++; //count how many bad and inactive blocks are there
      }
    }
  }
  return columnNumber * rowNumber === count; // returns whether all the block are deactivated or not
}

// generates the blocks on the grid, and the arrays with bad (random bounce angle) and special blocks (hidden powerups)
function gridBlocks() {
  let specialIndexes = [];
  let badIndexes = [];
  // Generate random indices for special and bad blocks
  while (specialIndexes.length < 8) {
    let specialIndex = Math.floor(Math.random() * (rowNumber * columnNumber));
    specialIndexes.push(specialIndex);
  }

  while (badIndexes.length < 5) {
    let badIndex = Math.floor(Math.random() * (rowNumber * columnNumber));
    badIndexes.push(badIndex);
  }

  let count = 0; // start counting the blocks
  for (let i = 0; i < columnNumber; i++) {
    blocks[i] = [];
    for (let j = 0; j < rowNumber; j++) {
      blocks[i][j] = new Block(200 + 80 * i, 350 + 50 * j, rowNumber - 1 - j);
      count++;
      // if the block number (count) is bad or special, flag the block.
      if (badIndexes.includes(count)) { // includes() from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        blocks[i][j].isBad = true;
      }
      if (specialIndexes.includes(count)) {
        blocks[i][j].isSpecial = true;
      }
    }
  }
}

// checks collision between all the blocks and a ball
function checkCollision(ball) {
  // variables to adjust the direction (see citation at line 289)
  let adjustX = false;
  let adjustY = false;
  let angle = 0;

  for (let i = 0; i < columnNumber; i++) {
    for (let j = 0; j < rowNumber; j++) {
      let block = blocks[i][j];

      //if the block is hit
      if (block.isActive && block.hit(ball) && block.justHit === false) {
        // flag so you cant hit it repeatedly in same frame
        block.justHit = true;

        if (block.isBad === false) { //when the block is not bad, increase the score
          player.score += 5;
          //decrease hit point
          block.hitPoint -= 1;
        }

        // calculate overlaps
        let overlapLeft = ball.x + ball.r - block.x;
        let overlapRight = block.x + block.width - (ball.x - ball.r);
        let overlapTop = ball.y + ball.r - block.y;
        let overlapBottom = block.y + block.height - (ball.y - ball.r);

        // find the smallest overlap to determine collision side
        let minOverlap = Math.min(
          overlapLeft,
          overlapRight,
          overlapTop,
          overlapBottom
        );

        //Reposition ball and flag what direction to change and change the angle
        if (minOverlap === overlapTop) {
          adjustY = true;
          ball.y = block.y - ball.r - 1;
          ball.y -= 2;
          angle = -randomAngle();
        } else if (minOverlap === overlapBottom) {
          adjustY = true;
          ball.y = block.y + block.height + ball.r + 1;
          ball.y += 2;
          angle = randomAngle();
        } else if (minOverlap === overlapLeft) {
          adjustX = true;
          ball.x = block.x - ball.r - 1;
          angle = randomAngle();
        } else if (minOverlap === overlapRight) {
          adjustX = true;
          ball.x = block.x + block.width + ball.r + 1;
          angle = randomAngle();
        }

        // Deactivate block if no hits left (for good blocks)
        if (block.hitPoint <= 0 && block.isBad === false) {
          block.isActive = false;
          // if the block is the special one, drop the powerUp
          if (block.isSpecial) {
            let newPowerUp = new PowerUp(
              block.x + block.width / 2,
              block.y + block.height / 2
            );
            newPowerUp.generate();
            newPowerUp.isActive = true;
            powerUps.push(newPowerUp); //add powerUps in the array, so more can be displayed at once
          }
        }
        if (block.isBad) { 
          ball.angle = angle;
        }
      }

      // Display the block if it's active
      if (block.isActive) {
        block.display();
      }
    }
  }

  // Adjust the ball's direction after all collisions
  // the adjustY and adjustX logic comes from chatGPT https://chatgpt.com/share/674b4c5e-ffec-8006-bfa8-695afdac74ad
  if (adjustY) {
    ball.directionY();
  }
  if (adjustX) {
    ball.directionX();
  }
}

//start screen graphics and buttons
function startPage() {
  rulesButton.display();
  playButton.display();
  image(titleImage, 320, 300, 595.3, 251.3);
}

//rules screen graphics and button
function rulesPage() {
  push();
  fill(0, 0, 0);
  rect(495, 140, 200, 50, 10);
  rect(130, 300, 950, 380, 20);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  textStyle(BOLD);
  text("RULES:", 600, 180);

  textFont("Courier New");
  textStyle(BOLD);
  textAlign(LEFT);
  textSize(16);
  text(
    "Use the arrow keys to move the paddle. Keep the conductor moving and break the blocks. Watch out for grey blocks! They will make the conductor bounce in unexpected directions when hit. Be ready to react quickly!\n\nThroughout the game, items will fall from random blocks.\nCatch them with your paddle, but be carefull...not everything is helpful!",
    150,
    320,
    920
  );
  text(
    "The audience might throw food onto the field.\n If it lands on your paddle, your score will decrease!!!!",
    150,
    620,
    800
  );

  text(": MULTIPLE CONDUCTORS (max 3)", 200, 485, 800);
  text(": BIGGER PADDLE", 200, 515, 800);
  text(": SMALLER PADDLE", 200, 545, 800);
  text(": LIVES +1", 200, 575, 800);

  // display different powerups colours
  fill(100, 0, 250);
  ellipse(180, 495, 25);
  fill(255, 0, 255);
  ellipse(180, 525, 25);
  fill(255, 200, 0);
  ellipse(180, 555, 25);
  fill(10, 230, 0);
  ellipse(180, 585, 25);

  pop();
  backButton.display();
}

// reset all game things
function reset() {
  player.life = 3;
  player.score = 0;
  player.name = "Your Name";

  nameOk = false;

  paddle.reset();

  foods = [];
  powerUps = [];
  balls[0] = new Ball(paddle.x, paddle.y - 10, randomAngle());

  gridBlocks();

  gameTimer = 2700;
  gameState = "game";
}

//game screen function
function gamePage() {
  //check for each of the balls if they hit the blocks
  for (let ball of balls) {
    checkCollision(ball);
  }


  // paddle
  paddle.display();
  paddle.update();

  //check if ball hit paddle
  for (let ball of balls) {
    ball.display();

    if (paddle.hit(ball)) {
      if (ball.hasBounced !== true) { // check if the ball has bounced, so it doesnt bounce when under the paddle
        ball.directionY();
        ball.hasBounced = true; 
      }
    } else {
      ball.hasBounced = false; 
    }

    //remove life only when player has 0 balls
    //issue with multiple balls causing game over fixed https://chatgpt.com/share/67519a81-6eac-8003-bfda-6e00dc4c33ab
    if (ball.y + ball.r >= 800) {
      if (balls.length > 1) {
        balls.splice(balls.indexOf(ball), 1);
      } else {
        if (player.life > 0) {
          player.loseLife();
          ball.reset(paddle);
        
      } else {
        gameState = "game over";
        settingUp = true;
      }
    }
  }
    ball.update();
  }

  paddle.display();
  paddle.update();

//powerups
  for (let powerUp of powerUps) {
    // catch the powerUp with the paddle
    if (paddle.hit(powerUp) === true && powerUp.isActive === true) {
      powerUp.isActive = false;

      // different types, different functions
      if (powerUp.type === 0) {
        paddle.bigger();
      } else if (powerUp.type === 1) {
        paddle.smaller();
      } else if (powerUp.type === 2) {
        //add multiple balls (to get max to 3)
        for (let i = balls.length; i < 3; i++) {
          balls.push(new Ball(paddle.x, paddle.y - 10, randomAngle()));
        }
      } else if (powerUp.type === 3) {
        player.life++;
      }
      //remove from the array of displayed powerups
      powerUps.splice(powerUps.indexOf(powerUp), 1);

    } else if (powerUp.y > height) {
      // Remove power-up off screen
      powerUps.splice(powerUps.indexOf(powerUp), 1);
    } else if (powerUp.isActive) {
      powerUp.display();
      powerUp.update();
    }
  }

  // re-set just hit flag for the next frame
  for (let i = 0; i < columnNumber; i++) {
    for (let j = 0; j < rowNumber; j++) {
      blocks[i][j].justHit = false;
    }
  }

  // Audience throwing food at an interval
  if (frameCount % 90 === 0) {
    let newFood = new Food(soda, hotDog, cottonCandy);
    newFood.generate();
    foods.push(newFood);
  }


// check if food hits the paddle
  for (let food of foods) {
    if (food.onPaddle(paddle) === true && food.isActive === true) {
      food.isActive = false;
      player.score -= 2;
    }
    if (food.isActive) {
      food.display();
      food.update();
    }
  }

  //eng game when all blocks are eliminated
  if (allBlocksHit()) {
    gameState = "game over";
    settingUp = true;
  }

  //loop and array for falling coins
  if (frameCount % 120 === 0) {
    coins.push(new Coin());

  }

  for (let i = coins.length - 1; i >= 0; i--) {
    let coin = coins [i];
    coin.update();
    coin.display();

    if (coin.collision(paddle)) {
      player.score += 10;
      //Collision with paddle being checked again https://chatgpt.com/share/67a24d3e-5b1c-8003-95fd-32d19fef84a2
      coins.splice(i, 1);
    }

    if (coin.y + coin.r >= 800) {
      coins.splice(i, 1);
      coins.push(new Coin());
    }

  }
}

// end screen
function leaderBoard() {
  push();
  fill(0);
  textFont("Courier New");
  textStyle(BOLD);
  textSize(30);
  text("YOUR SCORE: " + player.score, 900, 100);
  pop();
  if (settingUp === true) {
    // text-box input logic from "User Input: Text Fields by Samizdat" https://editor.p5js.org/Samizdat/sketches/eUsieMk6j
    nameField = createInput("");
    nameField.attribute("placeholder", "your name");
    nameField.size(215, 30);
    // position for "your name" box centering issue solved https://chatgpt.com/share/6751dbad-cfbc-8006-96f8-580963bb826e
    nameField.style('position', 'absolute');
    nameField.style('left', '50%');
    nameField.style('top', '50%');
    nameField.style('transform', 'translate(-50%, -50%) translateY(-140px)');
    settingUp = false;
  }

  push();
  //background (250, 100, 100);
  fill(0, 0, 0);
  rect(400, 140, 390, 50, 10);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  textStyle(BOLD);
  text("LEADER BOARD:", 600, 180);
  pop();

  //display winners names and scores from the array
  for (let winner of winners) {
    push();
    fill(255, 255, 255);
    textFont("Courier New");
    textStyle(BOLD);
    textSize(24);
    text("Player: " + winner.name, 350, 320 + 40 * winners.indexOf(winner));
    textAlign(RIGHT);
    text("Score: " + winner.score, 850, 320 + 40 * winners.indexOf(winner));
    pop();
  }

  //only if the player wrote its name, the buttons appear
  if (nameOk === true) {
    againButton.display();
    backHomeButton.display();
  }
}



function keyPressed() {

  if (gameState === "game over") { //on the last screen anf if the player wrote its name
    if (keyCode === ENTER && nameOk === false) {
      //save the last player info and put it into the array
      currentPlayer = new Player(nameField.value());
      currentPlayer.score = player.score;

      let index;
      for (let winner of winners) {
        if (winner.score > currentPlayer.score) { //fins the current player position on the leaderboard
          index = winners.indexOf(winner) + 1;
        }
      }
      winners.splice(index, 0, currentPlayer);
      winners.pop(); //remove the player with smaller score

      //remove the text field, so you cannot change name or add more than once
      nameField.remove();
      settingUp = false;
      nameOk = true;
    }
  }

  if (key === 'p') {
    paused = !paused;      
  }
}
window.keyPressed = keyPressed;

function draw() {
  noStroke();
  background(200, 240, 255);

  //pause menu
  if (paused) {
    
    fill(0, 0, 0, 10);
    rect(0, 0, width, height);

    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("PAUSED", width / 2, height / 2 - 50);
    textSize(20);
    text("Press P or the resum button to continue", width / 2, height / 2 + 50)
    resumeButton.display();
    

    return;
  }
  
  //background circus tent
  push();
  for (let i = 1; i < 11; i++) {
    tentBackground(rectX * i, rectY);
  }
  for (let i = 1; i < 6; i++) {
    roofDetailWhite(roofDetailWhiteX * i, roofDetailWhiteY);
  }
  for (let i = 0; i < 6; i++) {
    roofDetailRed(roofDetailRedX * i, roofDetailRedY);
  }

  roofTop();
  pop();

  //game pages
  if (gameState === "start") {
    startPage();
  } else if (gameState === "rules") {
    rulesPage();
  } else if (gameState === "load") {
    reset();
  } else if (gameState === "game") {
    if (gameTimer > 0) {
      gamePage();
      gameTimer--; //decrease timer

      //display timer, lives and score
      push();
      fill(0);
      textFont("Courier New");
      textStyle(BOLD);
      textSize(30);
      text("TIMER: " + Math.floor(gameTimer / 30), 900, 60); // timer/frameRate = seconds 
      text("SCORE: " + player.score, 900, 100);

      //heart emoji is copied and pasted from the internet https://emojipedia.org/red-heart
      let lives = [];
      for (let i = 0; i < player.life; i++) {
        lives[i] = "❤️";
      }
      text("LIVES: " + lives, 50, 60);
      text('Press P to pause', 50, 95);

      pop();
    } else { // game over when the time runs out
      gameState = "game over";
      settingUp = true;
    }
  } else if (gameState === "game over") {
    leaderBoard();
  }

  
}
window.draw = draw;
