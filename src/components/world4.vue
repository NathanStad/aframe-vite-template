<template>
  <a-entity position="500 0 0">
    <!-- lumière -->

    <a-entity
      id="light"
      light="type: point; color: rgb(255, 230, 162); intensity: 10"
      position="8 9 23"
    ></a-entity>
    <a-entity
      id="light"
      light="type: point; color: rgb(255, 230, 162); intensity: 10"
      position="7 9 3"
    ></a-entity>
    <a-entity
      id="light"
      light="type: point; color: rgb(255, 230, 162); intensity: 15"
      position="13 9 2"
    ></a-entity>

    <!-- Contenu -->

    <perso position="" couleur=""></perso>
    
    <!-- Sol -->

    <a-entity
      id="main-room"
      gltf-model="#world4"
      rotation="0 0 0"
      position="0 -0.5 0"
      scale="2 2 2"
    ></a-entity>

    <!-- nav-mesh -->

    <a-entity
      geometry="primitive: plane; height:8.5; width: 24"
      position="-2 0 2"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
    <a-entity
      geometry="primitive: plane; height:25; width: 11.5"
      position="6.5 0 11"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
  </a-entity>
</template>

<script setup>
import perso from "./personnage.vue"

</script>
