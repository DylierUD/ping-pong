const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 6;
let dy = -6;

const paddleHeight = 75;
const paddleWidth = 10;
let paddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

let upPressed = false;
let downPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        upPressed = true;
    } else if (e.key === 'ArrowDown') {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp') {
        upPressed = false;
    } else if (e.key === 'ArrowDown') {
        downPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(y, x) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function increaseSpeed() {
    dx *= 1.1; // Aumentar la velocidad horizontal
    dy *= 1.1; // Aumentar la velocidad vertical
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(paddleY, 0);
    drawPaddle(rightPaddleY, canvas.width - paddleWidth);

    // Rebotar la bola en los bordes superior e inferior
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Rebotar la bola en las palas y aumentar la velocidad
    if (x + dx < ballRadius + paddleWidth && y > paddleY && y < paddleY + paddleHeight) {
        dx = -dx;
        increaseSpeed();
    } else if (x + dx > canvas.width - ballRadius - paddleWidth && y > rightPaddleY && y < rightPaddleY + paddleHeight) {
        dx = -dx;
        increaseSpeed();
    }

    // Reiniciar si la bola sale de los límites
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        document.location.reload();
    }

    x += dx;
    y += dy;

    // Movimiento de la pala derecha
    if (upPressed && rightPaddleY > 0) {
        rightPaddleY -= 14;
    } else if (downPressed && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += 14;
    }

    // Movimiento de la pala izquierda con límites
    if (upPressed && paddleY > 0) {
        paddleY -= 14;
    } else if (downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 14;
    }

    requestAnimationFrame(draw);
}

draw();
