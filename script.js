const {body} = document;
const canvas = document.createElement('canvas')
let context = canvas.getContext('2d')
const width = 500;
const height = 700;


const isMobile = window.matchMedia('(max-width: 600px')
// const 
//Paddle
const paddleHeight = 10
const paddleWidth = 50
const paddleDiff = 25;
const paddleDisance = 10;
let paddleBottomX = 225
let paddleTopX = 225
let playerMoved = false;
let paddleContact = false

//Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

//Speed
let speedX;
let speedY;
let trajectoryX;
let computerSpeed;

if (isMobile.matches) {
    speedY = -2
    speedX = speedY
    computerSpeed = 4
}else{
    speedY = -1
    speedX = speedY
    computerSpeed = 3
}

//Score
let playerScore = 0
let computerScore = 0
const winningScore = 7;
let isGameOver = true
let isNewGame = true


function showGameOverEl(winner) {
    canvas.hidden = true;
    gameOverEl.textContent = '';
    gameOverEl.classList.add('game-over-container')
    const title = document.createElement('h1')
    title.textContent = `${winner} Wins`

    const playAgainBtn = document.createElement('button')
    playAgainBtn.setAttribute('onclick','startGame()')
    playAgainBtn.textContent = 'Play Again'
    gameOverEl.append(title, playAgainBtn)
    body.appendChild(gameOverEl)
}
function renderCanvas() {
    // Canvas background
    context.fillStyle = 'black' 
    context.fillRect(0,0,width,height);

    // Paddle color
    context.fillStyle = 'white'

    // player paddle (bottom)
    context.fillRect(paddleBottomX, height - paddleDisance, paddleWidth, paddleHeight);

    // computer paddle
    context.fillRect(paddleTopX, paddleDisance, paddleWidth, paddleHeight)

    // dashed center line
    context.beginPath();
    context.setLineDash([4]);
    context.moveTo(0,height / 2)
    context.lineTo(500,height / 2)
    context.strokeStyle = 'gray';
    context.stroke()

    // Ball
    context.beginPath();
    context.arc(ballX,ballY,ballRadius,2 * Math.PI , 0 , false);
    context.fillStyle = 'white'
    context.fill()

    // Score
    context.font = '32px Courier New';
    context.fillText (playerScore, 20 , canvas.height / 2 + 50)
    context.fillText (computerScore, 20 , canvas.height / 2 - 30)
}


function ballMove() {
    //vertical speed
    ballY += -speedY
    
    if (playerMoved && paddleContact) {
        ballX += speedX
    }
}

function ballBoundaries() {
    if (ballX < 0 && speedX< 0) {
        speedX = -speedX
    }
    if (ballX > width && speedX > 0) {
        speedX = -speedX
    }

    if (ballY > height - paddleDiff) {
        if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
            paddleContact = true

            if (playerMoved) {
                speedY -= 1;
                if (speedY < -5) {
                    speedY = -5;
                    computerSpeed = 6;
                }
            }
            speedY = -speedY;
            trajectoryX = ballX - (paddleBottomX + paddleDiff);
            speedX = trajectoryX * 0.3
        }else if(ballY > height){
            ballReset();
            computerScore++
        }
    }
    if (ballY < paddleDiff) {
        if(ballX > paddleTopX && ballX < paddleTopX + paddleWidth){
            if(playerMoved){
                speedY+=1
                if (speedY > 5) {
                    speedY = 5
                }
            }
            speedY = -speedY
        }else if(ballY < 0){
            ballReset()
            playerScore++
        }
    }
}

function ballReset() {
    ballX = width / 2
    ballY = height / 2
    speedY = -3
    paddleContact = false
}
function animate() {
    renderCanvas()
    ballMove()
    ballBoundaries()
    if (!isGameOver) {
        window.requestAnimationFrame(animate)
    }
}

function createCanvas() {
    canvas.width = width
    canvas.height = height
    body.appendChild(canvas)
    renderCanvas()
}

function startGame() {
    isGameOver = false;
    isNewGame = false;
    playerScore = 0
    computerScore = 0
    ballReset()
    createCanvas()  
    animate()
    canvas.addEventListener('mousemove',(e)=>{
        
    })
}

startGame()