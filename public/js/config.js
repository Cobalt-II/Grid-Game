export let mini = {
x: 0,
y: 0,
size: window.innerWidth / 6.825
};

export let bar = {
x: 0,
y: window.innerHeight - 20,
size: [200, 20],
offset: 150
};

export let room = {
size: 100,
type: Math.ceil(Math.random() * 5),
condense: 50
};

export let boostData = {
duration: 5,
FOV: 10,
max: 4,
power: ['FOV', 'Wall']
};

export let weapondata = {
damage: 1,
reload: 0.2,
radius: 1,
max: 20
};

export let survivalData = {
score: 1,
bonus: 1,
timebonus: 0.1,
milestonecurve: 1
};

export let font = {
size: 20,
type: "Arial"
};

export let player = {
x: 1,
y: 1,
fov: 5,
wallwalk: 0,
score: 0,
health: 100,
regen: 0.1
};

player.maxhealth = player.health;
player.basefov = player.fov;

export let enemyData = {
spawn: 10,
speed: 1.5,
spawnrate: 3,
max: 10,
health: 1,
score: 1,
damage: 1,
types: ['base']
};


