<template>
  <div class="bullet" :style="style">
      <!-- <h1>{{top}}</h1>
      <h1>{{left}}</h1> -->
  </div>
</template>

<script>
export default {
    name: "Bullet",
    props: {
        top: 0,
        left: 0,
    },

computed: {
            style () {
                console.log(this.top);
                console.log(this.left);
                return{
                    '--top-pos': this.top+43+"vw",
                    '--left-pos': this.left+43+"vw",
                }
            }
        }
        }
</script>

<style scoped>

@keyframes example {
  from {top: 85vh;
        left: var(--left-pos);}
  to {top: 0;
   left: var(--left-pos);}
}
.bullet{
    border: 1px solid white;
    background-color: white;
    width: calc(var(--unit)/110);
    height: calc(var(--unit)/44);
    font-size: 1vw;
    cursor: pointer;
    animation-name: example;
    animation-duration: 1.1s;
    animation-timing-function: linear;
    position: absolute;
    top: 0; /*3U in 300ms */
    left: var(--left-pos)+"%";
}
</style> 