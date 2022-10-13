const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

class SnakePart  {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 9;

const tileCount = 23;
let tileSize = canvas.width / tileCount;
let headX = 10;
let headY = 10;



let itemX1 = 5;
let itemY1 = 5;


let itemX2 = 5;
let itemY2 = 5;


let xVel =0;
let yVel =0;

let score = 0;

const snakeParts = [];
let tailLength = 1;

function drawGame(){

    movementSnake();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    checkItemCollision1();
    checkItemCollision2();

    Snake();
    Item1();
    Item2();
    

    setTimeout(drawGame, 1000/speed);


    gameScore();

}


function isGameOver(){
    let gameOver = false;

    if(xVel ===0 && yVel ===0){   
        return false;
    }

    if(headX < 0){
        gameOver = true;
    }
    else if (headX === tileCount){
        gameOver = true;
    }
    else if (headY <0){
        gameOver = true;
    }
    else if (headY === tileCount){
        gameOver = true;
    }

    for (let i=0; i< snakeParts. length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    if(gameOver){
        alert("Game Over: Refresh Page to Try Again");
    }

        return gameOver;

}

function gameScore (){
    ctx.fillStyle = "black";
    ctx.font = "10px Arial, Helvetica, sans-serif;"
    ctx.fillText("Score " + score, canvas.width -50, 10);
}



function clearScreen(){
    ctx.fillStyle = 'rgb(77, 77, 131)';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height);


}


function Snake(){

    ctx.fillStyle= 'greenyellow';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    ctx.fillStyle = 'green';
    for(let i=0; i< snakeParts.length; i++) {
        let part = snakeParts [i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
        while (snakeParts.length> tailLength){
            snakeParts.shift();
        }

}

function Item1(){
    ctx.fillStyle= 'red'
    ctx.fillRect (itemX1 * tileCount, itemY1 *tileCount, tileSize, tileSize)


}


function Item2(){
    ctx.fillStyle= 'yellow'
    ctx.fillRect (itemX2 * tileCount, itemY2 *tileCount, tileSize, tileSize)


}



function movementSnake(){
    headX = headX + xVel;
    headY = headY + yVel;

}


document.body.addEventListener ('keydown', keyDown);

function keyDown(event) {
    if(event.keyCode == 87){
        if(yVel == 1)
            return;
        yVel = -1;
        xVel = 0;
    }

    if(event.keyCode == 83){
        if(yVel == -1)
            return;
        yVel = 1;
        xVel = 0;
    }

    if(event.keyCode == 65){
        if(xVel == 1)
            return;
        yVel = 0;
        xVel = -1;
    }

    if (event.keyCode == 68){
        if(xVel == -1)
            return;
        yVel = 0;
        xVel = 1;

    }
}



function checkItemCollision1(){
    if(itemX1 == headX && itemY1 == headY){
        itemX1 = Math.floor(Math.random()* tileCount);
        itemY1 = Math.floor(Math.random()* tileCount);
        tailLength++;
        score++;
    }
}

function checkItemCollision2(){
    if(itemX2 == headX && itemY2 == headY){
        itemX2 = Math.floor(Math.random()* tileCount);
        itemY2 = Math.floor(Math.random()* tileCount);
        tailLength+=2;
        score+=2;
    }
}

drawGame();

