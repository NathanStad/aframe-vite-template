<template>
  <a-entity position="0 0 500">
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

    <a-entity
      id="pillier-right"
      gltf-model="#worldEnd"
      rotation="0 -21 0"
      position="-11 -0.1 5"
      scale="2.5 2.5 2.5"
      clickable
    ></a-entity>
    <a-entity
      id="drop-zone-right-spot"
      position="-11 1.6 5"
      rotation="90 0 180"
      listen-to="target: #pillier-right;"
      simple-grab-drop-zone
      @drop="dropHandler($event)"
      @undrop="undropHandler($event)"
    ></a-entity>
    <a-entity
      id="pillier-left"
      gltf-model="#worldEnd"
      rotation="0 -17.4 0"
      position="-5 -0.1 11"
      scale="2.5 2.5 2.5"
      clickable
    ></a-entity>
    <a-entity
      id="drop-zone-left-spot"
      position="-5 1.6 11"
      rotation="90 0 180"
      listen-to="target: #pillier-left;"
      simple-grab-drop-zone
      @drop="dropHandler($event)"
      @undrop="undropHandler($event)"
    ></a-entity>

    <a-plane
      position="0 -0.2 0"
      rotation="-90 0 0"
      width="100"
      height="100"
      color="#E6E6E6"
    ></a-plane>

    <a-sphere
      id="sphere-right-grabbable"
      color="white"
      radius="0.15"
      material="color:#FFFFFF;emissive:#FFFFFF;emissiveIntensity:6"
      position="0 1.6 -2"
      clickable
      outline-on-event
      simple-grab
      @click="onGrabStart()"
    ></a-sphere>

    <!-- Collider -->

    <a-box
      position="0 1.65 0"
      material="color:black;opacity:0;"
      obb-collider
      @obbcollisionstarted="PlaySound1"
      width="1"
      depth="1"
    ></a-box>

    <!-- Light on Sphere -->
    <a-entity
      id="light-sphere"
      light="type: point; color: white; intensity: 9, decay:4"
      position="0 1.6 -2"
    ></a-entity>

    <!-- Lights on Pillars (initially hidden) -->
    <a-entity
      id="light-pillier-right"
      light="type: point; intensity: 9, decay:4"
      position="-11 2 5"
      visible="false"
    ></a-entity>
    <a-entity
      id="light-pillier-left"
      light="type: point; intensity: 9, decay:4"
      position="-5 2 11"
      visible="false"
    ></a-entity>

    <!-- NavMesh -->
    <a-entity
      geometry="primitive: plane; height: 85; width: 85"
      position="0 0.01 0"
      rotation="-90 0 0"
      data-role="nav-mesh"
      material="color: red"
      visible="false"
    ></a-entity>

    <!-- Audio -->

    <a-entity
      id="world5_1"
      sound="src: #sound17; positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world5_2"
      sound="src: #sound18; positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world5_3"
      sound="src: #sound19; positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world5_4"
      sound="src: #sound20; positional: false; volume:2;"
    ></a-entity>
    <a-entity
      id="world5_5"
      sound="src: #sound21; positional: false; volume:2;"
    ></a-entity>

  </a-entity>
</template>

<script setup>
import "../aframe/listen-to.js";
import "../aframe/life-like-automaton.js";
import "../aframe/sakura-circle.js";
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  choices: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["endGame"]);

var gameLost = () => {
  setTimeout(() => {
    location.reload();
  }, 5000);
};
var gameWon = () => {
  emit("endGame", {
    message: "Game Ended",
    choice: true,
  });
};
const droppedEl = ref(new Map());

function dropHandler(event) {
  const elId = event.detail.el.getAttribute("id");
  const dropZoneId = event.detail.dropZone.getAttribute("id");
  droppedEl.value.set(elId, dropZoneId);
  event.detail.el.removeAttribute("simple-grab");
  console.log(dropZoneId);
  if (dropZoneId == "drop-zone-right-spot") {
    const lightPillierLeft = document.querySelector("#light-pillier-left");
    lightPillierLeft.setAttribute("visible", "false");
    PlaySound5();
  } else if (dropZoneId == "drop-zone-left-spot") {
    const lightPillierRight = document.querySelector("#light-pillier-right");
    lightPillierRight.setAttribute("visible", "false");
    if (props.choices) {
      PlaySound3();
    } else {
      PlaySound4();
    }
  }
}

function undropHandler(event) {
  const elId = event.detail.el.getAttribute("id");
  droppedEl.value.delete(elId);
}

function onGrabStart() {
  const lightSphere = document.querySelector("#light-sphere");
  const lightPillierRight = document.querySelector("#light-pillier-right");
  const lightPillierLeft = document.querySelector("#light-pillier-left");

  lightSphere.setAttribute("visible", "false");
  lightPillierRight.setAttribute("visible", "true");
  lightPillierLeft.setAttribute("visible", "true");
  PlaySound2();
}

let done = 0;

function PlaySound1() {
  if (done == 4) {
    console.log(props.choices);

    stopSounds();
    const sound = document.querySelector("#world5_1");
    sound.components.sound.playSound();
  }
  done = done + 1;
}

var PlaySound2 = () => {
  stopSounds();
  const sound = document.querySelector("#world5_2");
  sound.components.sound.playSound();
};
var PlaySound3 = () => {
  stopSounds();
  const sound = document.querySelector("#world5_3");
  sound.components.sound.playSound();
  sound.addEventListener("sound-ended", () => {
    gameWon();
  });
};
var PlaySound4 = () => {
  stopSounds();
  const sound = document.querySelector("#world5_4");
  sound.components.sound.playSound();
  sound.addEventListener("sound-ended", () => {
    gameLost();
  });
};
var PlaySound5 = () => {
  stopSounds();
  const sound = document.querySelector("#world5_5");
  sound.components.sound.playSound();
  sound.addEventListener("sound-ended", () => {
    gameLost();
  });
};

function stopSounds() {
  const sound1 = document.querySelector("#world5_1");
  const sound2 = document.querySelector("#world5_2");
  const sound3 = document.querySelector("#world5_3");
  const sound4 = document.querySelector("#world5_4");
  const sound5 = document.querySelector("#world5_5");
  sound1.components.sound.stopSound();
  sound2.components.sound.stopSound();
  sound3.components.sound.stopSound();
  sound4.components.sound.stopSound();
  sound5.components.sound.stopSound();
}
</script>
