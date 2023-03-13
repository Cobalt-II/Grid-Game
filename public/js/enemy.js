import {enemyData, player} from '/js/config.js';
import {getPos} from '/js/powerups.js';

export let enemies = [];
let spawnDate = Date.now();

class enemy {
    constructor(pos, health, speed, score, id, type) {
        this.pos = pos;
        this.health = health;
        this.speed = speed;
        this.score = score;
        this.id = id;
        this.type = type;
        this.date = Date.now();
    }
};

export function checkPos(pos, k) {
    for (let c in k) {
        if (pos[0] === k[c].pos[0] && pos[1] === k[c].pos[1]) {
            return 1;
        }
    }
    return 0;
}

requestAnimationFrame(function move() {
            if (enemies.length < enemyData.max && Date.now() - spawnDate > enemyData.spawnrate * 1000) {
                let j = getPos(0, enemyData.spawn);
                enemies.push(new enemy([j[0], j[1]], enemyData.health, enemyData.speed, enemyData.score, id, enemyData.types[Math.floor(Math.random() * enemyData.types.length)]));
                spawnDate = Date.now();
            }

            for (let count in enemies) {
                if (Date.now() - enemies[count].date > enemies[count].speed * 1000) {
                    switch (enemies[count].type) {
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
                    enemies[count].date = Date.now();
                }
                requestAnimationFrame(move);
            });

