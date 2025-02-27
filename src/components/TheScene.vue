<script setup>
import { ref, computed } from "vue";
import { onMounted, watch } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/tesselation-square.js";
import "../aframe/emit-when-near.js";
import "../aframe/teleport-camera-rig.js";
import "../aframe/bloom.js";
import scene1 from "./world1.vue";
import scene2 from "./world2.vue";
import Player from "./Player.js";

const allAssetsLoaded = ref(false);
const player = new Player();

const choices = player.getChoices();

const lvlScene = ref(1);

const handleGameEnded = (event) => {
  console.log("Game ended:", event.message);
  lvlScene.value = ++lvlScene.value;
  console.log("lvlScene:", lvlScene.value);
};
console.log(lvlScene.value);

const getSceneAttributes = (level) => {
  if (level === 1) {
    console.log("getSceneAttributes:", level);
    return {
      fog: "type: linear; color: #1e1e1e; near: 30; far: 30",
      background: "color: #1e1e1e;",
    };
  }
  if (level === 2) {
    console.log("getSceneAttributes:", level);
    return {
      fog: "type: linear; color: #1e1e1e; near: 30; far: 30",
      background: "color: #1e1e1e;",
    };
  }
  // Ajoutez d'autres conditions pour d'autres niveaux si nécessaire
  return {
    fog: "",
    background: "",
  };
};

const sceneAttributes = computed(() => getSceneAttributes(lvlScene.value));
sceneAttributes.value = getSceneAttributes(lvlScene.value);
console.log("sceneAttributes:", sceneAttributes.value);
watch(lvlScene, (newValue) => {
  console.log("lvlScene changed:", newValue);
  sceneAttributes.value = getSceneAttributes(newValue);
  // document.getElementById("head").components['simple-navmesh-constraint'].updateNavmeshEntities();
});

</script>

<template>
  <a-scene
    :fog="sceneAttributes.fog"
    :background="sceneAttributes.background"
    bloom="threshold: 1.0; strength: 0.4; radius: 1;"
  >
  <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="world2"
        src="/assets/models/scene.gltf"></a-asset-item>
  </a-assets>
  <template v-if="allAssetsLoaded">
    <scene1 @endGame="handleGameEnded" />
    <scene2 @endGame="handleGameEnded" />
 
  <a-entity
  id="ambient"
  sound="src: url(/assets/audio/demonic-whisper-100425.mp3); positional: false; volume:0.05; loop:true;"
  ></a-entity>
  </template>
  <TheCameraRig />
</a-scene>
</template>