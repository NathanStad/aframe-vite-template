<script setup>
import { ref } from 'vue';

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (AFRAME.utils.device.checkHeadsetConnected() && !AFRAME.utils.device.isMobile()) {
    document.querySelector('a-scene').enterVR();
  }
  document.querySelector('a-scene').emit('enter-scene');
  const sound1 = document.querySelector('#sound1');
  sound1.components.sound.playSound();
  const sound2 = document.querySelector('#ambient');
  sound2.components.sound.playSound();
  const sound6 = document.querySelector("#world2_1");
  sound6.components.sound.stopSound();
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div class="hero">
      <h1>L'Interstice</h1>
      <p>Bienvenue dans L'Interstice, un jeu narratif immersif où l'utilisation du son est obligatoire pour une expérience complète.</p>
      <p>Veuillez vous assurer que votre casque audio est bien connecté avant de commencer.</p>
      <p v-if="!loaded">Chargement...</p>
      <button v-if="loaded" @click="enterScene()">Entrer dans la scène</button>
    </div>
    <div class="content">
      <div class="licences">
        <section>
          <h4>Modes de mouvement supportés</h4>
          <ul>
            <li>Desktop – Clavier pour se déplacer (WASD ou flèches) + Souris pour regarder autour (cliquer et glisser)</li>
            <li>Mobile – 1x toucher pour avancer + 2x toucher pour reculer + Curseur de regard pour cliquer</li>
            <li>VR/AR – marcher + Téléportation (Grip pour saisir et laser pour cliquer) + Curseur de regard pour cliquer</li>
          </ul>
        </section>
        <section>
          <h4>Code source</h4>
          <blockquote><a href="https://github.com/Chabloz/a-frame-vite-vue-boilerplate">Répertoire Github</a></blockquote>
        </section>
        <dl>
          <dt><i>Inclus</i></dt>
          <dt><a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras controls and animation-mixer</a></dt>
          <dd><a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">Licence MIT</a></dd>
          <dt><a href="https://github.com/c-frame/physx" target="_blank">aframe physx</a></dt>
          <dd><a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">Licence MIT</a></dd>
          <dt><a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a></dt>
          <dd><a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">Licence MIT</a></dd>
          <dt><a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">aframe-multi-camera</a></dt>
          <dd><a href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE" target="_blank">Licence MIT</a></dd>
          <dt><a href="https://github.com/AdaRoseCannon/aframe-xr-boilerplate" target="_blank">simple-navmesh-constraint</a></dt>
          <dd>Par Ada Rose Cannon sous Licence MIT</dd>
          <dt><a href="https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e" target="_blank">VR Gallery</a></dt>
          <dd>par <a href="https://sketchfab.com/mvrc.art" target="_blank">Maxim Mavrichev</a> sous <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></dd>
          <dt><a href="https://sketchfab.com/3d-models/3d-gallery-for-vr-projects-68f77ed8558c4bd59e0a13e2cc9d1fd1" target="_blank">Modèle de salle de physique</a></dt>
          <dd>par <a href="https://sketchfab.com/tekuto1s" target="_blank">tekuto1s</a> sous <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #onboarding {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1a1a1a;
    color: #ccc;
    width: 100vw;
    height: 100vh;
    font-family: 'Arial', sans-serif;
    z-index: 10000;
    overflow: auto;
  }
  .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #1a1a1a;
    color: #fff;
    padding: 2rem;
  }
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .hero button {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .hero button:hover {
    background-color: #0056b3;
  }
  .content {
    background-color: #2a2a2a;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 800px;
    width: 100%;
    margin: 2rem auto;
  }
  .licences {
    margin-top: 2rem;
    text-align: left;
    color: #bbb;
  }
  .licences h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  .licences ul {
    list-style-type: none;
    padding: 0;
  }
  .licences li {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .licences a {
    color: #007bff;
    text-decoration: none;
  }
  .licences a:hover {
    text-decoration: underline;
  }
  .licences dt {
    padding-top: 0.75rem;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .licences dd {
    margin-left: 0;
    font-size: 0.8rem;
  }
</style>