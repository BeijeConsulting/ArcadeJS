<template>
   <div id="game" class="game" ref="game">

      <h1 class="title" v-if="isGameOver">{{outcomeMessage}}</h1>

      <!-- INVADER TYPE 1 -->
      <div v-for="(row, index) in invaderType1_Rows" :key="index + 'rows 1'" class="my_space">
         <Invader :id="'type_one_' + index" v-for="(invader, index) in invaderPerRow"
            :key="index + 'invader 1'" 
            :invaderType="invaderTypes[2]" 
         />
      </div>

      <!-- INVADER TYPE 2 -->
      <div v-for="(row, index) in invaderType2_Rows" :key="index + 'rows 2'" class="my_space">
         <Invader :id="'type_two_' + index" v-for="(invader, index) in invaderPerRow"
            :key="index + 'invader 2'" 
            :invaderType="invaderTypes[0]" 
         />
      </div>

      <!-- INVADER TYPE 3 -->
      <div v-for="(row, index) in invaderType2_Rows" :key="index + 'rows 3'" class="my_space">
         <Invader :id="'type_three_' + index" v-for="(invader, index) in invaderPerRow"
            :key="index + 'invader 3'" 
            :invaderType="invaderTypes[1]" 
         />
      </div>

      <div id="player" ref="player" class="player">
         <div :class="isGameOver ? 'animation_lose' : ''" class="head_player"></div>
         <div :class="isGameOver ? 'animation_lose' : ''" class="body_player"></div>
      </div>
   </div>
</template>

<script>
import { createApp } from 'vue'
import gsap from "gsap"
import Invader from "@/components/Invader.vue"
import Bullet from "@/components/Bullet.vue"

