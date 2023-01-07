import {boostData, player} from "/js/config.js";
import jw from "/js/mapstuff.js";
import {pushNote} from "/js/notifications.js";
import {checkPos, enemies} from "/js/enemy.js";

export function getPos(d, u) {
    let pos = [];
    for (let count = 0; count < jw.grid.length; count++) {
        if (d) {
            for (let coun = 0; coun < jw.grid[count].length; coun++) {
                if (jw.grid[count][coun] !== 'fill') {
                    pos.push([count, coun]);
                };
            }
        } else {
            for (let coun = 0; coun < jw.grid[count].length; coun++) {
                if (jw.grid[count][coun] !== 'fill' && Math.hypot(player.x - count, player.y - coun) > u && !checkPos([count, coun], enemies)) {
                    pos.push([count, coun]);
                };
            }
        }
    }
    return pos[Math.floor(Math.random() * pos.length)];
};

/* yeah really random player position setting thing I threw right here lol */
let k = getPos(1 , 0);
[player.x, player.y] = [k[0], k[1]];

export let powerups = [];

class powerup {
    constructor(pos, type, duration) {
        this.pos = pos;
        this.type = type;
        this.duration = duration;
    }
};

setInterval(() => {
    let k = getPos(1, 0);
    if (powerups.length < boostData.max) {
        powerups.push(new powerup([k[0], k[1]], boostData.power[Math.floor(Math.random() * boostData.power.length)], 5));
    };
}, boostData.duration * 1000);

requestAnimationFrame(function power() {
    for (let count in powerups) {
        if (powerups[count].pos[0] === player.x && powerups[count].pos[1] === player.y) {
            pushNote(`${powerups[count].type} powerup acquired!`, 3);
            switch (powerups[count].type) {
                case 'FOV':
                    player.fov += boostData.FOV;
                    setTimeout(() => {
                        player.fov -= boostData.FOV;
                    }, powerups[count].duration * 1000);
                    powerups.splice(count, 1);
                    break;
                case 'Wall':
                    player.wallwalk = 1;
                    setTimeout(() => {
                        player.wallwalk = 0;
                    }, powerups[count].duration * 1000);
                    powerups.splice(count, 1);
                    break;
            }
        }
    };
    requestAnimationFrame(power);
});


