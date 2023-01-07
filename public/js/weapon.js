import {weapondata, player} from "/js/config.js";
import jw from "/js/mapstuff.js";

export let reload = weapondata.reload * 1000;
export let attackgrid = [];

export function radius() {
    for (let count in jw.grid) {
        for (let coun in jw.grid) {
            if (Math.hypot(count - player.x, coun - player.y) <= weapondata.radius) {
                attackgrid.push([count, coun]);
            }
        }
    }
};
    
export function mouse () {if (reload >= weapondata.reload * 1000) {
    reload = 0;
    radius();
    if (attackgrid.length > weapondata.max) {
        attackgrid.splice(0, attackgrid.length - weapondata.max);
    }
}};

export function key (e) {
    switch (e.code) {
        case 'KeyW':
            if (jw.grid[player.x][player.y - 1] !== 'fill' && jw.grid[player.x][player.y - 1] || player.wallwalk && jw.grid[player.x][player.y - 1]) {
                player.y--
            };
            break;
        case 'KeyS':
            if (jw.grid[player.x][player.y + 1] !== 'fill' && jw.grid[player.x][player.y + 1] || player.wallwalk && jw.grid[player.x][player.y + 1]) {
                player.y++
            };
            break;
        case 'KeyD':
            if (jw.grid[player.x + 1][player.y] !== 'fill' && jw.grid[player.x + 1][player.y] || player.wallwalk && jw.grid[player.x + 1][player.y]) {
                player.x++
            };
            break;
        case 'KeyA':
            if (jw.grid[player.x - 1][player.y] !== 'fill' && jw.grid[player.x - 1][player.y] || player.wallwalk && jw.grid[player.x - 1][player.y]) {
                player.x--
            };
            break;
    }
};

document.addEventListener('mousedown', mouse);
document.addEventListener('keyup', key);

requestAnimationFrame(function run() {
        if (reload < weapondata.reload * 1000) {
            reload++
        };
        requestAnimationFrame(run);
    });

    




