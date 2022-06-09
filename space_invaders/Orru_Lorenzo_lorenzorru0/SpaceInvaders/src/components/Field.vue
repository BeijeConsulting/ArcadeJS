<template>
    <div class="container">
        <div class="field">
            <div class="scores">
                <div>SCORE: {{score}}</div>
                <div>HIGH SCORE: {{highScore}}</div>
                <div class="lives">
                    <div>LIVES:</div> 
                    <div v-if="lives <= 2" class="livesBlock"></div>
                    <div v-if="lives <= 1" class="livesBlock"></div>
                    <div v-if="lives <= 0" class="livesBlock"></div>
                    <div v-for="(x, i) in lives" :key="i" ><img src="../assets/img/shooter.svg"></div>
                </div>
            </div>

            <div class="baffleField">
                <div v-if="!startButton" id="enemiesDiv" class="enemies">
                    <div id="enemiesMove">
                        <div class="d-flex">
                            <div class="m-10" v-for="(x, i) in 10" :key="i + 'a'"><div class="space-invader space-invader-3 classic"></div></div>
                        </div>
                        <div class="d-flex">
                            <div class="m-10" v-for="(x, i) in 10" :key="i + 'b'"><div class="space-invader space-invader-2 classic"></div></div>
                        </div>
                        <div class="d-flex">
                            <div class="m-10" v-for="(x, i) in 10" :key="i + 'b'"><div class="space-invader space-invader-1 classic"></div></div>
                        </div>
                    </div>
                </div>
                <div v-else class="enemiesCover"></div>

                <div v-if="!startButton" id="shooterDiv" class="shooter">
                    <img id="shooter" class="shooterImg" src="../assets/img/shooter.svg">
                </div>
            </div>

            <button v-if="startButton" class="btnStart" @click="start()">START</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Field',
    data() {
        return {
            startButton: true,
            score: 0,
            lives: 3,
            highScore: 0,
            shooterY: 0,
            enemiesY: 0,
            enemiesX: 0,
            startShoot: 25.5,
            bullets: [],
            numBullets: 0,
            indexBullet: 0,
            enemiesLeft: false
        }
    },
    methods: {
        doCommand(e) {
            let cmd = String.fromCharCode(e.keyCode).toLowerCase();
            if(cmd == "'"  || cmd == 37) {
                if(this.shooterY < 840) {
                    this.shooterY = this.shooterY + 15;
                    this.startShoot = this.startShoot + 15;
                }
                else if(this.shooterY == 840 ) {
                    this.shooterY = this.shooterY + 9;
                    this.startShoot = this.startShoot + 9;
                }
            } else if (cmd == "%" || cmd == 39) {
                if(this.shooterY >= 15) {
                    this.startShoot = this.startShoot - 15;
                    this.shooterY = this.shooterY - 15;
                }
                else if(this.shooterY == 9) {
                    this.startShoot = this.startShoot - 9;
                    this.shooterY = this.shooterY - 9;
                }
            }
    
            let shooter = document.getElementById("shooter");
            shooter.style.left = `${this.shooterY}px`;
        },
        start() {
            this.startButton = false;
            this.moveEnemies();
            window.addEventListener('keydown', this.doCommand);
            setInterval(() => {
                let bullet = {
                    index: this.indexBullet,
                    y: 31,
                    x: this.startShoot + 3.5
                };

                this.indexBullet = this.indexBullet + 1;
                this.bullets.push(bullet);
                this.numBullets = this.numBullets + 1;
            }, 900);
        },
        moveBullet() {
            let bullet = this.bullets[this.bullets.length - 1];
            let bulletDiv = document.createElement("div");
            bulletDiv.style.width = ".1875rem";
            bulletDiv.style.height = ".5rem";
            bulletDiv.style.backgroundColor = "#18f818";
            bulletDiv.style.position = "absolute";

            let startPos = this.startShoot + 3.5;
            bulletDiv.style.left = `${startPos}px`;
            bulletDiv.style.bottom = "31px";

            let container = document.getElementById("shooterDiv");
            container.appendChild(bulletDiv);

            let enemiesDiv = document.getElementById("enemiesDiv");

            setInterval(() => {
                if(bullet.y < enemiesDiv.clientHeight + 31) {
                    bullet.y = bullet.y + 3;
                    bulletDiv.style.bottom = `${bullet.y}px`;
                } else {
                    bulletDiv.remove();
                }

            }, 15);
        },
        moveEnemies() {
            setInterval(() => {
                let enemiesDiv = document.getElementById('enemiesMove');
                if(!this.enemiesLeft) {
                    if(this.enemiesY == 180) {
                        this.enemiesLeft = !this.enemiesLeft;
                        this.enemiesX = this.enemiesX - 10;
                        enemiesDiv.style.bottom = `${this.enemiesX}px`;
                    } else {
                        this.enemiesY = this.enemiesY + 20;
                        enemiesDiv.style.left = `${this.enemiesY}px`;
                    }
                } else {
                    if(this.enemiesY == 0) {
                        this.enemiesLeft = !this.enemiesLeft;
                        this.enemiesX = this.enemiesX - 10;
                        enemiesDiv.style.bottom = `${this.enemiesX}px`;
                    } else {
                        this.enemiesY = this.enemiesY - 20;
                        enemiesDiv.style.left = `${this.enemiesY}px`;
                    }
                }
            }, 1000);
        }
    },
    watch: {
        highScore: function() {
            localStorage.setItem("highScore", this.highScore);
        },
        score: function() {
            if(this.score >= this.highScore) {
                this.highScore = this.score;
            }
        },
        numBullets: function() {
            this.moveBullet();
        }
    },
    created() {
        let hScore = localStorage.getItem("highScore");
        if(hScore) {
            this.highScore = hScore;
        }
    },
    unmounted() {
        window.removeEventListener('keydown', this.doCommand);
    }
}
</script>

