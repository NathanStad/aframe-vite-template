<script setup>
import { ref, onMounted } from 'vue';
import '../aframe/disable-in-vr.js';
import '../aframe/hide-in-vr.js';
import '../aframe/simple-navmesh-constraint.js';
import '../aframe/blink-controls.js';
import '../aframe/physx-grab.js';

const isVR = ref(false);

onMounted(() => {
  isVR.value = AFRAME.utils.device.checkHeadsetConnected();
});
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >
    <a-entity
      id="head"
      look-controls="pointerLockEnabled: true"
      simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      disable-in-vr="component: simple-navmesh-constraint;"
      camera
      obb-collider
      position="0 1.65 0"
    >
      <a-entity
        geometry="primitive: circle; radius: 0.0004;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 4; objects: [clickable]; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>
      <a-entity
        id="dummy-hand-right"
        position="0.3 -0.4 -0.5"
      ></a-entity>
      <a-entity
        id="dummy-hand-left"
        position="-0.3 -0.4 -0.5"
      ></a-entity>
    </a-entity>

    <a-entity
      id="hand-left"
      hand-controls="hand: left"
      :blink-controls="isVR ? 'cameraRig: #camera-rig; teleportOrigin: #head; collisionEntities: [data-role=\'nav-mesh\']; snapTurn: false;' : ''"
      position="0 1.5 0"
      physx-grab
    >
      <a-sphere id="hand-left-collider"
        radius="0.02"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true">
      </a-sphere>
    </a-entity>

    <a-entity
      id="hand-right"
      hand-controls="hand: right"
      laser-controls="hand: right"
      raycaster="far: 4; objects: [clickable]; showLine: true;"
      position="0 1.5 0"
      physx-grab
    >
      <a-sphere id="hand-right-collider"
        radius="0.02"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true">
      </a-sphere>
    </a-entity>
  </a-entity>
</template>                                                                                                