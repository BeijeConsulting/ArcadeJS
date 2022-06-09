<template>
   <div :class="invaderType" class="space-invader animate"></div>
</template>

<script>
export default {
   name: "Invader",
   props: {
      invaderType: String
   }
}
</script>

<style>

</style>