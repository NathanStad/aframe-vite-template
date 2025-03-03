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

    <perso position="-10 0.5 4" color="darkred"></perso>
    <perso position="-9 0 2" color="red"></perso>
    <perso position="-10 0 1" color="Crimson"></perso>
    <perso position="-5 0 2" color="blue"></perso>

    <!-- Collider -->

    <a-box
      position="0 1.65 0"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound1"
      width="1"
      depth="1"
    ></a-box>
    <a-box
      position="-9 1.65 0"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound2"
      width="10"
      depth="25"
    ></a-box>
    <a-box
      position="8 1.65 13"
      material="color:black;opacity:0.5;"
      obb-collider
      @obbcollisionstarted="PlaySound3"
      width="20"
      depth="10"
    ></a-box>

    <!-- Sol -->

    <a-entity
      id="main-room"
      gltf-model="#world4"
      rotation="0 0 0"
      position="0 -0.5 0"
      scale="2 2 2"
    ></a-entity>

    <!-- Audio -->

    <a-entity
      id="world4_1"
      sound="src: url(/assets/audio/world4_2.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world4_2"
      sound="src: url(/assets/audio/world4_3.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world4_3"
      sound="src: url(/assets/audio/world4_4.mp3); positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="i-know"
      sound="src: url(/assets/audio/whispering-i-know-81647.mp3); positional: false; volume:1;"
    ></a-entity>

    <a-entity
      sound="src: url(/assets/audio/world4_1.mp3); volume:1; autoplay: true; loop:true"
      position="-5 0 0"
    ></a-entity>

    <!-- nav-mesh -->

    <a-entity
      geometry="primitive: plane; height:8.5; width: 24"
      position="-2 0 2"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
      visible="false"
    ></a-entity>
    <a-entity
      geometry="primitive: plane; height:25; width: 11.5"
      position="6.5 0 11"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
      visible="false"
    ></a-entity>

    <a-entity
  id="stage4"
  teleport-camera-rig="x:0; y:0; z:500;"
  ></a-entity>
  </a-entity>
</template>

<script setup>
import perso from "./personnage.vue";
import { defineEmits, ref } from 'vue';
const emit = defineEmits(['endGame']);
const choice = ref(false);


function endGame() {
  stopSounds();
  emit("endGame", {
    message: "World 4 completed",
    choice: choice.value,
  });
  setTimeout(() => {
  document.querySelector("#stage4").emit("click");
  }, 3000);
}
let done = 0;
let done2 = false;
const PlaySound1 = () => {
  if (done == 4) {
    done2 = true;
    
    stopSounds();
    document.getElementById("world4_1").components.sound.playSound();
  }
  done = done + 1;
};

const PlaySound2 = () => {
  if (done2 == true) {
    done2 = false;
    stopSounds();
    const sound = document.getElementById("world4_2");
    preventMovement();
    choice.value = true;
    sound.components.sound.playSound();
    sound.addEventListener("sound-ended", () => {
      let sound2 = document.getElementById("i-know");
      sound2.components.sound.playSound();

      sound2.addEventListener("sound-ended", () => {
        stopSounds();
        allowMovement()
        endGame();
            });
    });
  }
};

const PlaySound3 = () => {
  if (done2 == true) {
  done2 = false;
    stopSounds();
    const sound = document.getElementById("world4_3");

    preventMovement();
    sound.playSound();
    sound.addEventListener("sound-ended", () => {
      let sound2 = document.getElementById("i-know");
      sound2.components.sound.playSound();

      sound2.addEventListener("sound-ended", () => {
        stopSounds();
        allowMovement()
        endGame();
      });
    });
  }
};
function preventMovement() {
  const cameraRig = document.querySelector("#camera-rig");
  cameraRig.setAttribute("movement-controls", "enabled", false);
}
function allowMovement() {
  const cameraRig = document.querySelector("#camera-rig");
  cameraRig.setAttribute("movement-controls", "enabled", true);
}

function stopSounds() {
  const sound1 = document.querySelector("#world4_1");
  const sound2 = document.querySelector("#world4_2");
  const sound3 = document.querySelector("#world4_3");
  sound1.components.sound.stopSound();
  sound2.components.sound.stopSound();
  sound3.components.sound.stopSound();
}
</script>
