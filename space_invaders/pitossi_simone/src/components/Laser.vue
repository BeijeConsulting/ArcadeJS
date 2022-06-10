<template>
  <div id="laser" class="laser  d-flex justify-content-center flex-wrap position-absolute"></div>
</template>



<style>
.laser {
  background-color: #00ff00;
  margin: 20px;
  width: 2px;
  height: 10px;
  z-index: 1000;
}
</style>

<script>
export default {
  name: "Laser"
}
  </script>