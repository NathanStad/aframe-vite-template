<template>
  <!-- lumière -->

  <a-entity
    id="light"
    light="type: point; color: #FFFFFF; intensity: 10"
    position="0 2 -30"
  ></a-entity>
  <a-cylinder
    id="cylindre"
    position="0 2 -30"
    radius="1"
    height="500"
    material="opacity:0.4;transparent:true;color:#FFFFFF;emissive:#FFFFFF;emissiveIntensity:6"
    emit-when-near
    @click="endGame"
    teleport-camera-rig="x:0; y:1000; z:0;"
  ></a-cylinder>
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

  <!-- Téléporteur -->

  <a-box
    position="-30 1.65 0"
    material="color:black;transparent:true;opacity:0;"
    obb-collider
    @obbcollisionstarted="teleportAndPlaySound3"
    teleport-camera-rig="x:0; y:0; z:0;on:obbcollisionstarted;"
    width="100"
    rotation="90 0 90"
    height="15"
  ></a-box>
  <a-box
    position="30 1.65 0"
    material="color:black;transparent:true;opacity:0;"
    obb-collider
    @obbcollisionstarted="teleportAndPlaySound3"
    teleport-camera-rig="x:0; y:0; z:0;on:obbcollisionstarted;"
    width="100"
    rotation="90 0 90"
    height="15"
  ></a-box>
  <a-box
    position="0 1.65 35"
    material="color:black;transparent:true;opacity:0;"
    obb-collider
    @obbcollisionstarted="teleportAndPlaySound3"
    teleport-camera-rig="x:0; y:0; z:0;on:obbcollisionstarted;"
    width="42"
    depth="15"
  ></a-box>
  <a-box
    position="0 1.65 -45"
    material="color:black;transparent:true;opacity:0;"
    obb-collider
    @obbcollisionstarted="teleportAndPlaySound3"
    teleport-camera-rig="x:0; y:0; z:0;on:obbcollisionstarted;"
    width="42"
    depth="15"
  ></a-box>

  <!-- Audio -->

  <a-entity
    id="world1_1"
    sound="src: #sound1; positional: false; volume:2;"
  ></a-entity>
  <a-entity
    id="world1_2"
    class="soundsRepeat"
    sound="src: #sound2; positional: false; volume:2; autoplay: false"
  ></a-entity>
  <a-entity
    id="world1_3"
    class="soundsRepeat"
    sound="src: #sound3; positional: false; volume:2; autoplay: false"
  ></a-entity>
  <a-entity
    id="world1_4"
    sound="src: #sound4; positional: false; volume:2; autoplay: false"
  ></a-entity>
  <a-entity
    id="world1_5"
    sound="src: #sound5; positional: false; volume:2; autoplay: false"
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
</template>

<script setup>
import { ref } from "vue";
import { onMounted, watch, defineEmits } from "vue";

import "../aframe/tesselation-square.js";
import "../aframe/emit-when-near.js";
import "../aframe/teleport-camera-rig.js";
import "../aframe/bloom.js";

const firstSoundEnded = ref(false);

const finished = ref(false);

const emit = defineEmits(["endGame"]);

let lvlScene = ref(1);

const props = {
  allAssetsLoaded: {
    type: Boolean,
    required: true,
  },
};
const handleSoundEvents = () => {
  const checkAudioElements = setInterval(() => {
    const firstSound = document.querySelector("#world1_1");
    const secondSound = document.querySelector("#world1_2");
    const allSound = document.querySelectorAll(".soundsRepeat");

    if (firstSound && secondSound) {
      clearInterval(checkAudioElements);

      let timeoutId;

      firstSound.addEventListener("sound-ended", () => {
        if ((finished.value = false)) {
          console.log("First sound ended");
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            firstSoundEnded.value = true;

            secondSound.components.sound.stopSound(); // Assure qu'il ne joue pas avant
            secondSound.components.sound.playSound();
          }, 20000);
        }
      });

      allSound.forEach((soundElement, index) => {
        if ((finished.value = false)) {
          soundElement.addEventListener("sound-ended", (e) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              secondSound.components.sound.playSound();
            }, 20000); // Délai de 20 secondes avant le son suivant
          });
        }
      });
    } else {
      console.error("Les éléments audio ne sont pas trouvés.");
    }
  }, 1000); // Vérifie toutes les secondes
};

function teleportAndPlaySound3() {
  console.log("test");
  const cylindre = document.querySelector("#cylindre");
  const lumiere = document.querySelector("#light");
  const sound3 = document.querySelector("#world1_3");
  const sound4 = document.querySelector("#world1_4");
  const sound5 = document.querySelector("#world1_5");
  if (lvlScene.value === 1) {
    lvlScene.value = 2;
    cylindre.setAttribute("radius", 2);
    cylindre.setAttribute("emit-when-near", "distance", 2);

    lumiere.setAttribute("light", { intensity: 20 });
    stopSounds();
    sound3.components.sound.playSound();
  } else if (lvlScene.value === 2) {
    lvlScene.value = 3;

    cylindre.setAttribute("radius", 5);
    cylindre.setAttribute("emit-when-near", "distance", 5);

    lumiere.setAttribute("light", { intensity: 50 });
    stopSounds();
    sound4.components.sound.playSound();
  } else if (lvlScene.value === 3) {
    lvlScene.value = 4;

    cylindre.setAttribute("radius", 8);
    cylindre.setAttribute("emit-when-near", "distance", 8);

    lumiere.setAttribute("light", { intensity: 80 });
    stopSounds();
    sound5.components.sound.playSound();
  } else {
    emit('endGame', { choice: true });
  }
}
function stopSounds() {
  const sound1 = document.querySelector("#world1_1");
  const sound2 = document.querySelector("#world1_2");
  const sound3 = document.querySelector("#world1_3");
  const sound4 = document.querySelector("#world1_4");
  const sound5 = document.querySelector("#world1_5");
  const sound6 = document.querySelector("#world2_1");
  sound1.components.sound.stopSound();
  sound2.components.sound.stopSound();
  sound3.components.sound.stopSound();
  sound4.components.sound.stopSound();
  sound5.components.sound.stopSound();
  sound6.components.sound.stopSound();
}
function endGame() {
  stopSounds();
  finished.value = true;
  emit("endGame", {
    message: "Game has ended",
    level: lvlScene.value,
    finished: finished.value,
  });
}
onMounted(() => {
  handleSoundEvents();
});
console.log(props.allAssetsLoaded);

watch(finished, (newValue) => {
  if (!newValue) {
    handleSoundEvents();
  }
});
</script>

<style></style>
