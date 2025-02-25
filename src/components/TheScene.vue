<script setup>
  import { ref } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/tesselation-square.js';
  import '../aframe/emit-when-near.js';
  import '../aframe/teleport-camera-rig.js';
  import '../aframe/bloom.js';
  

  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    fog="type: linear; color: #1e1e1e; near: 30; far: 30"
    background="color: #1e1e1e;"
    bloom="threshold: 1.0; strength: 0.3; radius: 1;"
  >

    <a-assets @loaded="allAssetsLoaded = true">

    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-entity light="type: point; color: #FFFFFF; intensity: 10" position="0 2 -30"></a-entity>
      <a-cylinder  position="0 2 -30" height="500" material="opacity:0.4;transparent:true;color:#FFFFFF;emissive:#FFFFFF;emissiveIntensity: 9.34  " width="3" emit-when-near teleport-camera-rig="x:0; y:0; z:0;"></a-cylinder>

      <a-ocean
        width="100"
        depth="100"
        amplitude="0.3"
        density="60"
        amplitudeVariance="1"
        color="#D8D8D8"
      ></a-ocean>
      <a-ocean
        width="100"
        depth="100"
        amplitude="0.05"
        density="60"
        amplitudeVariance="0.1"
        color="#E6E6E6"
      ></a-ocean>

    </template>

    <TheCameraRig />

  </a-scene>
</template>