<style scoped>
.container {
    height: calc(100vh - 7.875rem);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(169, 169, 169);
}

.field {
    position: relative;
    width: 56.25rem;
    height: 80%;
    margin: .3125rem;
    padding: .3125rem;
    border: .0625rem solid rgb(169, 169, 169);
    border-radius: .625rem;
}

.d-flex {
    display: flex;
}

.m-10 {
    margin: 10px;
}

.scores {
    display: flex;
    justify-content: space-between;
    padding: .1875rem .3125rem;
}

.lives {
    display: flex;
    align-items: center;
}

.livesBlock {
    width: 1.625rem;
    height: 1.4375rem;
}

img {
    padding: 0 .1875rem;
    width: 1.25rem;
}

.baffleField {
    height: calc(100% - 2rem);
}
.shooter {
    width: 100%;
}

.enemies {
    height: 95%;
    padding: 0 1.875rem;
    display: flex;
    flex-direction: column;
}

#enemiesMove {
    width: 41.25rem;
    position: relative;
}

.shooter {
    height: 5%;

}

.shooterImg {
    position: relative;
    height: 100%;
    width: 3.1875rem;
    padding: 0;
}

.btnStart {
    position: absolute;
    top: 50%;  
    left: 50%; 
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 0;
    background-color: #18f818;
    color: #000;
    font-size: 1.875rem;
    padding: 1.25rem 1.875rem;
    transition-duration: 0.5s;
    cursor: pointer;
    font-family: 'Press Start 2P', cursive;
}

