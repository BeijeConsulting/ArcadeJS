<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  name: "App",
  components: { RouterLink, RouterView },
};
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style>
h1 {
  color: white;
}

.wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 0;
}

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #1d1b1d;
}

#app {
}

header {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.logo {
  margin-top: 150px;
  margin-bottom: 70px;
  width: 50%;
}
</style>
