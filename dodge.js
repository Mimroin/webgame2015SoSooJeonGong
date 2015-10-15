var imgBackground = new Image();
imgBackground.src = "background.jpg";
var intPlayerX = 460,
    intPlayerY = 270,
    intPlayerWidth = 50,
    intPlayerHeight = 50;
var moveSpeed = 2.5;
var survive_time = 0;
var skill_image = new Image();
skill_image.src = "skill_value.png"
var virus = new Image();
virus.src = "virus.png";
counting_game = 0;
var howto = new Image();
howto.src = "howto.png";
var reset_button = new Image();
reset_button.src = "button.png";
var GAME_STATE_READY = 0,
    GAME_STATE_GAME = 1,
    GAME_STATE_OVER = 2;
var GameState = GAME_STATE_READY;
var skill_value = 3;
var maked_virus = 0;
hitEffect = new Audio();
hitEffect.src = "hit.wav";
document.body.appendChild(hitEffect);
var reset = 0;

function onGameReady() {
    GameState = GAME_STATE_READY;
    intPlayerX = 460;
    intPlayerY = 260;
    skill_value = 3;
    survive_time = 0;
    reset = 0;
    maked_virus = 0;

    while (arrViruses.length != 0) {
        arrViruses.pop();
    }
}

function howSurvive() {
    survive_time++;
}

function onGameStart() {
    if (reset == 0) {
        GameState = GAME_STATE_GAME;
        intervalID1 = setInterval(MoveVirus, 100);
        intervalID2 = setInterval(howSurvive, 1000);
    }
    for (var i = 0; i < 50; i++) {
        var BallType = RandomNextInt(4);
        var intX, intY, intGoX, intGoY;
        switch (BallType) {
        case 1:
            intX = 0;
            intY = RandomNextInt(600);
            intGoX = RandomNextInt(2) / 2;
            intGoY = -2 + RandomNextInt(4) / 2;
            break;

        case 2:
            intX = 960;
            intY = RandomNextInt(600);
            intGoX = RandomNextInt(2) * -1 / 2;
            intGoY = -2 + RandomNextInt(4) / 2;
            break;

        case 3:
            intX = RandomNextInt(960);
            intY = 0;
            intGoX = -2 + RandomNextInt(4) / 2;
            intGoY = RandomNextInt(2) / 2;
            break;

        case 4:
            intX = RandomNextInt(960);
            intY = 600;
            intGoX = -2 + RandomNextInt(4) / 2;
            intGoY = RandomNextInt(2) * -1 / 2;
            break;
        }
        maked_virus++;
        arrViruses.push({
            x: intX,
            y: intY,
            go_x: intGoX,
            go_y: intGoY
        });
    }
}

function onGameOver() {
    GameState = GAME_STATE_OVER;
    clearInterval(intervalID1);
    clearInterval(intervalID2);
    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    hitEffect.play();
}

var arrViruses = new Array();

var FPS = 60;
var intervalID1;
var intervalID2;
var CHAR_COLOR = 0;



var skilltimer, skilltimer_count;

function skill() {
    var timer = setTimeout(skill_counting, 3000);
}

function skill_counting() {
    CHAR_COLOR++;
    skill_value--;
}
var imgChar = new Image(),
    imgChar_g = new Image();
imgChar_dead = new Image();
imgChar.src = "char.png";
imgChar_g.src = "char_g.png";
imgChar_dead.src = "char_dead.png";

imgChar.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", onkeydown, false);
window.addEventListener("keyup", onkeyup, false);

var moveLeft = false,
    moveRight = false,
    moveUp = false,
    moveDown = false;

function RandomNextInt(max) {
    return 1 + Math.floor(Math.random() * max);
}

function MoveVirus() {
    for (var i = 0; i < arrViruses.length; i++) {
        arrViruses[i].x += arrViruses[i].go_x * 10;
        arrViruses[i].y += arrViruses[i].go_y * 10;
        if (IsCollisionWithPlayer(arrViruses[i].x, arrViruses[i].y)) {
            onGameOver();
        };
        if (arrViruses[i].x < 0 || arrViruses[i].x > 960 || arrViruses[i].y < 0 || arrViruses[i].y > 600) {
            var BallType = RandomNextInt(4);
            switch (BallType) {
            case 1:
                arrViruses[i].x = 0;
                arrViruses[i].y = RandomNextInt(600);
                arrViruses[i].go_x = RandomNextInt(2) / 2;
                arrViruses[i].go_y = -2 + RandomNextInt(4) / 2;
                maked_virus++;
                break;

            case 2:
                arrViruses[i].x = 960;
                arrViruses[i].y = RandomNextInt(600);
                arrViruses[i].go_x = RandomNextInt(2) * -1 / 2;
                arrViruses[i].go_y = -2 + RandomNextInt(4) / 2;
                maked_virus++;
                break;

            case 3:
                arrViruses[i].x = RandomNextInt(960);
                arrViruses[i].y = 0;
                arrViruses[i].go_x = -2 + RandomNextInt(4) / 2;
                arrViruses[i].go_y = RandomNextInt(2) / 2;
                maked_virus++;
                break;

            case 4:
                arrViruses[i].x = RandomNextInt(960);
                arrViruses[i].y = 600;
                arrViruses[i].go_x = -2 + RandomNextInt(4) / 2;
                arrViruses[i].go_y = RandomNextInt(2) * -1 / 2;
                maked_virus++;
                break;
            }
        }

    }
    drawScreen();
}

