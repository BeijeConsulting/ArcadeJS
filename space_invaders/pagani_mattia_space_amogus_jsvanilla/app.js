window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    processKeysDown(keycode);
});

window.addEventListener("keyup", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    processKeysUp(keycode);
});

let leftDown = false;
let rightDown = false;
let spaceDown = false;

function processKeysDown(key) {
    if (key === 65 || key === 37)
    {
        this.leftDown = true;
        console.log("left down");
    }

    if (key === 68 || key === 39)
    {
        this.rightDown = true;
        console.log("right down");
    }

    if (key === 32)
    {
        this.spaceDown = true;
        console.log("space down");
    }

    if (key === 27)
    {
        this.reset();
    }

    if (key === 18)
    {
        this.initialize();
    }
}

function processKeysUp(key) {
    if (key === 65 || key === 37)
    {
        this.leftDown = false;
        console.log("left up");
    }

    if (key === 68 || key === 39)
    {
        this.rightDown = false;
        console.log("right up");
    }

    if (key === 32)
    {
        this.spaceDown = false;
        console.log("space up");
    }
}

const interval = this.interval = setInterval(function() {
    update();
  }, 1);
 
function update() {
    if (this.leftDown) this.movePlayer(-1);
    if (this.rightDown) this.movePlayer(1);
    if (this.spaceDown) console.log("space");
}

let player = null;
let canvas = null;
let enemies = null;

let gameWidth = null;
let gameHeight = null;

let playerSpeed = null;
let currentPos = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log("START");
    //setTimeout(function () { }, 300);
    initialize();
}, false);

document.addEventListener('resize', function() {            //NOT WORKING
    console.log("RESIZE");
    initialize();
}, false);

function initialize() {
    console.log("INIT");
    this.player = document.getElementById("player");
    this.canvas = document.getElementById("canvas");
    this.enemies = document.getElementById("enemies");

    this.gameWidth = this.canvas.clientWidth;
    this.gameHeight = this.canvas.clientHeight;

    this.playerSpeed = 1;
    
    this.player.style.left = this.gameWidth * 0.5 + 'px';
    this.player.style.bottom = -this.gameHeight * 0.5 + 'px';

    this.currentPos = this.gameWidth * 0.5;
}

function reset() {
    console.log("reset");
    clearInterval(interval);
}

function movePlayer(dir) {
    let speed = this.playerSpeed * dir;

    if (this.currentPos >= 10 && dir < 0 || this.currentPos <= this.gameWidth - 45 && dir > 0)
    {
        this.player.style.left = (this.currentPos + speed) + 'px';
        this.currentPos += speed;
    }
}