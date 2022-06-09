<template>
    <div class="container">
        <header>
            <Header/>
        </header>
            
        <Field/>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Field from '../components/Field.vue'

export default {
    name: 'HomeView',
    components: { Header, Field },
}
</script>

<style>
.container {
    background-image: url('../assets/img/backgroud.jpg');
    height: 100%;
}
</style>
