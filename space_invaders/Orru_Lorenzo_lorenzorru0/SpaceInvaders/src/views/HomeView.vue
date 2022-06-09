<template>
    <div class="container">
        <header>
            <Header/>
        </header>
    </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
    name: 'HomeView',
    components: { Header },
}
</script>

<style>
.container {
    background-image: url('/background.png');
}
</style>
