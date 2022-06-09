<template>
    <header>
        <img src="../assets/img/logo.svg" alt="Space invaders logo">
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: center;
    padding: 1.25rem 0;
}

img {
    width: 12.5rem;
}
</style>