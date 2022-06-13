<script>
import Enemy from "@/components/Enemy.vue"
import Player from "@/components/Player.vue"

export default {
  name: "Gameplay",

  components: {
    Enemy, Player
  },

  data() {
    return {
      enemyCurrentHorizontal: 0,//document.getElementById('gameplay').clientWidth,//window.innerWidth * 0.5 - 350,
      enemyCurrentVertical: 0, //window.innerHeight,
      enemyHorizontalSpeed: 50,
      enemyVerticalSpeed: 30,
      enemyDirection: 1,
    }
  },

  methods: {
    moveEnemies() {            //RUN EVERY 1 sec
      setInterval(() => {
        console.log("move enemy");
        let speed = this.enemyHorizontalSpeed;
        if (this.enemyCurrentVertical <= -document.getElementById('gameplay').clientHeight * 0.65)
        {
          console.log("ENEMY SUL FONDO");
          return;
        }
        
        if (this.enemyCurrentHorizontal <= 0) { // + document.getElementById("enemies").clientWidth * 0.15
          this.enemyCurrentVertical -= this.enemyVerticalSpeed;
          this.enemyDirection = 1;
        }

        if (this.enemyCurrentHorizontal >= document.getElementById('gameplay').clientWidth * 0.45) // * 0.20
        {
          this.enemyCurrentVertical -= this.enemyVerticalSpeed;
          this.enemyDirection = -1;
        }

        if (this.enemyDirection <= -1) speed = -speed;

        this.enemyCurrentHorizontal += speed;
      }, 1000);

    },
  },

  mounted() {
    this.enemyCurrentHorizontal = document.getElementById('gameplay').clientWidth * 0.5 - 352;
    this.moveEnemies();
  }
}
</script>

<template>
  <div id="gameplay" class="gameplay">
    <div id="enemies" class="enemies">
      <div class="rows" :style="{ left: enemyCurrentHorizontal + 'px', bottom: enemyCurrentVertical + 'px' }">
        <div class="row">
          <Enemy :invader="2" v-for="(x, i) in 11" :key="i"/>
        </div>
        <div class="row">
          <Enemy :invader="0" v-for="(x, i) in 11" :key="i"/>
        </div>
        <div class="row">
          <Enemy :invader="0" v-for="(x, i) in 11" :key="i"/>
        </div>
        <div class="row">
          <Enemy :invader="1" v-for="(x, i) in 11" :key="i"/>
        </div>
        <div class="row">
          <Enemy :invader="1" v-for="(x, i) in 11" :key="i"/>
        </div>
      </div>
    </div>
    <div class="player">
      <Player />
    </div>
  </div>
</template>

<style>
.gameplay {
  position: relative;
  height: 75%;
  width: 50%;
  background-color: #000;
  border: 1px solid #fff;
}

.enemies {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.row {
  display: flex;
}

.rows {
  position: relative;
  max-width: 704px;
}
</style>