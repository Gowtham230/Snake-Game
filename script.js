const playGround = document.getElementById("playground");
let foodX, foodY;
let snakeX, snakeY;
let velocityX =0 , velocityY =0;
let snakeBody = [];
let gameOver =false;
let setIntervalId;
let pauseGame = false;

const snakePosition = function() {
    snakeX = Math.floor(Math.random() * 30) + 1;
    snakeY = Math.floor(Math.random() * 30) + 1;
}
const foodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}



const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over please Enter to continue...");
    location.reload();
}
const changeDirection = (press) => {
    if(press.key === "w" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(press.key === "s" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(press.key === "a" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(press.key === "d" && velocityX != -1){
        velocityX =1; 
        velocityY =0;
    }
    else if(press.key === "p"){
        pauseGame(true);
        pauseGame != pauseGame
    }
}


const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        foodPosition();
        snakeBody.push([foodX, foodY]);
        
    }

    snakeBody[0] = [snakeX, snakeY];
   for(let i=snakeBody.length-1; i>0;i--){
    snakeBody[i] = snakeBody[i-1];
   }
      
    if(snakeX <= 0 || snakeX >= 30 || snakeY <= 0 || snakeY >= 30){
        gameOver = true;
    }

    snakeX += velocityX;
    snakeY += velocityY;
    for(let i=0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
       }
    playGround.innerHTML = htmlMarkup;
}
snakePosition();
foodPosition();
setIntervalId=setInterval(initGame,150);
document.addEventListener("keydown", changeDirection);