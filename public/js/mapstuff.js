import {room} from "/js/config.js";

function dir(p1, p2, affect) {
    let flag = 0;
    for (let c = -1; c < 2; c++) {
        for (let k = -1; k < 2; k++) {
            if (p1 + c > -1 && p2 + k > -1 && p1 + c < affect.length && p2 + k < affect[p1].length) {
                if (affect[p1 + c][p2 + k] === 'hole') {
                    flag++;
                }
            }
        }
    }
    return flag;
};

class JunctionWest {
    constructor(length, width) {
        this.grid = Array.from({
            length: length
        }, () => (Array.from({
            length: width
        }, () => ('fill'))));
    };
    branch(x, y, shifts, type, length) {
        let picks = [];
        let options = [];
        let offset = 0;
        for (let count = x; count < x + length; count++) {
            picks.push(count);
        };
        for (let count = 0; count < shifts; count++) {
            let o = Math.floor(Math.random() * picks.length);
            let choice = picks[o];
            picks.splice(o, 1);
            switch (type) {
                case 1:
                    options.push([choice, Math.random() < 0.5 ? 1 : -1]);
                    break;
                case 2:
                    options.push([choice, 1]);
                    break;
                case 3:
                    options.push([choice, -1]);
                    break;
            }
        };
        for (let count = x; count < x + length; count++) {
            let flag = [0, 1];
            for (let c = 0; c < options.length; c++) {
                if (options[c][0] === count) {
                    offset = offset + options[c][1];
                    flag = [1, options[c][1]];
                }
            };
            let k = y + offset;
            if (k < 0) {
                k = 0;
            };
            if (k > this.grid.length - 1) {
                k = this.grid.length - 1;
            }
            this.grid[count][k] = 'hole';
            if (flag[0]) {
                this.grid[count][k - flag[1]] = 'hole';
            }
        }
    };
    erode(type) {
        let options = [];
        for (let count = 0; count < this.grid.length; count++) {
            for (let coun = 0; coun < this.grid[count].length; coun++) {
                let flag = dir(count, coun, this.grid);
                switch (type[0]) {
                    case 1:
                        if (flag > 7) {
                            this.grid[count][coun] = 'fill';
                        };
                        break;
                    case 2:
                        if (flag > 7) {
                            options.push([count, coun]);
                        };
                }
            }
        };
        if (type[0] === 2) {
            for (let count = 0; count < options.length / (1 / type[1]); count++) {
                let u = Math.floor(Math.random() * options.length);
                let flag = dir(options[u][0], options[u][1], this.grid);
                if (flag > 7) {
                    this.grid[options[u][0]][options[u][1]] = 'fill'
                };
                options.splice(u, 1);
            }
        }
    }
};

let jw = new JunctionWest(room.x, room.y);

switch (room.type) {
case 1:
for (let count = 1; count < jw.grid.length - 1; count++) {
jw.branch(1, count, 0, 1, jw.grid[0].length - 2)
};
jw.erode([2, Infinity]);
break;
case 2:
    for (let count = 0; count < jw.grid.length; count++) {
        jw.branch(0, count, 50, 1, jw.grid[0].length)
    };
    for (let count = 0; count < jw.grid.length; count++) {
        for (let coun = 0; coun < jw.grid[count].length; coun++) {
            if (dir(count, coun, jw.grid) > 7) {
                jw.grid[count][coun] = 'fill'
            }
        }
    };
break;
case 3:
    for (let count = 0; count < jw.grid.length; count++) {
        jw.branch(0, count, 50, 1, jw.grid[0].length)
    };
    for (let count = 0; count < jw.grid.length; count++) {
        for (let coun = 0; coun < jw.grid[count].length; coun++) {
            if (dir(count, coun, jw.grid) > 7) {
                jw.grid[count][coun] = 'hole'
            }
        }
    };
break;
}

export default jw;