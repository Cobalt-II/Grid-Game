import {enemyData, player, survivalData, weapondata} from "/js/config.js";
import {pushNote} from "/js/notifications.js";

let milestones = [];
let targets = ['speed', 'damage', 'health', 'max', 'spawnrate'];
let stattargets = ['damage', 'health', 'max'];
let weaponstats = ['damage', 'reload', 'radius', 'max'];
let nextMi = 1;
let milestonecontroller = [];

requestAnimationFrame(function boost() {
    if (player.score / survivalData.score >= nextMi && milestones.indexOf(player.score) === -1) {
        milestones.push(player.score);
        nextMi++;
        let u = targets[Math.floor(Math.random() * targets.length)];
        if (u !== 'speed' && u !== 'spawnrate') {
            enemyData[u] += survivalData.bonus;
            pushNote(`Enemy stat ${u} upgraded by ${survivalData.bonus} point(s)`, 3);
        } else {
            if (enemyData[u] > survivalData.timebonus) {
                enemyData[u] -= survivalData.timebonus;
                pushNote(`Enemy stat ${u} decreased by ${survivalData.timebonus} second(s)`, 3);
            } else {
                u = stattargets[Math.floor(Math.random() * stattargets.length)];
                enemyData[u] += survivalData.bonus;
                pushNote(`Enemy stat ${u} upgraded by ${survivalData.bonus} point(s)`, 3);
            }
        }
        enemyData.score += survivalData.bonus;
        survivalData.score += survivalData.milestonecurve;
    }
    if (!(milestones.length % 3) && milestonecontroller.indexOf(milestones.length) === -1 && milestones.length) {
        let u = weaponstats[Math.floor(Math.random() * weaponstats.length)];
        if (u !== 'reload') {
            weapondata[u] += survivalData.bonus;
            pushNote(`Weapon stat ${u} upgraded by ${survivalData.bonus} point(s)`, 3);
        } else {
            weapondata[u] -= survivalData.timebonus;
            pushNote(`Weapon stat ${u} decreased by ${survivalData.bonus} second(s)`, 3);
        }
    milestonecontroller.push(milestones.length);
    }
    requestAnimationFrame(boost);
});

export default milestones;
