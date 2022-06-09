<template>
    <div class="appDiv">
        <HomeView/>
    </div>
</template>

<script>
import HomeView from './views/HomeView.vue' 

export default {
    name: 'Field',
    components: { HomeView }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.appDiv {
    font-family: 'Press Start 2P', cursive;
    height: 100vh;
}
</style>
