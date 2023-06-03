const gameboard=document.getElementById("gameBoard");
const ctx=gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const highScoreText = document.getElementById("highscoreText");
const resetBtn = document.getElementById("reset");
const controls = document.querySelectorAll(".keyarea i");
const gameWidth = gameboard.width;
const gameHeight = gameboard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let foodA;
let foodB;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreText.textContent = `Highscore: ${highScore}`;

let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

let double = false;
let add = false;
let dots = [];
let dots2 = [];


controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));
window.addEventListener("keydown", changeDirection)
resetBtn.addEventListener("click", resetGame);

var grd = ctx.createLinearGradient(0, 0, 360, 0);
grd.addColorStop (0, 'red');
grd.addColorStop (0.25, 'yellow');
grd.addColorStop (0.5, 'green');
grd.addColorStop (0.75, 'blue');
grd.addColorStop (1, 'violet');

function gameStart(){
    running = true; 
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 175)
    } else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum;
    }
   // if(snake.length <=25){
    dots.length = 0;
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
    dots.push({x:foodX, y:foodY});
    /*} else if(25 < snake.length && snake.length <=45){
        dots.length = 0;
        for(let i = 0; i < 2; i++){
            foodX = randomFood(0, gameWidth - unitSize);
            foodY = randomFood(0, gameWidth - unitSize);
            dots.push({x:foodX, y:foodY});
        }
    } else if(45 < snake.length){

        dots.length = 0;

        for(let i = 0; i < 3; i++){

            foodX = randomFood(0, gameWidth - unitSize);

            foodY = randomFood(0, gameWidth - unitSize);

            dots.push({x:foodX, y:foodY});

        }

    }*/
}; 
function createFood2(){

    function randomFood(min, max){

        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize

        return randNum;

    }
    dots2.length = 0;
    foodA = randomFood(0, gameWidth - unitSize);

    foodB = randomFood(0, gameWidth - unitSize);

    dots2.push({x:foodA, y:foodB});

}
function drawFood(){
    ctx.fillStyle = foodColor;
    //ctx.fillRect(foodX, foodY, unitSize, unitSize);
    for(let i = 0; i < dots.length; i++){
        ctx.fillRect(dots[i].x, dots[i].y, unitSize, unitSize);
    }
    /*if(score >= 25){
        for(let i = 0; i < dots2.length; i++){

            ctx.fillRect(dots2[i].x, dots2[i].y, unitSize, unitSize);

        }
    }*/
    
};
function moveSnake(){

    const head = {

        x: snake[0].x + xVelocity,

        y: snake[0].y + yVelocity

    };

    snake.unshift(head);  
    /*if(score == 25){
            add = true;
        }
    if(add){

        createFood2();
        double = true;
        add = false;

    }*/
    if(snake[0].x == dots[0].x && snake[0].y == dots[0].y){

        score += 1;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);

        scoreText.textContent = score;
        highScoreText.textContent = `Highscore: ${highScore}`;

        createFood();


    } /*else if(snake[0].x == dots2[0].x && snake[0].y == dots2[0].y && double == true){
        score += 1;

        scoreText.textContent = score;

        createFood2();

    }*/ else{

        snake.pop();

    }
     
};


function drawSnake(){
    if(snake.length <= 14 ){
        ctx.fillStyle = snakeColor;
    } else if(14 < snake.length && snake.length <= 24) {
        ctx.fillStyle = "pink";
    } else if(24 < snake.length && snake.length <= 34) {
        ctx.fillStyle = "blue";
    } else if(34 < snake.length && snake.length <= 44) {
        ctx.fillStyle = "yellow";
    } else if(44 < snake.length) {
        ctx.fillStyle = grd;
    }
    ctx.strokeStyle = snakeBorder;
    
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(e){
    const keyPressed = e.keyCode;
    console.log(keyPressed);
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const W = 87;
    const A = 65;
    const S = 83;
    const D = 68;
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case((keyPressed == LEFT || keyPressed == A || e.key === "ArrowLeft") && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case((keyPressed == UP || keyPressed == W || e.key === "ArrowUp") && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case((keyPressed == RIGHT || keyPressed == D || e.key === "ArrowRight") && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case((keyPressed == DOWN || keyPressed == S ||e.key === "ArrowDown") && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
   switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
