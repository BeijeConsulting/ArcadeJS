<template>
  <header tabindex="1" @keyup.enter="prova">
    <img alt="Space logo" class="logo" src="@/assets/space-invaders-logo.png" />
    <h1>Press enter to start the game</h1>
  </header>
</template>

<script>
export default {
  name: "HomeView",

  methods: {
    prova() {
      console.log("Enter");
      this.$router.push({ name: "game" });
      this.home = false;
      console.log(this.home);
    },
  },
};
</script>

<style>
</style>