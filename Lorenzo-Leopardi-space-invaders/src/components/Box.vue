<template>
  <div class="box" :style="style" v-if="true">
      
     <img id="sprite" :src="active ? 'src/assets/Enemy_1-1.png' : 'src/assets/Enemy_1-2.png' ">
      <!-- <h1>{{top}}</h1>
      <h1>{{left}}</h1> -->
  </div>
</template>

<script>
export default {
    name: "Box",
    props: {
        top: 0,
        left: 0,
        active: false,
        // alive: true,
    },
emits:['borders'],
computed: {
            style () {
                return{
                    '--top-pos': this.top,
                    '--left-pos': this.left,
                }
            }
        },
methods: {
    borders(){
        this.$emit('borders', document.getElementById("sprite").getBoundingClientRect());
    }
}
        }
</script>

<style scoped>
.box{
    /* border: 1px solid white; */
    width: calc(var(--unit)/11);
    height: calc(var(--unit)/11);
    display: grid;
    place-items: center;
    font-size: 1vw;
    cursor: pointer;
    position: relative;
    top: calc(var(--unit)/11*var(--top-pos)/2);
    left: calc(var(--unit)/11*var(--left-pos)/8);
}

img {
    max-width: 70%;
    max-height: 70%;
}
</style>