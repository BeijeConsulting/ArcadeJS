<template>
  <div class="container" tabindex="1">
    <div
      class="polli d-flex justify-content-center flex-wrap position-relative"
    >
      <div :key="index" v-for="(rows, index) in 10">
        <Alien v-for="(alien, index) in 5" :key="index" class="alien" />
      </div>
    </div>
    <div class="player d-flex justify-content-center flex-wrap">
      <div
        id="ship"
        class="ship d-flex justify-content-center flex-wrap position-relative"
        ref="spaceShip"
      ></div>
    </div>

    <Laser v-for="laser in lasers" v-bind:is="laser.type" :key="laser.id" />
  </div>
</template>

<script>
import Alien from "@/components/Alien.vue";
import Laser from "@/components/Laser.vue";
let leftDistance = 0;

export default {
  name: "Game",
  components: { Alien, Laser },

  data() {
    return {
      lasers: [],
      count: 0,
      countAlien: 0,
    };
  },

  mounted() {
    window.addEventListener("keypress", this.getKeyCod);
    this.moveAlienMove();
  },

  methods: {
    moveLaserMove() {
      const lasers = document.getElementsByClassName("laser");
      const ship = document.getElementById("ship");
      let bottomDistance = 800;
      let leftDistance = this.$refs.spaceShip.offsetLeft;
      let shipCalculated = false;
      const aliens = document.getElementsByClassName("alien");
      let alienEliminated = false;

      for (const laser of lasers) {
        laser.style.visibility = "visible";
      }

      setInterval(() => {
        for (const laser of lasers) {
          laser.style.left = leftDistance + "px";
          bottomDistance -= 30;
          laser.style.top = bottomDistance + "px";

          for (const alien of aliens) {
            if (!alienEliminated) {
              if (
                alien.getBoundingClientRect().left - 10 <=
                laser.getBoundingClientRect().left
              ) {
                if (
                  alien.getBoundingClientRect().left + 10 >=
                  laser.getBoundingClientRect().left
                ) {
                  if (
                    alien.getBoundingClientRect().top + 50 >=
                    laser.getBoundingClientRect().top
                  ) {
                    if (
                      alien.getBoundingClientRect().top - 50 <=
                      laser.getBoundingClientRect().top
                    ) {
                      if (alien.style.visibility != "hidden") {
                        alien.style.visibility = "hidden";
                        this.countAlien += 1;
                        console.log(this.countAlien);
                        if (this.countAlien == 50) {
                           this.$router.push({ name: "home", params: {message: "() => Congrats.showWonMessage()"} });
                        }
                        alienEliminated = true;
                        laser.style.visibility = "hidden";
                      }
                    }
                  }
                }
              }
             
            }

             
          }
        }
      }, 1);
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

          console.log(row.getBoundingClientRect().top);
              if (row.getBoundingClientRect().top > 400) {
                this.$router.push({ name: "home", params: {message: "() => Failure.showLostMessage()"} });
              }
        }
      }, 100);
    },

    getKeyCod(event) {
      let key = event.key;
      const ship = document.getElementById("ship");

      if (key == "d") {
        //d
        leftDistance += 15;
        ship.style.left = leftDistance + "px";
        console.log(leftDistance);
        console.log(ship.style.left);
      } else if (key == "a") {
        //a
        leftDistance -= 15;
        ship.style.left = leftDistance + "px";
      } else {
        this.addLaser();
      }
    },

    addLaser() {
      console.log("Add laser activated");
      if (this.count == 0) {
        this.lasers.push({
          type: Laser,
          id: this.count++,
        });
        this.moveLaserMove();
      } else {
        this.moveLaserMove();
      }
    },
  },
};
</script>

     
<style>
.player {
  position: fixed;
  bottom: 30px;
  width: 100%;
  left: 0;
}

.ship {
  background-color: #00ff00;
  margin: 20px 0;
  width: 30px;
  height: 15px;
}
</style>
