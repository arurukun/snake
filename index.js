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
let tailLenght=2;

let appleX=10;
let appleY=7;
 
let xVelocity=0;
let yVelocity=0;

// game loop

function drawGame(){
    drawScreen();
    changeSnakePosition();
    checkAppleCollision();
    drawapple();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}


function drawScreen(){
    ctx.fillStyle= "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    
    ctx.fillStyle="green";
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount,part.y * tileCount,tileSize,tileSize);
    }

    ctx.fillStyle="orange";
    ctx.fillRect(headX * tileCount,headY * tileCount,tileSize,tileSize);
    
    snakeParts.push(new SnakePart(headX,headY));

    if(snakeParts.length > tailLenght){
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
        tailLenght++
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