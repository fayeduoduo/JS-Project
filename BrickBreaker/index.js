//get DOMEl
const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const canvas = document.getElementById('canvas');
const rules = document.getElementById('rules')
const beginBtn = document.getElementById('game-start')
const gameOver = document.getElementById('game-over')
const text = document.getElementById('game-text')


let score = 0;

const brickRowCount = 9;
const brickColumnCount = 9;

//step1: open and close rules
rulesBtn.onclick = () => {
    rules.classList.add('show')
}
closeBtn.onclick = () => {
    rules.classList.remove('show')
}

//step2: draw on canvas
const ctx = canvas.getContext('2d');


// set up ball 创建撞击球
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 1.5,
    size: 10,
    speed: 4,
    mx: 3,  //代表球move up
    my: -4  //代表球下落
};

// set up paddle 创建挡板
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8, //挡板每次移动的速度，也是挡板向左向右移的相对位移
    mx: 0  //挡板一开始没有移动
};

// set up brick 创建单个方块
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let a = 0; a < brickColumnCount; a++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = a * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][a] = { x, y, ...brickInfo };
    }
}

console.log(bricks);

// Draw all bricks 绘制所有方块
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
            // 设定球撞倒砖块之后，砖块颜色变为透明
        ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
        ctx.fill();
        ctx.closePath();
    });
  });
}

// Draw Ball 绘制撞击球
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// 绘制挡板
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

// 绘制得分
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillText(`得分：${score}`, canvas.width - 100, 30);
}

// Animation function 动画函数
// move paddle移动挡板动画
function movePaddle() {
    paddle.x += paddle.mx;
    // console.log(paddle.x);

    // 设置边界
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

// move ball 移动撞击球动画
function moveBall() {
    ball.x += ball.mx;
    ball.y += ball.my;

    // 撞击左右侧界面
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.mx *= -1; // ball.mx = ball.dx * -1 撞击后反弹
    }

    // 撞击上下边界
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.my *= -1; // ball.my = ball.dx * -1 撞击后反弹
    }

    // 撞击挡板
    if (
        ball.x - ball.size > paddle.x && //撞击挡板左侧
        ball.x + ball.size < paddle.x + paddle.w && //撞击挡板右侧
        ball.y + ball.size > paddle.y //撞击的挡板上面的距离
    ) {
        ball.my = -ball.speed; //撞击到单板之后反弹
    }

  // 撞击砖块
    bricks.forEach(column => {
        column.forEach(brick => {
        if (brick.visible) {
            if (
                ball.x - ball.size > brick.x && // 撞击砖块左侧
                ball.x + ball.size < brick.x + brick.w && // 撞击砖块右侧
                ball.y + ball.size > brick.y && // 撞击砖块顶部
                ball.y - ball.size < brick.y + brick.h // 撞击砖块底部
                ) {
                    ball.my *= -1;
                    brick.visible = false;
                
                    updateScore();
                }
            }
        });
    });

    //如果挡板没有接到小球, 如果等于canvas的高度，仍然无法完全更新
    if (ball.y + ball.size > canvas.height) {
        showAllBricks()
        score = 0;
        autoDisplay()
        text.innerHTML = 'Game Over!!!! <img src="https://img.icons8.com/cotton/64/000000/brick-wall.png"/>'
        cancelAnimationFrame()
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 1.5;
        paddle.x = canvas.width / 2 - 40;
    }

}

//update Score;
function updateScore() {
    score++;
    
    //这里便是当把所有砖块打掉的时候，游戏又会重新开始
    if (score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks()
        autoDisplay()
        text.innerHTML = '<h1>Success!!<img src="https://img.icons8.com/color/48/000000/wink--v3.png"/><h1/>';
    }
}

//再一次显示所有砖块 showAllBricks
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true)
    });
}

//draw function
function draw() {
    //避免画出一条线
    //清除全屏 obj.clearRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

//setUp update function
//更新所有的绘制函数和动画
function update() {
    //更新所有的动画
    movePaddle()
    moveBall()
    //所有的绘制函数
    draw()

    //浏览器在每一次都要进行重新调用绘画
    //和挡板移动函数
    requestAnimationFrame(update)

}
update()


//键盘函数
function keyDown(e) {
    //打印了键盘值
    console.log(e.key)
    if (e.key === 'ArrowLeft' || e.key === 'Left' ) {
        paddle.mx = - paddle.speed
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.mx = paddle.speed;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'Left' ) {
        paddle.mx = 0
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.mx = 0
    }
}

// //start again game
beginBtn.onclick = () => {
    gameOver.classList.remove('show')
    requestAnimationFrame(update)
}


// game-over container setting time;
function autoDisplay() {
    gameOver.classList.add('show');

    setTimeout(() => {
        gameOver.classList.remove('show')
    },1500)
}

//事件监听
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)