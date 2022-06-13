<template>
    <img class="base" :src="sprite"/>
</template>

<script>
import sprite from '/assets/base.svg'

export default {
    name: "Player",

    data() {
        return {
            sprite,

            life: 5,
            hit: false
        }
    },

    methods: {
        getDamage() {           //CHECK ENEMY AND PLAYER BULLET POSITION WITH OWN
            if (this.hit) this.life--;

            if (this.life <= 0) this.die();
        },

        die() {         //DESTROY
            
        }
    }
}
</script>

<style>
.base {
    width: 3em;
    height: 3em;
}
</style>