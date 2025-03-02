<template>
  <a-entity position="0 500 0">
    <!-- lumière -->

    <a-entity
      id="light"
      light="type: point; color:pink; intensity: 10"
      position="0 2 20"
    ></a-entity>

    <!-- contenu -->

    <perso position="3 0 25" color="pink"></perso>
    <a-entity
      id="main-room"
      gltf-model="#world3"
      rotation="0 58 0"
      position="0 0 25"
      scale="2 2 2"
    ></a-entity>

    <!-- Sol -->

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

    <!-- Collider -->

    <a-box
      position="0 2 0"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound1"
      width="1"
      depth="1"
    ></a-box>
    <a-box
      position="0 2 20"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound2"
      width="10"
      depth="10"
    ></a-box>

    <!-- Audio -->

    <a-entity
      id="world3_1"
      sound="src: url(/assets/audio/world3_1.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world3_2"
      sound="src: url(/assets/audio/world3_2.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world3_3"
      sound="src: url(/assets/audio/world3_2.mp3); positional: false; volume:2;"
    ></a-entity>

    <a-entity
      v-if="sing"
      sound="src: url(/assets/audio/la-la-la-youx27re-my-sunshine-woman-229856.mp3); volume:1; autoplay: true; loop:true"
      position="3 0 25"
    ></a-entity>

    <!-- nav-mesh -->

    <a-entity
      geometry="primitive: plane; height:5; width: 5"
      position="0 0 0"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
    <a-entity
      v-if="locked"
      geometry="primitive: plane; height:20; width: 10"
      position="0 0 0"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
    <a-entity
      v-if="locked || !wait"
      geometry="primitive: plane; height:10; width: 10"
      position="0 0 15"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
  </a-entity>
</template>

<script setup>
import { ref } from "vue";
import perso from "./personnage.vue";
var locked = ref(false);
var sing = ref(true);
var wait = ref(false);
var choice = 0;

let done = 0;

function PlaySound1() {
  if (done == 2) {
    stopSounds();
    const sound = document.querySelector("#world3_1");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      console.log("test");

      locked.value = true;
      setTimeout(() => {
        PlaySound3();
      }, 20000);
    });
  }
  done = done + 1;
}
let done2 = true;
function PlaySound2() {
  if (done2 == true && choice == 0) {
    stopSounds();
    choice = 1;
    locked.value = false;
    const sound = document.querySelector("#world3_3");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      teleportPlayer();
    });
  }
}
let done1 = true;
function PlaySound3() {
  if (done1 == true && choice == 0) {
    choice = 2;
    stopSounds();
    wait.value = true;
    const sound = document.querySelector("#world3_2");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      teleportPlayer();
    });
  }
  done = done + 1;
}
function stopSounds() {
  const sound1 = document.querySelector("#world3_1");
  const sound2 = document.querySelector("#world3_2");
  const sound3 = document.querySelector("#world3_3");
  sound1.components.sound.stopSound();
  sound2.components.sound.stopSound();
  sound3.components.sound.stopSound();
}
function teleportPlayer() {
  endGame();
  const cameraRig = document.querySelector("#camera-rig");
  cameraRig.setAttribute("position", { x: 0, y: 2000, z: 0 });
}
</script>
<style></style>
