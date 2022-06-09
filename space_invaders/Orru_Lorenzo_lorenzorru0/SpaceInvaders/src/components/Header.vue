<template>
    <header>
        <img src="../assets/img/Space_invaders_logo.png" alt="Space invaders logo">
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
    padding: 0 1.25rem;
}

img {
    width: 12.5rem;
}
</style>