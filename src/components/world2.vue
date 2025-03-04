<template>
  <a-entity position="0 1000 0">
    <!-- lumière -->

    <a-entity
    v-if="(zone1 || zone3 || zone4) && !choice"
      id="light"
      light="type: ambient; color:white; intensity: 1.5"
      position="0 4 0"
    ></a-entity>
    <a-entity
    v-if="zone2 && !zone1"
      id="light"
      light="type: point; color:white; intensity: 2.4; decay:0.5"
      position="18 3 3"
    ></a-entity>

    <!-- Sol -->

    <a-entity
      id="main-room"
      gltf-model="#world2"
      rotation="0 90 0"
      position="10 -0.2 -5"
      scale="1 1.1 1"
    ></a-entity>

    <!-- Contenu -->

    <perso position="18 0 3" color="darkgrey"></perso>
    <perso position="5 0 -8" color="Violet"></perso>
    <perso position="7 0 -7" color="Khaki"></perso>
    <perso position="5 0 -6" color="LightSkyBlue"></perso>
    <perso position="7 0 -9" color="Crimson"></perso>
    <perso position="7 0 -5" color="MediumSpringGreen"></perso>

    <!-- Collider -->

    <a-box
      position="6 1.65 -7"
      material="color:black;opacity:0;"
      obb-collider
      @obbcollisionstarted="PlaySound2"
      width="4"
      depth="5"
    ></a-box>
    <a-box
      position="17.5 1.65 3"
      material="color:black;opacity:0;"
      obb-collider
      @obbcollisionstarted="PlaySound3"
      width="3"
      depth="4"
    ></a-box>
    <a-box
      position="0 1.65 0"
      material="color:black;opacity:0;"
      obb-collider
      @obbcollisionstarted="PlaySound1"
      width="1"
      depth="1"
    ></a-box>

    <!-- nav-mesh -->

    <a-entity
    v-if="zone1"
      geometry="primitive: plane; height: 17; width: 18"
      position="9 0 -5.5"
      rotation="-90 0.2 0"
      data-role="nav-mesh"
      material="color: red"
          visible="false"

    ></a-entity>
    <a-entity
    v-if="zone2"
      geometry="primitive: plane; height: 17; width: 3"
      position="1 0.2 -5.5"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
          visible="false"

    ></a-entity>
    <a-entity
    v-if="zone3"
      geometry="primitive: plane; height: 4; width: 3"
      position="6 0.2 -7"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
          visible="false"

    ></a-entity>
    <a-entity
    v-if="zone4"
      geometry="primitive: plane; height: 5; width: 2"
      position="17.5 0.2 3"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
          visible="false"

    ></a-entity>
  <a-entity
  id="stage2"
  teleport-camera-rig="x:0; y:500; z:0;"
  ></a-entity>

    <!-- Audio -->

    <a-entity
      id="world2_1"
      sound="src: url(assets/audio/world2_1.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_2"
      sound="src: url(assets/audio/world2_2.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_3"
      sound="src: url(assets/audio/world2_3.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_4"
      sound="src: url(assets/audio/world2_4.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_5"
      sound="src: url(assets/audio/world2_5.mp3); positional: false; volume:2;"
    ></a-entity>

    <a-entity
      sound="src: url(assets/audio/audio_cry.mp3); volume:1; autoplay: true; loop:true"
      position="18 0 3"
    ></a-entity>
    <a-entity
      sound="src: url(assets/audio/kids-crowd-theatre-09-25979.mp3); volume:2; autoplay: true; loop:true"
      position="5 0 -6"
    ></a-entity>
  </a-entity>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import perso from "./personnage.vue";

const emit = defineEmits(['endGame']);
const zone1 = ref(false);
const zone2 = ref(true);
const zone3 = ref(false);
const zone4 = ref(false);
const choice = ref(false);
let done = 0;
let done2 = true;

function endGame() {
  stopSounds();
  emit("endGame", {
    message: "World 2 completed",
    choice: choice.value,
  });
  setTimeout(() => {

  document.querySelector("#stage2").emit("click");
  }, 3000);
}
function PlaySound1() {
  if (done == 4) {
    stopSounds();

    const sound = document.querySelector("#world2_1");
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      zone1.value = true;
    });
  }
  done = done + 1;
}

function PlaySound2() {
  if(done2){
    stopSounds();
    const sound = document.querySelector("#world2_3");
    sound.components.sound.playSound();
    zone1.value = false;
    zone2.value = false;
    zone3.value = true;
    zone4.value = false;
    done2=false;
    sound.addEventListener("sound-ended", () => {
      const sound5 = document.querySelector("#world2_5");
      sound5.components.sound.playSound();
      sound5.addEventListener("sound-ended", () => {
        endGame();
      });
    });
  }
}

function PlaySound3() {
  if(done2){
    stopSounds();
    const sound = document.querySelector("#world2_4");
    sound.components.sound.playSound();
    zone1.value = false;
    zone2.value = false;
    zone3.value = false;
    zone4.value = true;
  done2=false;
    sound.addEventListener("sound-ended", () => {
      const sound5 = document.querySelector("#world2_5");
      sound5.components.sound.playSound();
      choice.value = true;
      console.log("test");
      
      sound5.addEventListener("sound-ended", () => {
        console.log("test");
        endGame();
      });
    });
  }
}
function stopSounds() {
  const sound1 = document.querySelector("#world2_1");
  const sound2 = document.querySelector("#world2_2");
  const sound3 = document.querySelector("#world2_3");
  const sound4 = document.querySelector("#world2_4");
  const sound5 = document.querySelector("#world2_5");
  sound1.components.sound.stopSound();
  sound2.components.sound.stopSound();
  sound3.components.sound.stopSound();
  sound4.components.sound.stopSound();
  sound5.components.sound.stopSound();
}
</script>
