<template>
   <div id="game" class="game" ref="game">
      <!-- INVADER TYPE 1 -->
      <div v-for="(row, index) in invaderType1_Rows" :key="index + 'rows 1'" class="my_space">
         <Invader v-for="(invader, index) in invaderPerRow"
            :key="index + 'invader 1'" 
            :invaderType="invaderTypes[2]" 
         />
      </div>

      <!-- INVADER TYPE 2 -->
      <div v-for="(row, index) in invaderType2_Rows" :key="index + 'rows 2'" class="my_space">
         <Invader v-for="(invader, index) in invaderPerRow"
            :key="index + 'invader 2'" 
            :invaderType="invaderTypes[0]" 
         />
      </div>

      <!-- INVADER TYPE 3 -->
      <div v-for="(row, index) in invaderType2_Rows" :key="index + 'rows 3'" class="my_space">
         <Invader v-for="(invader, index) in invaderPerRow"
            :key="index + 'invader 3'" 
            :invaderType="invaderTypes[1]" 
         />
      </div>

      <div id="player" ref="player" class="player">
         <div class="head_player"></div>
         <div class="body_player"></div>
      </div>
      <Bullet />
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
         invaderPerRow: 11,
         invaderType1_Rows: 1,
         invaderType2_Rows: 2,
         invaderType3_Rows: 2,

         countBullets: 0

      }
   },

   methods: {
      shoot() {
         this.createBullet();
         const xPoint = this.$refs.player.offsetLeft - 2.5 ;
         
         gsap.fromTo("#bullet_" + (this.countBullets - 1), 
            {
               left: xPoint,
               bottom: 55
            },
            {
               bottom: "100%",
               duration: 1.6,
               ease: "linear"
            }
         );
      },
      createBullet() {
         const game = document.getElementById("game");
         const bullet = document.createElement("div");
         bullet.id = "bullet_" + this.countBullets++;
         bullet.classList.add("bullet");
         game.appendChild(bullet);   
      }
   },

   mounted() {

      //SHOOT EVERY .4s
      let timeout = false;
      window.addEventListener("keypress", (event) => {
         if (!timeout && event.key == " ") {
            this.shoot();
            timeout = true;
            setTimeout(function() {
               timeout = false;  
            }, 400);
         }
      });
   }
}
</script>