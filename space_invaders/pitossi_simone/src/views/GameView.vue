<template>
  <div class="container" tabindex="1" @keydown="getKeyCod">
    <div
      class="polli d-flex justify-content-center flex-wrap position-relative"
    >
      <div :key="index" v-for="(rows, index) in 12">
        <Alien v-for="(alien, index) in 5" :key="index" />
      </div>
    </div>
    <div class="d-flex justify-content-center flex-wrap position-relative">
      <SpaceShip id="ship" class="ship" />
    </div>


    <component class="laser justify-content-center flex-wrap position-relative"
      v-for="laser in lasers"
      v-bind:is="laser.type"
      :key="laser.id"
    ></component>
  </div>
</template>

<script>
import Alien from "@/components/Alien.vue";
import SpaceShip from "@/components/SpaceShip.vue";
import Laser from "@/components/Laser.vue";
let leftDistance = 0;

export default {
  name: "Game",
  components: { Alien, SpaceShip, Laser },

  data() {
    return {
      lasers: [],
      count: 0,
    };
  },

  mounted() {
    this.moveAlienMove();
  },

  methods: {
 moveLaserMove() {
     let shipPosition = false; 
        console.log("Muoviti");
      const lasers = document.getElementsByClassName("laser");
      const ship = document.getElementById("ship");
      let bottomDistance = -60;

      setInterval(() => {
        for (const laser of lasers) {
            if(!shipPosition) {
                laser.style.left = 630 + "px",
                laser.style.left += ship.style.left,
                shipPosition = true;
                console.log(laser);
            }

            
              bottomDistance -= 5;
              laser.style.top = bottomDistance + "px";
            
        }
      }, 50);
    },

    moveAlienMove() {
      const rows = document.getElementsByClassName("polli");
      let moveRight = true;
      let leftDistance = 0;
      let bottomDistance = 0;

      setInterval(() => {
        for (const row of rows) {
          if (moveRight) {
            if (leftDistance + 5 <= 100) {
              leftDistance += 5;
              row.style.left = leftDistance + "px";
            } else {
              moveRight = false;
              bottomDistance += 40;
              row.style.top = bottomDistance + "px";
            }
          } else if (!moveRight) {
            if (leftDistance + 5 >= 0) {
              leftDistance -= 5;
              row.style.left = leftDistance + "px";
            } else {
              moveRight = true;
              bottomDistance += 40;
              row.style.top = bottomDistance + "px";
            }
          }
        }
      }, 100);
    },

    getKeyCod() {

      let key = window.event.keyCode;
      const ship = document.getElementById("ship");

      console.log("ship.style.left :", ship.style.left);

      console.log("key :", key);
      console.log("top :", ship.offsetTop);
      console.log("left :", ship.offsetLeft);

      if (key == 68) {
        //d
        leftDistance += 5;
        ship.style.left = leftDistance + "px";
        console.log(leftDistance);
        console.log(ship.style.left);
      } else if (key == 65) {
        //a
        leftDistance -= 5;
        ship.style.left = leftDistance + "px";
      } else {
        this.addLaser();
      }
    },

    addLaser() {
      console.log("Add laser activated");
      this.lasers.push({
        type: Laser,
        id: this.count++,
      });
      this.moveLaserMove();
    },
  },
};
</script>

     
<style>
</style>
