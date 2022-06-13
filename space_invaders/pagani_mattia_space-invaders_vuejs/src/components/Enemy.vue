<template>
    <div class="enemy">
        <div v-if="invader === 0" class="space-invader space-invader-1 animate"></div>
        <div v-else-if="invader === 1" class="space-invader space-invader-2 animate"></div>
        <div v-else class="space-invader space-invader-3 animate"></div>
    </div>
</template>

<script>
export default {
    name: "Enemy",

    props: {
        invader: Number,
    },

    data() {
        return {
            life: 1,
        }
    },

    methods: {
        shoot() {

        },

        getDamage() {           //CHECK PLAYER BULLET POSITION WITH OWN

        },

        die() {

        }
    },

    mounted() {
        
    }
}
</script>

<style>
.space-invader {
    background-color: #fff;
    width: 0.25em;
    height: 0.25em;
    margin: 30px 30px;
}

.space-invader-ufo {
    box-shadow:
        /* Body */
        -.25em -.625em 0 .125em #fff,
        .25em -.625em 0 .125em #fff,
        -.25em -.375em 0 .125em #fff,
        -.75em -.375em 0 .125em #fff,
        -1em -.375em 0 .125em #fff,
        .25em -.375em 0 .125em #fff,
        .75em -.375em 0 .125em #fff,
        1em -.375em 0 .125em #fff,
        0 .125em 0 .125em #fff,
        -.75em .125em 0 .125em #fff,
        .75em .125em 0 .125em #fff,
        -.375em .25em 0 0 #fff,
        -1.125em .25em 0 0 #fff,
        .375em .25em 0 0 #fff,
        1.125em .25em 0 0 #fff,
        1.375em -.25em 0 0 #fff,
        1.5em .125em 0 .125em #fff,
        1.875em .25em 0 0 #fff,
        -1.375em -.25em 0 0 #fff,
        -1.5em .125em 0 .125em #fff,
        -1.875em .25em 0 0 #fff,
        0 .375em 0 .125em #fff,
        1.25em .375em 0 .125em #fff,
        1em .375em 0 .125em #fff,
        1.125em .75em 0 0 #fff,
        -1.25em .375em 0 .125em #fff,
        -1em .375em 0 .125em #fff,
        -1.125em .75em 0 0 #fff;
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

.space-invader-1.animate {
    animation-name: space-invader-1;
}

.space-invader-2.animate {
    animation-name: space-invader-2;
}

.space-invader-3.animate {
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