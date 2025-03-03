<script setup>
import { ref, computed } from "vue";
import { onMounted, watch } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/tesselation-square.js";
import "../aframe/emit-when-near.js";
import "../aframe/teleport-camera-rig.js";
import "../aframe/bloom.js";
import '../aframe/simple-grab.js';
import '../aframe/clickable.js';
import scene1 from "./world1.vue";
import scene2 from "./world2.vue";
import scene3 from "./world3.vue";
import scene4 from "./world4.vue";
import sceneEnd from "./worldEnd.vue";
import EndScreen from "./EndScreen.vue"; // Import the new component

const allAssetsLoaded = ref(false);
const choices = ref([]);
const lvlScene = ref(1);
const goodEnding = ref(false); // Add a ref to track the good ending

const handleGameEnded = (event) => {
  
  console.log(lvlScene.value);
  console.log(event.message);
  if (lvlScene.value === 4) {
    choices.value.push(event.choice);
    console.log(choices.value);
    console.log("test");
    
    if (choices.value[1] === true && choices.value[2] === true && choices.value[3] === true) {
      goodEnding.value = true;
      console.log('Good ending ',goodEnding.value);
    }
    
  } else {
    choices.value.push(event.choice);
    lvlScene.value = ++lvlScene.value;
  }
  console.log(choices.value);
};
const muteAllSoundsExceptAmbient = () => {
  const sounds = document.querySelectorAll('a-entity[sound]');
  sounds.forEach(sound => {
    if (sound.id !== 'ambient') {
      sound.components.sound.stopSound();
    }
  });
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'p') {
    muteAllSoundsExceptAmbient();
  }
});
</script>

<template>
  <a-scene
    fog="type: linear; color: #1e1e1e; near: 30; far: 30"
    background="color: #1e1e1e;"
    bloom="threshold: 1.0; strength: 0.4; radius: 1;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
    xr-mode-ui="XRMode: xr"
    simple-grab
  >
  <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="world2"
        src="/assets/models/world1/scene.gltf"></a-asset-item>
      <a-asset-item
        id="world3"
        src="/assets/models/world2/scene.gltf"></a-asset-item>
      <a-asset-item
        id="world4"
        src="/assets/models/world3/scene.gltf"></a-asset-item>
      <a-asset-item
        id="worldEnd"
        src="/assets/models/world4/scene.gltf"></a-asset-item>
  </a-assets>
  <template v-if="allAssetsLoaded">
    <scene1 @endGame="handleGameEnded" />
    <scene2 @endGame="handleGameEnded"/>
    <scene3 @endGame="handleGameEnded" />
    <scene4 @endGame="handleGameEnded" />
    <sceneEnd @endGame="handleGameEnded" :choices="goodEnding" />
    <EndScreen /> <!-- Conditionally render the EndScreen component -->
 
  <a-entity
  id="ambient"
  sound="src: url(/assets/audio/demonic-whisper-100425.mp3); positional: false; volume:0.05; loop:true;"
  ></a-entity>
  </template>
  <TheCameraRig />
</a-scene>
</template>