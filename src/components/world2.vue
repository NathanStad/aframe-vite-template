<template>
  <a-entity position="0 1000 0">
    <!-- lumière -->

    <a-entity
    v-if="zone1 || zone3 || zone4"
      id="light"
      light="type: ambient; color:white; intensity: 1.5"
      position="0 4 0"
    ></a-entity>
    <a-entity
    v-if="zone2 && !zone1"
      id="light"
      light="type: point; color:white; intensity: 1.5"
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

    <a-box
      position="6 2 -7"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound2"
      width="4"
      depth="5"
    ></a-box>
    <a-box
      position="18 2 3"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound3"
      width="2"
      depth="3"
    ></a-box>
    <a-box
      position="0 2 0"
      material="color:black;opacity:0.5;"
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
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
    <a-entity
    v-if="zone2"
      geometry="primitive: plane; height: 17; width: 3"
      position="1 0 -5.5"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
    <a-entity
    v-if="zone3"
      geometry="primitive: plane; height: 4; width: 3"
      position="6 0 -7"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>
    <a-entity
    v-if="zone4"
      geometry="primitive: plane; height: 5; width: 2"
      position="17.5 0 3"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
    ></a-entity>

    <!-- Audio -->

    <a-entity
      id="world2_1"
      sound="src: url(/assets/audio/world2_1.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_2"
      sound="src: url(/assets/audio/world2_2.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_3"
      sound="src: url(/assets/audio/world2_3.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_4"
      sound="src: url(/assets/audio/world2_4.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world2_5"
      sound="src: url(/assets/audio/world2_5.mp3); positional: false; volume:2;"
    ></a-entity>

    <a-entity
      sound="src: url(/assets/audio/audio_cry.mp3); volume:1; autoplay: true; loop:true"
      position="18 0 3"
    ></a-entity>
    <a-entity
      sound="src: url(/assets/audio/kids-crowd-theatre-09-25979.mp3); volume:2; autoplay: true; loop:true"
      position="5 0 -6"
    ></a-entity>
  </a-entity>
</template>

<script setup>
import { ref } from "vue";
import { onMounted, watch, defineEmits } from "vue";
import perso from "./personnage.vue";
const zone1 = ref(false);
const zone2 = ref(true);
const zone3 = ref(false);
const zone4 = ref(false);
const finished = ref(false);
const choice = ref(false);
let done = 0;

const emit = defineEmits(["endGame"]);

function endGame() {
  stopSounds();
  finished.value = true;
  emit("endGame", {
    message: "Game has ended",
    choice: choice.value,
    finished: finished.value,
  });
}

function PlaySound1() {
    if(done == 1) {
        stopSounds();
        const sound = document.querySelector("#world2_1");
        sound.components.sound.playSound();
        sound.addEventListener("sound-ended", () => {
            zone1.value = true;
        });
    }
    done = done + 1;
}

let done1 = true;
function PlaySound2() {
    if(done1 == true) {
        stopSounds();
        const sound = document.querySelector("#world2_3");
        sound.components.sound.playSound();
        done1 = false;
        zone1.value = false;
        zone2.value = false;
        zone3.value = true;
        zone4.value = false;

        sound.addEventListener("sound-ended", () => {
            const sound5 = document.querySelector("#world2_5");
            sound5.components.sound.playSound();
            sound5.addEventListener("sound-ended", teleportPlayer);
        });
    }
}

let done2 = true;
function PlaySound3() {
    if(done2 == true) {
        stopSounds();
        const sound = document.querySelector("#world2_4");
        sound.components.sound.playSound();
        done2 = false;
        zone1.value = false;
        zone2.value = false;
        zone3.value = false;
        zone4.value = true;

        sound.addEventListener("sound-ended", () => {
            const sound5 = document.querySelector("#world2_5");
            sound5.components.sound.playSound();
            choice.value = true;
            sound5.addEventListener("sound-ended", teleportPlayer);
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

function teleportPlayer() {
    endGame();
    const cameraRig = document.querySelector("#camera-rig");
    cameraRig.setAttribute("position", { x: 0, y: 0, z: 0 });
}

</script>
