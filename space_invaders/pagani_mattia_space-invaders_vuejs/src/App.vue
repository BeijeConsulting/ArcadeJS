<script>
import Gameplay from "@/components/Gameplay.vue"

export default {
  components: {
    Gameplay
  },

  data() {
    return {
      hiscore: 0,
    }
  }
}
</script>

<template>
  <div class="container">
    <Gameplay/>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}
</style>