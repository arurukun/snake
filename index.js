const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

let speed=4;

let tileCount=20;
let tileSize=canvas.width / tileCount - 2;
let headX=10;
let headY=10;

const snakeParts=[];
let tailLength=2;

let appleX=10;
let appleY=7;
 
let xVelocity=0;
let yVelocity=0;

let score=0;

const gulpSound=new Audio("gulp.mp3");

// game loop

function drawGame(){
    changeSnakePosition();
    if(isGameOver()){
        return;
    }

    drawScreen();
    checkAppleCollision();
    drawapple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
    let gameOver=false;

    if(yVelocity===0 && xVelocity===0) return false;

    // wall
    if(headX < 0){
        gameOver=true;
    }

    else if(headX === tileCount){
        gameOver=true;
    }

    else if(headY < 0){
        gameOver=true;
    }

    else if(headY === tileCount){
        gameOver=true;
    }

    for(let i=0; i < snakeParts.length; i++){
        let part=snakeParts[i];
        if(part.x===headX && part.y===headY){
            gameOver=true;
        }
    }


    if (gameOver){
        ctx.fillStyle="white";
        ctx.font="50px Verdana";

        var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        console.log(gradient)
        
        // fill with gradient
        ctx.fillStyle=gradient;

        ctx.fillText("Game Over!",canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle="white";
    ctx.font="10px Verdana";
    ctx.fillText("score " + score,canvas.width-50, 10);
}


function drawScreen(){
    ctx.fillStyle= "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    
    ctx.fillStyle="green";
    for (let i = 0; i < snakeParts.length; i++){
        ctx.fillRect(snakeParts[i].x * tileCount,snakeParts[i].y * tileCount,tileSize,tileSize)
    }

    ctx.fillStyle="orange";
    ctx.fillRect(headX * tileCount,headY * tileCount,tileSize,tileSize);
    
    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
}

function changeSnakePosition(){
    headX=headX+xVelocity;
    headY=headY+yVelocity;

}
function drawapple(){
    ctx.fillStyle="red";
    ctx.fillRect(appleX * tileCount,appleY * tileCount,tileSize,tileSize);
}

function checkAppleCollision(){
    if (appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener("keydown",keyDown);

function keyDown(event){
    // up
    if(event.keyCode == 38 && yVelocity != 1){
        yVelocity=-1;
        xVelocity=0;
    }

    // down
    if(event.keyCode == 40 && yVelocity != -1){
        yVelocity=1;
        xVelocity=0;
    }

    // left
    if(event.keyCode == 37 && xVelocity !=1){
        yVelocity=0;
        xVelocity=-1;
    }

        // right
    if(event.keyCode == 39  && xVelocity !=-1){
        yVelocity=0;
        xVelocity=1;
    }
}

drawGame();