.space-invader { 
    border: 2px solid #fff;
    background-color: #fff;
    width: 2px; 
    height: 2px; 
    margin: 20px 20px;
}
.space-invader-1 {
    box-shadow:
    0 0 0 .25em #fff,
    0 .25em 0 .25em #fff,
    -.625em .375em 0 .125em #fff,
    .625em .375em 0 .125em #fff,
    -.75em -.75em 0 0 #fff,
    .75em -.75em 0 0 #fff,
    -.5em -.5em 0 0 #fff,
    .5em -.5em 0 0 #fff,
    -.75em -.25em 0 0 #fff,
    -.5em -.25em 0 0 #fff,
    .5em -.25em 0 0 #fff,
    .75em -.25em 0 0 #fff,
    -1em 0 0 0 #fff,
    -.75em 0 0 0 #fff,
    .75em 0 0 0 #fff,
    1em 0 0 0 #fff,
    -1em .25em 0 0 #fff,
    1em .25em 0 0 #fff,
    -.75em .75em 0 0 #fff,
    .75em .75em 0 0 #fff,
    /* Left Arm */
    1.25em .25em 0 0 #fff,
    1.25em .5em 0 0 #fff,
    1.25em .75em 0 0 #fff,
    /* Right Arm */
    -1.25em .25em 0 0 #fff,
    -1.25em .5em 0 0 #fff,
    -1.25em .75em 0 0 #fff,
    /* Left Foot */
    -.25em 1em 0 0 #fff,
    -.5em 1em 0 0 #fff,
    /* Right Foot */
    .25em 1em 0 0 #fff,
    .5em 1em 0 0 #fff;
}
.space-invader-2 { 
    box-shadow: 
    /* Body */
    -.125em -.5em 0 .25em #fff,
    .125em -.5em 0 .25em #fff,
    -.75em -.375em 0 .125em #fff,
    -.875em -.375em 0 .125em #fff,
    .75em -.375em 0 .125em #fff,
    .875em -.375em 0 .125em #fff,
    -1em 0 0 .25em #fff,
    1em 0 0 .25em #fff,
    -.5em .25em 0 0 #fff,
    -.25em .25em 0 0 #fff,
    0 .25em 0 0 #fff,
    .25em .25em 0 0 #fff,
    .5em .25em 0 0 #fff,
    /* Crotch */
    .3125em .5em 0 0 #fff,
    .5em .5em 0 0 #fff,
    .5em .5em 0 0 #fff,
    -.3125em .5em 0 0 #fff,
    -.5em .5em 0 0 #fff,
    -.5em .5em 0 0 #fff,
    .0625em .75em 0 0 #fff,
    -.0625em .75em 0 0 #fff,
    /* Right Leg */
    -.625em .75em 0 0 #fff,
    -.8125em .75em 0 0 #fff,
    -1.0625em 1em 0 0 #fff,
    -1.25em 1em 0 0 #fff,
    /* Left Leg */
    .625em .75em 0 0 #fff,
    .8125em .75em 0 0 #fff,
    1.0625em 1em 0 0 #fff,
    1.25em 1em 0 0 #fff;
}
.space-invader-3 { 
    box-shadow: 
    /* Body */
    0 -.625em 0 .125em #fff,
    -.25em -.375em 0 .125em #fff,
    .25em -.375em 0 .125em #fff,
    .625em -.25em 0 0 #fff,
    -.625em -.25em 0 0 #fff,
    0 .125em 0 .125em #fff,
    -.75em .125em 0 .125em #fff,
    .75em .125em 0 .125em #fff,
    .375em .25em 0 0 #fff,
    -.375em .25em 0 0 #fff,
    /* Crotch */
    .125em .5em 0 0 #fff,
    -.125em .5em 0 0 #fff,
    /* Right Leg */
    -.625em .5em 0 0 #fff,
    -.875em .75em 0 0 #fff,
    -.625em 1em 0 0 #fff,
    -.625em 1em 0 0 #fff,
    /* Left Leg */
    .625em .5em 0 0 #fff,
    .875em .75em 0 0 #fff,
    .625em 1em 0 0 #fff,
    .625em 1em 0 0 #fff;
}

.space-invader.animate { 
    animation: 1s infinite;
}
.space-invader.classic { 
    animation: 1s step-end infinite;
}
.space-invader-1.animate,
.space-invader-1.classic { 
    animation-name: space-invader-1;
}
.space-invader-2.animate,
.space-invader-2.classic { 
    animation-name: space-invader-2;
}
.space-invader-3.animate,
.space-invader-3.classic { 
    animation-name: space-invader-3;
}

