<script>
  import Board from "@/components/Board.vue";
  import Player from "@/components/Player.vue";

  export default {
    name: "App",
    components: {Board, Player},
    data(){
      return{
        esito: {
          win: null,
          player: null,
        },
        playerPos: 0,
        bullet: false,
        isBullet: false,
      }
    },
    methods: {
      setEsito(esito){
        this.esito = esito;
      },
      reset(){
        this.esito.win = null;
        this.esito.player = null;
      },
      playerMove(left_flag){
          //console.log("in");
          if (!left_flag && this.playerPos < 50/11*12/2){
              this.playerPos ++;
          } else if (left_flag && this.playerPos >= -50/11*12/2){
              this.playerPos --;
          }
          console.log("PlayerPos ",this.playerPos);
      },
      async updateBullet(value){
        this.isBullet = value;
        this.bullet = value;
        //console.log("isBulletApp: ", this.isBullet);
      },
      async shoot(){
        if(!this.isBullet){
        console.log("shoot");
        this.bullet = true;}
        else{
          this.bullet = false;
          this.isBullet = false;}
        }
      
    }
  }
</script>

<template>
  <div class="container"  @keydown.space="shoot()" @keydown.arrow-right="playerMove(false)" @keydown.arrow-left="playerMove(true)" tabindex="1">
    <Board :bullet="bullet" :bulletLeft= "playerPos" @isBullet="updateBullet"/>
   <Player :left="playerPos" style="margin-top : 40vh"/>
  </div>
</template>

<style>
@import "./assets/base.css";

.btn{
padding: 5px 0px;
width: 20vw;
border-radius: 100%;
font-size: 1em;
margin-top: 2em;
}

.container{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
