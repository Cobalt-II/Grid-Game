import {enemyData, player} from '/js/config.js';
import {getPos} from '/js/powerups.js';

export let enemies = [];
let ids = [];
let id = 0;

class enemy {
    constructor(pos, health, speed, score, id, type) {
        this.pos = pos;
        this.health = health;
        this.speed = speed;
        this.score = score;
        this.id = id;
        this.type = type;
    }
};

setInterval(() => {
    if (enemies.length < enemyData.max) {
        let j = getPos(0, enemyData.spawn);
        enemies.push(new enemy([j[0], j[1]], enemyData.health, enemyData.speed, enemyData.score, id, enemyData.types[Math.floor(Math.random() * enemyData.types.length)]));
        id++;
    }
}, enemyData.spawnrate * 1000);

export function checkPos(pos, k) {
    for (let c in k) {
        if (pos[0] === k[c].pos[0] && pos[1] === k[c].pos[1]) {
            return 1;
        }
    }
    return 0;
}

requestAnimationFrame(function move() {
    for (let count in enemies) {
        let o = enemies[count].id;
        if (ids.indexOf(enemies[count].id) === -1) {
            ids.push(enemies[count].id);
            setInterval(() => {
                for (let coun in enemies) {
                    if (enemies[coun].id === o && player.health > 0) {
                        switch (enemies[coun].type) {
                            case 'base':
                                if (enemies[coun].pos[0] < player.x && !checkPos([enemies[coun].pos[0] + 1, enemies[coun].pos[1]], enemies)) {
                                    enemies[coun].pos[0]++
                                };
                                if (enemies[coun].pos[0] > player.x && !checkPos([enemies[coun].pos[0] - 1, enemies[coun].pos[1]], enemies)) {
                                    enemies[coun].pos[0]--
                                };
                                if (enemies[coun].pos[1] < player.y && !checkPos([enemies[coun].pos[0], enemies[coun].pos[1] + 1], enemies)) {
                                    enemies[coun].pos[1]++
                                };
                                if (enemies[coun].pos[1] > player.y && !checkPos([enemies[coun].pos[0], enemies[coun].pos[1] - 1], enemies)) {
                                    enemies[coun].pos[1]--
                                };
                                break;
                        }
                    }
                }
            }, enemies[count].speed * 1000);
        }
    }
    requestAnimationFrame(move);
});

