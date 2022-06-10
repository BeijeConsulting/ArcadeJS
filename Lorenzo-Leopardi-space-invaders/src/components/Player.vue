<template>
  <div class="player" :style="style">
      Player
      <!-- <h1>{{top}}</h1>
      <h1>{{left}}</h1> -->
  </div>
</template>

<script>
export default {
    name: "Player",
    props: {
        top: 0,
        left: 0,
    },

computed: {
            style () {
                return{
                    '--left-pos': this.left+"vw",
                }
            }
        }
        }
</script>

<style>
.player{
    border: 1px solid white;
    background-color: greenyellow;
    width: calc(var(--unit)/11);
    height: calc(var(--unit)/22); 
    font-size: 1vw;
    cursor: pointer;
    display: grid;
    position: relative;
    left: var(--left-pos);
}
</style>