export default {
   name: "GameView",

   components: {
      Invader,
      Bullet
   },

   data() {
      return {
         invaderTypes: ["space-invader-1", "space-invader-2", "space-invader-3"],
         invaderPerRow: 9,
         invaderType1_Rows: 1,
         invaderType2_Rows: 2,
         invaderType3_Rows: 2,
         singleStep: 20,
         isGameOver: false,
         outcomeMessage: null,

         invadersDestroyed: 0,
         countBullets: 0,
         invaderBodyRange: 30

      }
   },

   methods: {
      shoot() {
         const bullet = this.createBullet();
         const xPoint = this.$refs.player.offsetLeft - 2.5 ;
         
         gsap.fromTo("#bullet_" + (this.countBullets - 1), 
            {
               left: xPoint,
               bottom: 55
            },
            {
               bottom: "100%",
               duration: 5,
               ease: "linear"
            }
         );

         this.bulletMoveListening(bullet);

      },

      createBullet() {
         const game = document.getElementById("game");
         const bullet = document.createElement("div");
         bullet.id = "bullet_" + this.countBullets++;
         bullet.classList.add("bullet");
         game.appendChild(bullet);
         
         return bullet
      },

      bulletMoveListening(bullet) {
         
         let compStyles = window.getComputedStyle(bullet);
         console.log(window.innerHeight);
         const listener = setInterval(() => {
            const bottomPosition = bullet.getBoundingClientRect().bottom;
            const leftPosition = bullet.getBoundingClientRect().left;

            if ((parseInt(bottomPosition) >= window.innerHeight) || this.invaderHitted(bottomPosition, leftPosition)) {
               clearInterval(listener)
               bullet.remove();
            }

         }, 100);

         
      },

      invaderHitted(bottomPosition, leftPosition) {
         const invaders = document.getElementsByClassName("space-invader");

         for (let invader of invaders) {
            if (invader.style.visibility == "hidden") {
               continue;
            }
            const leftPosInvader = invader.getBoundingClientRect().left;
            const bottomPosInvader = invader.getBoundingClientRect().bottom;
            if (((leftPosInvader - this.invaderBodyRange) <= leftPosition) &&
               ((leftPosInvader + this.invaderBodyRange) >= leftPosition) &&
               ((bottomPosInvader - this.invaderBodyRange) <= bottomPosition) &&
               ((bottomPosInvader + this.invaderBodyRange) >= bottomPosition)
            ) {
               // TODO 
               //this.destroyInvaderAnimation(invader.id);

               // setTimeout(invader.style.visibility = "hidden", 800)
               this.invadersDestroyed++;
               invader.style.visibility = "hidden";
               return true;
            }
         }
         return false;
      },

      isGameFinished() {
         const invaders = document.getElementsByClassName("space-invader");
         // const leftPosition = this.$refs.player.getBoundingClientRect().left;
         const bottomPosition = this.$refs.player.getBoundingClientRect().bottom;
         // console.log("left: ", leftPosition);
         console.log("bottom: ", bottomPosition);

         if (this.invadersDestroyed === (this.invaderPerRow * (this.invaderType1_Rows + this.invaderType2_Rows + this.invaderType3_Rows))) {
            this.outcomeMessage = "You Win!";
            return true
         }

         for (let invader of invaders) {
            if (invader.style.visibility == "hidden") {
               continue;
            }
            // const leftPosInvader = invader.getBoundingClientRect().left;
            const bottomPosInvader = invader.getBoundingClientRect().bottom + 25;
            if (((bottomPosInvader - this.invaderBodyRange) <= bottomPosition) &&
               ((bottomPosInvader + this.invaderBodyRange) >= bottomPosition)
            ) {
               this.outcomeMessage = "You Loose!";
               return true;
            }
         }
         return false;
      },

      destroyInvaderAnimation(invaderId) {

         gsap.to("#" + invaderId, {
            width: 0
         });
      },

      movePlayer(left) {
         let stepDirection = this.singleStep
         if (left) {
            stepDirection = -(this.singleStep);
         } 

         gsap.to("#player", {
            left: "+=" + stepDirection,
            duration: .1
         });
      },

      moveInvaders() {

         let moveRight = false;
         let moveBottom = false;
         let stepDirection = 50;
         let stepBottom = 0;

         const rowsInvader = document.getElementsByClassName("my_space");
         const row = rowsInvader[rowsInvader.length - 1];
         
         const move = setInterval(() => {

            if (this.isGameFinished()) {
               clearInterval(move);
               this.isGameOver = true
               setTimeout(() => {
                  this.$router.push({name: 'home'})
               }, 700 * 5);
            }

            const compStylesGame = window.getComputedStyle(this.$refs.game);
            const rowLeft = parseInt(window.getComputedStyle(row).getPropertyValue("left"));
            const rowWidth = parseInt(window.getComputedStyle(row).getPropertyValue("width"));
            const containerWidth = parseInt(compStylesGame.getPropertyValue("width"));

            if (rowLeft + rowWidth >= (containerWidth - 20) && !moveRight) {

               if(!moveBottom) {
                  stepBottom = 25;
                  moveBottom = true;
                  stepDirection = 0;
               } else {
                  stepBottom = 0;
                  moveBottom = false;
                  moveRight = true;
                  stepDirection = -50;
               }

            } else if(rowLeft <= 0 && moveRight) {

               if(!moveBottom) {
                  stepBottom = 25;
                  moveBottom = true;
                  stepDirection = 0;
               } else {
                  stepBottom = 0;
                  moveBottom = false;
                  moveRight = false;
                  stepDirection = 50;
               }
            }



            gsap.to(".my_space", {
               left: "+=" + stepDirection,
               bottom: "-=" + stepBottom,
               duration: .3,
            });
            
         }, 300);
      }

   },

   mounted() {
      this.moveInvaders();


      //SHOOT EVERY .3s
      let timeout = false;
      window.addEventListener("keypress", (event) => {
         if (!timeout && event.key == " ") {
            this.shoot();
            timeout = true;
            setTimeout(function() {
               timeout = false;  
            }, 100);
         } else if (event.key == "a") {
            this.movePlayer(true);
         } else if (event.key == "d") {
            this.movePlayer(false);
         }
      });

   },
}
</script>