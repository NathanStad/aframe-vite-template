<template>
  <a-entity position="500 0 500">
    <a-light type="point" color="#FFFFFF" intensity="1" distance="10" position="0 2 0"></a-light>
    <a-plane
      position="0 0 0"
      rotation="0 0 0"
      width="4"
      height="2"
      color="#000000"
      material="opacity: 0.8"
    ></a-plane>
    <a-text
      value="Félicitations ! Vous avez atteint la bonne fin !"
      align="center"
      position="0 0.5 0.1"
      width="3"
      color="#FFFFFF"
    ></a-text>
    <a-text
      value="Merci d'avoir joué !"
      align="center"
      position="0 -0.5 0.1"
      width="3"
      color="#FFFFFF"
    ></a-text>
  </a-entity>
</template>

<script setup>
</script>

<style scoped>
</style>
