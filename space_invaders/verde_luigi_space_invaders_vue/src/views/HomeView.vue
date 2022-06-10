<template>
   <main>
      <img class="logo" src="@/assets/images/logo.png" alt="Logo">
      <h1 class="big_title">Press ENTER to Start</h1>
   </main>
</template>

<script>
import gsap from "gsap";
export default {
   name: "HomeView",
   
   methods: {
      start() {
         this.$router.push({ name: "game" });
      }
   },

   mounted() {
      window.addEventListener("keypress", (event) => event.key == "Enter" ? this.start() : null );
      gsap.to(".big_title", {
         y: 80,
         ease: "bounce",
         yoyo: true, 
         duration: .7,
         repeat: -1,
      });
   }
}
</script>

<style>
@import "@/assets/style/style.scss";
</style>