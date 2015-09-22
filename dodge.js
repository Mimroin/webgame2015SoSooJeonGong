var imgBackground = new Image();
imgBackground.src = "background.jpg";
var intPlayerX = 460,
    intPlayerY = 270,
    intPlayerWidth = 50,
    intPlayerHeight = 50;
var moveSpeed = 5;
var virus = new Image();
virus.src = "virus.png";
var Game_STATE_READY = 0,
    Game_STATE_GAME = 1,
    GAME_STATE_OVER = 2;
var GameState = Game_STATE_READY;

var FPS = 30;
var intervalID;
var CHAR_COLOR = 0;

var tempVirus1 = {
    x : 0,
    y : 0,
    go_x : 1,
    go_y : 1
};
var tempVirus2 = {
    x : 960,
    y : 0,
    go_x : -1,
    go_y : 1
};
var tempVirus3 = {
    x : 960,
    y : 600,
    go_x : -1,
    go_y : -1
};
var tempVirus4 = {
    x : 0,
    y : 600,
    go_x : 1,
    go_y : -1
};

var skilltimer, skilltimer_count;
function skill() {
    var timer = setTimeout(skill_counting,3000);
}
function skill_counting(){
    CHAR_COLOR++;
}
var imgChar = new Image(),
    imgChar_g = new Image();
imgChar.src = "char.png";
imgChar_g.src = "char_g.png";

imgChar.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", onkeydown, false);
window.addEventListener("keyup", onkeyup, false);

var moveLeft = false,
    moveRight = false,
    moveUp = false,
    moveDown = false;
function onGameStart(){
    intervalID = setInterval(MoveVirus,100);
}
function MoveVirus(){
    tempVirus1.x += tempVirus1.go_x * 10;
    tempVirus1.y += tempVirus1.go_y * 10;
    tempVirus2.x += tempVirus2.go_x * 10;
    tempVirus2.y += tempVirus2.go_y * 10;
    tempVirus3.x += tempVirus3.go_x * 10;
    tempVirus3.y += tempVirus3.go_y * 10;
    tempVirus4.x += tempVirus4.go_x * 10;
    tempVirus4.y += tempVirus4.go_y * 10;
    drawScreen();
}
function onkeydown(e) {
    if (GameState == Game_STATE_READY) {
        if (e.keyCode == 13) {
            GameState = Game_STATE_GAME;
            onGameStart();
        }
    } else if (GameState == Game_STATE_GAME) {
        switch (e.keyCode) {
        case 32:
            CHAR_COLOR++;
            skill();
            break;
        case 37:
            moveLeft = true;
            break;
        case 39:
            moveRight = true;
            break;
        case 38:
            moveUp = true;
            break;
        case 40:
            moveDown = true;
            break;
        case 82:
            intPlayerX = 440;
            intPlayerY = 260;
            break;
        }
    } else if (GameState == GAME_STATE_OVER) {
        if (e.keyCode == 13) {
            GameState = Game_STATE_READY;
        }
    }
    drawScreen();
}

function onkeyup(e) {
    switch (e.keyCode) {
    case 37:
        moveLeft = false;
        break;
    case 39:
        moveRight = false;
        break;
    case 38:
        moveUp = false;
        break;
    case 40:
        moveDown = false;
        break;
    }
    drawScreen();
}

function Update() {
    if (moveLeft == true) {
        intPlayerX -= moveSpeed;
        if (intPlayerX < 0) {
            intPlayerX = 0;
        }
    }
    if (moveRight == true) {
        intPlayerX += moveSpeed;
        if (intPlayerX > 910) {
            intPlayerX = 910;
        }
    }
    if (moveUp == true) {
        intPlayerY -= moveSpeed;
        if (intPlayerY < 0) {
            intPlayerY = 0;
        }
    }
    if (moveDown == true) {
        intPlayerY += moveSpeed;
        if (intPlayerY > 550) {
            intPlayerY = 550;
        }
    }
}

function drawScreen() {
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    Context.drawImage(imgBackground, 0, 0, 960, 600);
    if (CHAR_COLOR % 2 == 1) {
        Context.drawImage(imgChar, intPlayerX, intPlayerY, intPlayerWidth, intPlayerHeight);
        moveSpeed = 9;
    }
    if (CHAR_COLOR % 2 == 0) {
        Context.drawImage(imgChar_g, intPlayerX, intPlayerY, intPlayerWidth, intPlayerHeight);
        moveSpeed = 5;
    }
    if (GameState == Game_STATE_READY) {
        Context.fillText("Ready!", 470, 250);
    }
    else if (GameState == Game_STATE_GAME) {
        Context.fillText("Go!", 475, 250);
        Context.drawImage(virus,tempVirus1.x,tempVirus1.y);
        Context.drawImage(virus,tempVirus2.x,tempVirus2.y);
        Context.drawImage(virus,tempVirus3.x,tempVirus3.y);
        Context.drawImage(virus,tempVirus4.x,tempVirus4.y);
    }
    else if (GameState == GAME_STATE_OVER) {
        Context.font = '60px NanumGothicCoding';
        Context.fillText("Game Over", 400, 300);
    }
    Update();
}

update1 = setInterval(Update, 40);
rending = setInterval(drawScreen, 1000 / FPS);