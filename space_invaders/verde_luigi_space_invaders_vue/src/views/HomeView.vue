<template>
   <main>
      <img class="logo" src="@/assets/images/logo.png" alt="Logo">
      <h1>Press ENTER to Start</h1>
   </main>
</template>

<script>
export default {
   name: "HomeView",
   
   methods: {
      start() {
         this.$router.push({ name: "game" });
      }
   },

   mounted() {
      window.addEventListener("keypress", (event) => event.key == "Enter" ? this.start() : null );
   }
}
</script>

<style>
@import "@/assets/style/style.scss";
</style>