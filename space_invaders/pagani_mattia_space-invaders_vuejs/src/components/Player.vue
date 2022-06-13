<template>
    <div id="player" class="player" :style="{ left: currentPos + 'px' }">
        <div class="space-defender space-invader-defender"></div>
    </div>
</template>

<script>
export default {
    name: "Player",

    data() {
        return {
            life: 3,
            speed: 10,

            currentPos: 0,
        }
    },

    methods: {
        processKey(ev) {
            switch (ev.key) {
                case ' ':
                    this.shoot();
                    console.log("space");
                    break;

                case 'a':
                    this.move(-this.speed);
                    console.log("A");
                    break;

                case 'd':
                    this.move(this.speed);
                    console.log("D");
                    break;

                case 'Enter':
                    //NEW GAME??
                    console.log("enter");
                    break;

                case 'Escape':
                    //PAUSE/UNPAUSE
                    console.log("esc");
                    break;

                default:
                    console.log("player" + ev.key);
                    break;
            }
        },

        shoot() {           //SPAWN BULLET AT THIS POSITION, IT MOVES ALONE FORWARD

        },

        move(speed) {
            if (this.currentPos <= 0 + 24 && speed <= 0) return;
            if (this.currentPos >= document.getElementById('gameplay').clientWidth - 24 && speed >= 0) return;
            
            this.currentPos += speed;
        },

        getDamage() {           //CHECK ENEMY BULLET POSITION WITH OWN

            if (this.life <= 0) this.die();
        },

        die() {                 //END GAME

        },
    },

    mounted() {
        this.currentPos = document.getElementById('gameplay').clientWidth * 0.5 - 2;

        let self = this;

        window.addEventListener('keydown', function (ev) {
            self.processKey(ev);
        });
    }
}
</script>

<style>
.player {
    justify-content: bottom;
    position: absolute;
    bottom: 10px;
    left: 0px;
}

.space-defender {
    background-color: rgb(0, 255, 55);
    width: 0.25em;
    height: 0.25em;
}

.space-invader-defender {
    box-shadow:
        0 0 0 .25em rgb(0, 255, 55),
        .625em 0 0 .25em rgb(0, 255, 55),
        -.625em 0 0 .25em rgb(0, 255, 55),
        1em .0625em 0 .1875em rgb(0, 255, 55),
        -1em .0625em 0 .1875em rgb(0, 255, 55),
        0 -.25em 0 .25em rgb(0, 255, 55),
        0 -.625em 0 0 rgb(0, 255, 55);
}
</style>