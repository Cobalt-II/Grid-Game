import jw from "/js/mapstuff.js";
import {mini, weapondata, bar, enemyData, player, font} from "/js/config.js";
import {powerups} from "/js/powerups.js";
import {attackgrid, reload, mouse, key} from "/js/weapon.js";
import {enemies} from "/js/enemy.js";
import {notifications} from "/js/notifications.js";
import milestones from "/js/survival.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let time = Date.now();
let cur = 0;

canvas.oncontextmenu = function(e) {
    e.preventDefault();
};

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

requestAnimationFrame(function draw() {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        update();
    };

    ctx.fillStyle = localStorage.roomColors.split(',')[0];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let gridX = window.innerWidth / player.fov / 2;
    let gridY = window.innerHeight / player.fov / 2;
    ctx.fillStyle = localStorage.roomColors.split(',')[1];
    for (let count = -player.fov; count < player.fov; count++) {
        for (let coun = -player.fov; coun < player.fov; coun++) {
            for (let k in attackgrid) {
                if (parseInt(attackgrid[k][0]) === player.x + count && parseInt(attackgrid[k][1]) === player.y + coun) {
                    ctx.fillStyle = localStorage.roomColors.split(',')[4];
                    ctx.fillRect(window.innerWidth * (count - -player.fov) / (player.fov * 2), window.innerHeight * (coun - -player.fov) / (player.fov * 2), gridX, gridY);
                    ctx.fillStyle = localStorage.roomColors.split(',')[1];
                }
            }
            let targ = player.x + count;
            let c = jw.grid[targ];
            let k;
            if (c) {
                k = jw.grid[targ][player.y + coun]
            } else {
                k = 'fill'
            };
            if (!k) {
                k = 'fill'
            };
            if (k === 'fill') {
                ctx.fillRect(window.innerWidth * (count - -player.fov) / (player.fov * 2), window.innerHeight * (coun - -player.fov) / (player.fov * 2), gridX, gridY)
            }
            for (let t in powerups) {
                if (powerups[t].pos[0] === player.x + count && powerups[t].pos[1] === player.y + coun) {
                    ctx.fillStyle = localStorage.roomColors.split(',')[3];
                    ctx.fillRect(window.innerWidth * (count - -player.fov) / (player.fov * 2), window.innerHeight * (coun - -player.fov) / (player.fov * 2), gridX, gridY);
                    ctx.fillStyle = localStorage.roomColors.split(',')[1];
                }
            }
            for (let t in enemies) {
                if (enemies[t].pos[0] === player.x + count && enemies[t].pos[1] === player.y + coun) {
                    ctx.fillStyle = localStorage.roomColors.split(',')[6];
                    ctx.fillRect(window.innerWidth * (count - -player.fov) / (player.fov * 2), window.innerHeight * (coun - -player.fov) / (player.fov * 2), gridX, gridY);
                    ctx.fillStyle = localStorage.roomColors.split(',')[1];
                }
            }
        }
    };

    ctx.fillStyle = '#BFC85A22';
    ctx.fillRect(window.innerWidth * mini.x, window.innerHeight * mini.y, mini.size, mini.size);

    for (let count in jw.grid) {
        for (let coun in jw.grid[count]) {
            if (jw.grid[count][coun] === 'fill') {
                ctx.fillStyle = localStorage.roomColors.split(',')[1];
                ctx.fillRect(window.innerWidth * mini.x + (count * mini.size / jw.grid[0].length), window.innerHeight * mini.y + (coun * mini.size / jw.grid[0].length), mini.size / jw.grid.length, mini.size / jw.grid.length)
            }
        }
    };

    for (let count in enemies) {
        if (enemies[count].pos[0] === player.x && enemies[count].pos[1] === player.y) {
            player.health -= enemyData.damage;
        }
        for (let coun in attackgrid) {
            if (parseInt(attackgrid[coun][0]) === enemies[count].pos[0] && parseInt(attackgrid[coun][1]) === enemies[count].pos[1]) {
                attackgrid.splice(coun, 1);
                enemies[count].health -= weapondata.damage;
            }
        }
        if (enemies[count].health < 1) {
            player.score += enemies[count].score;
            enemies.splice(count, 1);
        }
    };

    if (player.health < 1) {
        if (!cur) {
            cur = ((Date.now() - time) / 1000).toFixed(2);
        }
        document.removeEventListener('mousedown', mouse);
        document.removeEventListener('keyup', key);
        ctx.textAlign = 'center';
        ctx.font = `${font.size}px ${font.type}`;
        ctx.fillStyle = localStorage.roomColors.split(',')[5];
        ctx.fillText(`You died`, window.innerWidth / 2, mini.size + font.size);
        ctx.fillText(`Time survived: ${cur}s`, window.innerWidth / 2, mini.size + font.size * 3);
        ctx.fillText(`Score: ${player.score}`, window.innerWidth / 2, mini.size + font.size * 5);
        ctx.fillText(`Milestones: ${milestones.length}`, window.innerWidth / 2, mini.size + font.size * 7);
        ctx.fillText(`Press enter to return to menu or shift to play again`, window.innerWidth / 2, mini.size + font.size * 9);
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Enter') {
                this.location.href = '/'
            };
            if (event.code === 'ShiftRight') {
                this.location.href = '/html/game.html'
            };
        });
    } else {
        ctx.fillStyle = localStorage.roomColors.split(',')[2];
        ctx.fillRect(window.innerWidth / 2, window.innerHeight / 2, gridX, gridY);
        ctx.fillRect(mini.x * window.innerWidth + (player.x * mini.size / jw.grid[0].length), mini.y * window.innerHeight + (player.y * mini.size / jw.grid.length), mini.size / jw.grid[0].length, mini.size / jw.grid.length);

        ctx.fillStyle = localStorage.roomColors.split(',')[5];
        ctx.fillRect(bar.x, bar.y, bar.size[0], bar.size[1]);
        ctx.fillStyle = localStorage.roomColors.split(',')[4];
        ctx.fillRect(bar.x, bar.y, (reload / (weapondata.reload * 1000)) * bar.size[0], bar.size[1]);

        if (player.health < player.maxhealth) {
            ctx.fillStyle = localStorage.roomColors.split(',')[5];
            ctx.fillRect(window.innerWidth / 2, window.innerHeight / 2 + (bar.offset / (player.fov / player.basefov)), gridX, bar.size[1]);
            ctx.fillStyle = localStorage.roomColors.split(',')[7];
            ctx.fillRect(window.innerWidth / 2, window.innerHeight / 2 + (bar.offset / (player.fov / player.basefov)), (player.health / player.maxhealth) * gridX, bar.size[1]);
            player.health += player.regen;
        }

        ctx.fillStyle = localStorage.roomColors.split(',')[5];
        ctx.font = `${font.size}px ${font.type}`;
        ctx.fillText(`Score: ${player.score}`, 0, mini.size + font.size + 10);
        ctx.fillText(`Time: ${((Date.now() - time) / 1000).toFixed(2)}s`, 0, mini.size + font.size * 3);

        ctx.textAlign = 'center';

        for (let count in notifications) {
            ctx.fillText(notifications[count].message, window.innerWidth / 2, font.size * 1.5 + count * font.size);
        }
        ctx.textAlign = 'left';
    }
    requestAnimationFrame(draw);
});








