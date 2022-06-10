<template>
  <button class="btn" style="margin-bottom : 5vh" @click="frame()">START</button>
  <div id="game_board" class="board">
    <!-- <Box v-for="(box, index) in board" :player="box" :key="index" @click="select(index)"/> -->
    <div id="row" v-for="row in chunked" :key="row">
      <Box
        v-for="col in row"
        :key="col"
        :top="col[0]"
        :left="col[1]"
        :active="col[2]"
        :alive="col[3]"
      />
    </div>
  </div>
    <Bullet id="bul" v-if="bullet" :left="bulletLeft" :top="0"/>

</template>

<script>
import Box from "@/components/Box.vue";
import Bullet from "@/components/Bullet.vue";
import chunk from "chunk";
var b = chunk(Array(55).fill([0, 0, false, true]), 5);
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
var topMov = 0;
var leftMov = 0;
var leftFlag = true;

export default {
  name: "Board",
  components: { Box , Bullet},
  props: {
      bullet: false,
      bulletLeft: 0,
      },
  data() {
    return {
      board: Array(55).fill(null),
      chunked: b,
    };
  },
    emits: ["bulletPos", "isBullet"],
  methods: {
      isBullet(){
          this.$emit('isBullet', 
          this.bullet === true && document.getElementById("bul").getBoundingClientRect().top > 0 ? true : false);
            // console.log("emitted pos<0" , document.getElementById("bul").getBoundingClientRect().top);
            // console.log("emitted bullet on" , this.bullet);
     },
    getPos() {
        this.$emit('bulletPos',[document.getElementById("bul").getBoundingClientRect().left, document.getElementById("bul").getBoundingClientRect().top]);
         },
    async checkHit(){
        if (this.bullet){
         for (var j = b[0].length; j > 0; j--) {
             for (var i = 0; i < b.length; i++) {
                 if(this.chunked[i][j - 1][3] === false){
                 continue;
                }
                var top = this.chunked[i][j - 1][0];
                var left = this.chunked[i][j - 1][1];

                }
         }
        }
    },
    async move(left_flag, top_flag) {
        
      if (left_flag === true) {
        leftMov += 1;
      } else if (left_flag === false) {
        leftMov -= 1;
      }
      if (top_flag) {
        topMov += 1;
      }
      for (var j = b[0].length; j > 0; j--) {
        for (var i = 0; i < b.length; i++) {
            if(this.chunked[i][j - 1][3] === false){
                continue;
            }
            this.checkHit();
            this.chunked[i][j - 1] = [
            topMov,
            leftMov,
            top_flag ? this.chunked[i][j - 1][2] : !this.chunked[i][j - 1][2],
            true];
          //console.log("bulletBoardPre: " , this.bullet);
          try{
          this.isBullet();
          } catch(error){}
          await timer(9.7);
          //console.log("bulletBoardPost: " , this.bullet);

        
      }
    }
    },
    async frame() {
        
        //console.log(this.bullet);
        while(true){
            console.log("bulletLeft", this.bulletLeft);
            if (leftMov === 8) {
                await this.move(null, true);
                leftFlag = false;
                await this.move(leftFlag, null);
            } else if (leftMov === -8) {
                await this.move(null, true);
                leftFlag = true;
                await this.move(leftFlag, null);
            } else {
                await this.move(leftFlag, null);
            }
    }
    },

    checkWin() {
      for (const winCond of this.winningConditions) {
        const a = this.board[winCond[0]];
        const b = this.board[winCond[1]];
        const c = this.board[winCond[2]];

        if (a === null || b === null || c === null) {
          continue;
        }
        if ((a === b) & (b === c)) {
          this.esito.player = this.currentPlayer;
          this.esito.win = true;
          return true;
        }
        return false;
      }
    },
  }
};
</script>

<style>
    :root {
    --unit: 50vw;
    }
    .playfield {
    padding: 20px 0px;
    width: calc(var(--unit) / 11 * 13);
    }

    .board {
    width: var(--unit);
    height: calc(var(--unit) * 5 / 11);
    display: flex;
    flex-wrap: wrap;
    }

    .row {
    width: calc(var(--unit) / 11);
    height: calc(var(--unit) / 5);
    }
</style>