function onkeydown(e) {
    if (GameState == GAME_STATE_READY) {
        if (e.keyCode == 13) {
            GameState = GAME_STATE_GAME;
            onGameStart();
        }
    } else if (GameState == GAME_STATE_GAME) {
        switch (e.keyCode) {
        case 32:
            if (skill_value != 0) {
                if (CHAR_COLOR % 2 == 1) {}
                if (CHAR_COLOR % 2 == 0) {
                    CHAR_COLOR++;
                }
                skill();
            }
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
            //R키를 누르면 발동하는 것
            if (reset == 0 || reset < 2) {
                while (arrViruses.length != 0) {
                    arrViruses.pop();
                }
                reset++;
                onGameStart();
                break;
            }
        }
    } else if (GameState == GAME_STATE_OVER) {
        if (e.keyCode == 13) {
            onGameReady();
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
    if (moveLeft == true && moveUp == true) {
        intPlayerX -= (moveSpeed * 0.72);
        intPlayerY -= (moveSpeed * 0.72);
        if (intPlayerX < 0) {
            intPlayerX = 0;
        }
        if (intPlayerY < 0) {
            intPlayerY = 0;
        }
    }
    if (moveLeft == true && moveDown == true) {
        intPlayerX -= (moveSpeed * 0.72);
        intPlayerY += (moveSpeed * 0.72);
        if (intPlayerX < 0) {
            intPlayerX = 0;
        }
        if (intPlayerY > 550) {
            intPlayerY = 550;
        }
    }
    if (moveRight == true && moveUp == true) {
        intPlayerX += (moveSpeed * 0.72);
        intPlayerY -= (moveSpeed * 0.72);
        if (intPlayerX > 910) {
            intPlayerX = 910;
        }
        if (intPlayerY < 0) {
            intPlayerY = 0;
        }
    }
    if (moveRight == true && moveDown == true) {
        intPlayerX += (moveSpeed * 0.72);
        intPlayerY += (moveSpeed * 0.72);
        if (intPlayerX > 910) {
            intPlayerX = 910;
        }
        if (intPlayerY > 550) {
            intPlayerY = 550;
        }
    }
    if (moveLeft == true && moveUp == false && moveDown == false) {
        intPlayerX -= moveSpeed;
        if (intPlayerX < 0) {
            intPlayerX = 0;
        }
    }
    if (moveRight == true && moveUp == false && moveDown == false) {
        intPlayerX += moveSpeed;
        if (intPlayerX > 910) {
            intPlayerX = 910;
        }
    }
    if (moveUp == true && moveRight == false && moveLeft == false) {
        intPlayerY -= moveSpeed;
        if (intPlayerY < 0) {
            intPlayerY = 0;
        }
    }
    if (moveDown == true && moveRight == false && moveLeft == false) {
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
    if (GameState == GAME_STATE_GAME) {
        if (CHAR_COLOR % 2 == 1) {
            Context.drawImage(imgChar, intPlayerX, intPlayerY, intPlayerWidth, intPlayerHeight);
            moveSpeed = 1.5;
        }
        if (CHAR_COLOR % 2 == 0) {
            Context.drawImage(imgChar_g, intPlayerX, intPlayerY, intPlayerWidth, intPlayerHeight);
            moveSpeed = 2.5;
        }
    }
    if (GameState == GAME_STATE_OVER) {
        Context.drawImage(imgChar_dead, intPlayerX, intPlayerY, intPlayerWidth, intPlayerHeight);
    }
    if (GameState == GAME_STATE_READY) {
        if (counting_game == 0) {
            Context.drawImage(howto, 150, 80);
        }
        if (counting_game != 0) {
            Context.font = '60px NanumGothicCoding';
            Context.fillStyle = "#000";
            Context.fillText("Ready!", 400, 300);
        }
    } else if (GameState == GAME_STATE_GAME) {
        Context.font = '20px NanumGothicCoding';
        Context.fillStyle = "#FFF";
        Context.fillText("생존시간 : " + survive_time + "초", 800, 20);
        Context.fillText("바이러스 : " + maked_virus + "개", 800, 45);
        for (var i = 0; i < arrViruses.length; i++) {
            Context.drawImage(virus, arrViruses[i].x, arrViruses[i].y);
        }
    } else if (GameState == GAME_STATE_OVER) {
        Context.font = '60px NanumGothicCoding';
        Context.fillStyle = "#000";
        Context.fillText("Game Over", 335, 310);
        for (var i = 0; i < arrViruses.length; i++) {
            Context.drawImage(virus, arrViruses[i].x, arrViruses[i].y);
        }
        Context.font = '20px NanumGothicCoding';
        Context.fillStyle = "#FFF";
        Context.fillText("생존시간 : " + survive_time + "초", 800, 20);
        Context.fillText("바이러스 : " + maked_virus + "개", 800, 45);
    }
    if (skill_value == 3) {
        Context.drawImage(skill_image, 10, 10);
        Context.drawImage(skill_image, 50, 10);
        Context.drawImage(skill_image, 90, 10);
    } else if (skill_value == 2) {
        Context.drawImage(skill_image, 10, 10);
        Context.drawImage(skill_image, 50, 10);
    } else if (skill_value == 1) {
        Context.drawImage(skill_image, 10, 10);
    }
    if (reset == 0) {
        Context.drawImage(reset_button, 10, 50);
        Context.drawImage(reset_button, 50, 50);
    } else if (reset == 1) {
        Context.drawImage(reset_button, 10, 50);
    }
    Update();
}

function IsCollisionWithPlayer(x, y) {
    if (intPlayerX + 55 > x && intPlayerX < x + 20 && intPlayerY < y + 20 && intPlayerY + 50 > y) {
        return true;
    }
    return false;
}
update1 = setInterval(Update, 1);
rending = setInterval(drawScreen, 1000 / FPS);