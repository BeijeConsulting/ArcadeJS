<template>
  <header tabindex="1" @keyup.enter="prova">
    <img alt="Space logo" class="logo" src="@/assets/space-invaders-logo.png" />
    <h1 v-if="outcome">{{ outcome }}</h1>
    <h1 v-else>Press enter to start the game</h1>
  </header>
</template>

<script>
export default {
  name: "HomeView",

  data() {
    return {
      outcome: null,
    };
  },

  mounted() {
    console.log(this.$route.params);
    if(this.$route.params != {}) {
      this.outcome = this.$route.params.message;
      console.log(this.outcome);
    }
  },

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