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
    <perso v-if="show" position="9 0 18" color="darkgrey"></perso>
    <perso v-if="show" position="6 0 15" color="darkgrey"></perso>
    <perso v-if="show" position="3 0 13" color="darkgrey"></perso>
    <perso v-if="show" position="0 0 15" color="darkgrey"></perso>
    <perso v-if="show" position="-3 0 18" color="darkgrey"></perso>
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
      position="0 1.65 0"
      material="color:black;opacity:0;"
      obb-collider
      @obbcollisionstarted="PlaySound1"
      width="1"
      depth="1"
    ></a-box>
    <a-box
      position="0 1.65 20"
      material="color:black;opacity:0;"
      obb-collider
      @obbcollisionstarted="PlaySound3"
      width="10"
      depth="10"
    ></a-box>

    <!-- Audio -->

    <a-entity
      id="world3_1"
      sound="src: #sound11; positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world3_2"
      sound="src: #sound12; positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world3_3"
      sound="src: #sound13; positional: false; volume:2;"
    ></a-entity>

    <a-entity
      v-if="sing"
      sound="src: #sing; volume:1; autoplay: true; loop:true"
      position="3 0 25"
    ></a-entity>

    <!-- nav-mesh -->

    <a-entity
      geometry="primitive: plane; height:5; width: 5"
      position="0 0 0"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
       visible="false"
    ></a-entity>
    <a-entity
      v-if="locked"
      geometry="primitive: plane; height:20; width: 10"
      position="0 0 0"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
       visible="false"
    ></a-entity>
    <a-entity
      v-if="locked || !wait"
      geometry="primitive: plane; height:10; width: 10"
      position="0 0 15"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
       visible="false"
    ></a-entity>
    <a-entity
  id="stage3"
  teleport-camera-rig="x:500; y:0; z:0;"
  ></a-entity>
  </a-entity>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import perso from "./personnage.vue";

const emit = defineEmits(['endGame']);
var locked = ref(false);
var sing = ref(true);
var wait = ref(false);
const show = ref(false);
const choice = ref(false);

function endGame() {
  stopSounds();
  emit("endGame", {
    message: "World 3 completed",
    choice: choice.value,
  });
  document.querySelector("#stage3").emit("click");
}

let done = 0;
let done1 = false;

function PlaySound1() {
  if (done == 4) {
    done1 = true;
    stopSounds();
    const sound = document.querySelector("#world3_1");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {

      locked.value = true;
      setTimeout(() => {
        PlaySound2();
      }, 20000);
    });
  }
  done = done + 1;
}
function PlaySound3() {  
  console.log(done1);
  console.log(choice.value);
  
  
  if (done1 == true && choice.value == false) {
    stopSounds();
    choice.value = true;
    done1 = false;
    show.value = true;
    sing.value = false;
    locked.value = false;
    const sound = document.querySelector("#world3_3");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      stopSounds();
      setTimeout(() => {
        endGame();
      }, 3000);
    });
  }
}
function PlaySound2() {
  if (done1 == true && choice == false) {
    choice.value = false;
    stopSounds();
    wait.value = true;
    done1 = false;
    const sound = document.querySelector("#world3_2");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      stopSounds();
      setTimeout(() => {

      endGame();
      }, 3000);
    });
  }
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
  cameraRig.setAttribute("position", { x: 500, y: 0, z: 0 });
}
</script>
<style></style>
