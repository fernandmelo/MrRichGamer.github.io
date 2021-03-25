//p5.play 
// game control
var stage = 0;

//player
var p1X = 400;
var p1Y = 375;
var pWidth = 50;
var pHeight = 50;
var moveRight = true
var moveLeft = true

//plataformas
var b1X = 650;
var b1Y = 390;
var bWidth = 50;
var bHeight = 25;

var b2X = 50;
var b2Y = 350;
var b2Width = 50;
var b2Height = 50;
//gravity
var jump = false;
var direction = 1; // force of gravyty in the y direction
var velocity = 2; //speed of player
var jumpPower = 15; // força do salto, quão alto
var fallingSpeed = 2; //equal to velocity
var minHeight = 375; //height of ground
var maxHeight = 50; //altura do ceu
var jumpCounter = 0; //keeps track of how much of we are jumping

let b = 0;


var counter = 0;

let salto = 0

var score = 10000
var end = true

function convertSeconds(s) {
    var min = floor(s / 60);
    var sec = s % 60;
    return nf(min, 2) + ':' + nf(sec, 2)
}

function setup() {
    createCanvas(800, 500);
    getAudioContext().resume();
    rectMode(CENTER);
    textAlign(CENTER);
    var timer = select("#timer");
    timer.html(convertSeconds(counter));

    function timeIt() {
        counter++
        timer.html(convertSeconds(counter));
    }
    setInterval(timeIt, 1000)
}


function draw() {
    keyPressed();
    keyTyped();
    gravity();

    if (stage == 0) {
        game();
    }
}

function game() {
    //appearance
    background(150, 230, 240); //céu
    //personagem
    stroke(0);
    strokeWeight(5);
    fill(255, 120, 0);
    rect(b1X, b1Y, bWidth, bHeight);
    noStroke();
    fill(100, 200, 75); // verde
    rect(width / 2, 450, width, 100); //grass
    noFill();
    stroke(0);
    strokeWeight(15);
    rect(width / 2, height / 2, width, height);

    //bola
    stroke(0);
    strokeWeight(5);
    fill(255, 0, 0);
    ellipse(p1X, p1Y, pWidth, pHeight);

    if (b == 1) {
        noStroke()
        fill(230, 158, 0)
        rect(b2X, b2Y, b2Width, b2Height)
    } else if (b == 2 && end == true) {
        score = score - (millis())
        score = score
        end = false
    } else if (end == false) {
        textSize(50)
        text(score, width / 2, height / 2)
    }

    //collisions
    if (p1X >= b1X - bWidth / 2 && p1X <= b1X + bWidth / 2 && p1Y + pHeight / 2 >= b1Y - bHeight / 2 && p1Y + pHeight / 2 <= b1Y + bHeight / 2 && jump == false) {
        p1Y = p1Y;
        jumpCounter = 0;
        velocity = 0;
        b = 1
    }
    if (p1X >= b2X - b2Width / 2 && p1X <= b2X + b2Width / 2 && p1Y + pHeight / 2 >= b2Y - b2Height / 2 && p1Y + pHeight / 2 <= b2Y + b2Height / 2) {
        p1Y = p1Y;
        b = 2
    }
    if (p1X + pWidth / 2 >= width) { moveRight = false } else(moveRight = true)
    if (p1X - pWidth / 2 <= 0) { moveLeft = false } else(moveLeft = true)
}

function gravity() {


    if (p1Y >= minHeight && jump == false) {
        p1Y = p1Y;
        jumpCounter = 0;
    } else {
        p1Y = p1Y + (direction * velocity); //code that makes gravity work   
    }

    if (jump == true) {

        if (p1Y <= maxHeight || jumpCounter >= jumpPower) {
            if (p1Y >= minHeight) {
                p1Y = minHeight;
                //faltava esta parte do código para a bola parar na plataforma enquanto carregas na tecla
            } else if (p1X >= b1X - bWidth / 2 && p1X <= b1X + bWidth / 2 && p1Y + pHeight / 2 >= b1Y - bHeight / 2 && p1Y + pHeight / 2 <= b1Y + bHeight / 2) {
                p1Y = b1Y - bHeight / 2 - pHeight / 2;
            } else {
                velocity = fallingSpeed;
            }
        } else {
            velocity = -jumpPower;
            jumpCounter = jumpCounter + 1;
        }
    } else {
        velocity = fallingSpeed;
    }
}

function keyPressed() {
    if (keyDown('LEFT_ARROW') && moveLeft == true) {
        p1X = p1X - 5;
    }
    if (keyDown('RIGHT_ARROW') && moveRight == true) {
        p1X = p1X + 5;
    }

}

function keyTyped() {
    if (keyDown('a')) {
        jump = true;

    } else {
        jump = false;
    }
}
switch (b) {
    case 0:

        break;
    case 1:

        break;
    case 2:

        break;
}