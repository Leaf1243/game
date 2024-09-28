const canvas = document.getElementById('gameCanvas');  
const ctx = canvas.getContext('2d');  

let player = {  
    x: canvas.width / 2,  
    y: canvas.height - 50,  
    width: 50,  
    height: 50,  
    speed: 5  
};  

let bullets = [];  
let bulletSpeed = 10;  

// プレイヤーを描画  
function drawPlayer() {  
    ctx.fillStyle = '#00FF00';  
    ctx.fillRect(player.x, player.y, player.width, player.height);  
}  

// 弾を描画  
function drawBullets() {  
    ctx.fillStyle = '#FF0000';  
    for (let bullet of bullets) {  
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);  
    }  
}  

// 弾を移動  
function updateBullets() {  
    for (let bullet of bullets) {  
        bullet.y -= bulletSpeed;  
    }  
    bullets = bullets.filter(bullet => bullet.y > 0); // 画面外の弾を削除  
}  

// プレイヤーの移動  
function movePlayer() {  
    if (keys['ArrowLeft'] && player.x > 0) {  
        player.x -= player.speed;  
    }  
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {  
        player.x += player.speed;  
    }  
}  

// ゲームループ  
function gameLoop() {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    drawPlayer();  
    drawBullets();  
    updateBullets();  
    movePlayer();  
    requestAnimationFrame(gameLoop);  
}  

// キーの状態を管理  
let keys = {};  
window.addEventListener('keydown', (e) => {  
    keys[e.key] = true;  
});  
window.addEventListener('keyup', (e) => {  
    keys[e.key] = false;  
});  

// 弾を発射  
window.addEventListener('keydown', (e) => {  
    if (e.code === 'Space') {  
        bullets.push({  
            x: player.x + player.width / 2 - 2.5,  
            y: player.y,  
            width: 5,  
            height: 20  
        });  
    }  
});  

// ゲームスタート  
gameLoop(); 