@keyframes space-invader-1 {
    50% {
    box-shadow: 
        0 0 0 .25em #fff,
        0 .25em 0 .25em #fff,
        -.625em .375em 0 .125em #fff,
        .625em .375em 0 .125em #fff,
        -.75em -.75em 0 0 #fff,
        .75em -.75em 0 0 #fff,
        -.5em -.5em 0 0 #fff,
        .5em -.5em 0 0 #fff,
        -.75em -.25em 0 0 #fff,
        -.5em -.25em 0 0 #fff,
        .5em -.25em 0 0 #fff,
        .75em -.25em 0 0 #fff,
        -1em 0 0 0 #fff,
        -.75em 0 0 0 #fff,
        .75em 0 0 0 #fff,
        1em 0 0 0 #fff,
        -1em .25em 0 0 #fff,
        1em .25em 0 0 #fff,
        -.75em .75em 0 0 #fff,
        .75em .75em 0 0 #fff,
        /* Left Arm */
        1.25em 0 0 0 #fff,
        1.25em -.25em 0 0 #fff,
        1.25em -.5em 0 0 #fff,
        /* Right Arm */
        -1.25em 0 0 0 #fff, 
        -1.25em -.25em 0 0 #fff, 
        -1.25em -.5em 0 0 #fff, 
        /* Left Foot */
        -1em 1em 0 0 #fff, 
        -1em 1em 0 0 #fff, 
        /* Right Foot */
        1em 1em 0 0 #fff, 
        1em 1em 0 0 #fff;
    }
}

@keyframes space-invader-2 {
    50% {
    box-shadow: 
      /* Body */
        -.125em -.5em 0 .25em #fff,
        .125em -.5em 0 .25em #fff,
        -.75em -.375em 0 .125em #fff,
        -.875em -.375em 0 .125em #fff,
        .75em -.375em 0 .125em #fff,
        .875em -.375em 0 .125em #fff,
        -1em 0 0 .25em #fff,
        1em 0 0 .25em #fff,
        -.5em .25em 0 0 #fff,
        -.25em .25em 0 0 #fff,
        0 .25em 0 0 #fff,
        .25em .25em 0 0 #fff,
        .5em .25em 0 0 #fff,
        /* Crotch */
        .3125em .5em 0 0 #fff,
        .5em .5em 0 0 #fff,
        .625em .5em 0 0 #fff,
        -.3125em .5em 0 0 #fff,
        -.5em .5em 0 0 #fff,
        -.625em .5em 0 0 #fff,
        .0625em .75em 0 0 #fff,
        -.0625em .75em 0 0 #fff,
        /* Right Leg */
        -.75em .75em 0 0 #fff,
        -.9375em .75em 0 0 #fff,
        -.75em 1em 0 0 #fff,
        -.5em 1em 0 0 #fff,
        /* Left Leg */
        .75em .75em 0 0 #fff,
        .9375em .75em 0 0 #fff,
        .75em 1em 0 0 #fff,
        .5em 1em 0 0 #fff;
    }
}

@keyframes space-invader-3 {
    50% {
    box-shadow: 
        /* Body */
        0 -.625em 0 .125em #fff,
        -.25em -.375em 0 .125em #fff,
        .25em -.375em 0 .125em #fff,
        .625em -.25em 0 0 #fff,
        -.625em -.25em 0 0 #fff,
        0 .125em 0 .125em #fff,
        -.75em .125em 0 .125em #fff,
        .75em .125em 0 .125em #fff,
        .375em .25em 0 0 #fff,
        -.375em .25em 0 0 #fff,
        /* Crotch */
        .125em .5em 0 0 #fff,
        -.125em .5em 0 0 #fff,
        /* Right Leg */
        -.375em .5em 0 0 #fff,
        -.625em .75em 0 0 #fff,
        -.875em 1em 0 0 #fff,
        -.375em 1em 0 0 #fff,
        /* Left Leg */
        .375em .5em 0 0 #fff,
        .625em .75em 0 0 #fff,
        .875em 1em 0 0 #fff,
        .375em 1em 0 0 #fff;
    }
}
</style>