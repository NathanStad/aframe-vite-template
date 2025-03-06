<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

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

// Reactive references
const allAssetsLoaded = ref(false);
const choices = ref([]);
const lvlScene = ref(1);
const goodEnding = ref(false); // Track the good ending
const showEndText = ref(false); // Track if end text should be shown

// Handle game end event
const handleGameEnded = (event) => {
  console.log(lvlScene.value);
  console.log(event.message);
  
  if (lvlScene.value === 4) {
    choices.value.push(event.choice);
    console.log(choices.value);
    console.log("test");
    
    // Check for good ending
    if (choices.value[1] === true && choices.value[2] === true && choices.value[3] === true) {
      goodEnding.value = true;
      console.log('Good ending ', goodEnding.value);
    }
  } else {
    choices.value.push(event.choice);
    lvlScene.value++;
  }
  console.log(choices.value);
};
const Finish = (e) => {
  if (e.choice === true) {

    console.log(e.message);
    

    showEndText.value = true;
    
  }
};

// Mute all sounds except ambient
const muteAllSoundsExceptAmbient = () => {
  const sounds = document.querySelectorAll('a-entity[sound]');
  sounds.forEach(sound => {
    if (sound.id !== 'ambient') {
      sound.components.sound.stopSound();
    }
  });
};

// Add event listener for muting sounds
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
    <!-- Load assets -->
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item id="world2" src="assets/models/world1/scene.gltf"></a-asset-item>
      <a-asset-item id="world3" src="assets/models/world2/scene.gltf"></a-asset-item>
      <a-asset-item id="world4" src="assets/models/world3/scene.gltf"></a-asset-item>
      <a-asset-item id="worldEnd" src="assets/models/world4/scene.gltf"></a-asset-item>
      <!-- Sound assets -->
      <a-asset-item id="sound1" response-type="arraybuffer" src="assets/audio/world1_1.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound2" response-type="arraybuffer" src="assets/audio/world1_2.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound3" response-type="arraybuffer" src="assets/audio/world1_3.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound4" response-type="arraybuffer" src="assets/audio/world1_4.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound5" response-type="arraybuffer" src="assets/audio/world1_5.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound6" response-type="arraybuffer" src="assets/audio/world2_1.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound7" response-type="arraybuffer" src="assets/audio/world2_2.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound8" response-type="arraybuffer" src="assets/audio/world2_3.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound9" response-type="arraybuffer" src="assets/audio/world2_4.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound10" response-type="arraybuffer" src="assets/audio/world2_5.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound11" response-type="arraybuffer" src="assets/audio/world3_1.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound12" response-type="arraybuffer" src="assets/audio/world3_2.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound13" response-type="arraybuffer" src="assets/audio/world3_3.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound14" response-type="arraybuffer" src="assets/audio/world4_2.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound15" response-type="arraybuffer" src="assets/audio/world4_3.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound16" response-type="arraybuffer" src="assets/audio/world4_4.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound17" response-type="arraybuffer" src="assets/audio/world5_1.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound18" response-type="arraybuffer" src="assets/audio/world5_2.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound19" response-type="arraybuffer" src="assets/audio/world5_3.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound20" response-type="arraybuffer" src="assets/audio/world5_4.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound21" response-type="arraybuffer" src="assets/audio/world5_5.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound22" response-type="arraybuffer" src="assets/audio/whispering-i-know-81647.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound23" response-type="arraybuffer" src="assets/audio/demonic-whisper-100425.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="kids_crowd" response-type="arraybuffer" src="assets/audio/kids-crowd-theatre-09-25979.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="audio_cry" response-type="arraybuffer" src="assets/audio/audio_cry.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sing" response-type="arraybuffer" src="assets/audio/la-la-la-youx27re-my-sunshine-woman-229856.mp3" preload="auto"></a-asset-item>
    </a-assets>

    <!-- Render scenes conditionally -->
    <template v-if="allAssetsLoaded">
      <scene1 @endGame="handleGameEnded" />
      <scene2 @endGame="handleGameEnded" />
      <scene3 @endGame="handleGameEnded" />
      <scene4 @endGame="handleGameEnded" />
      <sceneEnd @endGame="Finish" :choices="goodEnding" />
      <EndScreen v-if="showEndText" /> <!-- Conditionally render the EndScreen component -->

      <!-- Ambient sound entity -->
      <a-entity
        id="ambient"
        sound="src: #sound23; positional: false; volume:0.05; loop:true;"
      ></a-entity>
    </template>

    <!-- Camera rig component -->
    <TheCameraRig />
  </a-scene>
</template>