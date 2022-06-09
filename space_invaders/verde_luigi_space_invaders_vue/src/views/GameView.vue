<template>
   <div class="game">
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

      <div class="player">
         <div class="head_player"></div>
         <div class="body_player"></div>
      </div>
   </div>
</template>

<script>
import Invader from "@/components/Invader.vue"

export default {
   name: "GameView",

   components: {
      Invader
   },

   data() {
      return {
         invaderTypes: ["space-invader-1", "space-invader-2", "space-invader-3"],
         invaderPerRow: 11,
         invaderType1_Rows: 1,
         invaderType2_Rows: 2,
         invaderType3_Rows: 2,


      }
   }
}
</script>