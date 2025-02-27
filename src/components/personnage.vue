<template>
    <a-entity :position="position">
      <!-- Corps -->
      <a-cylinder
        :color="color"
        height="1"
        radius="0.4"
        position="0 0.7 0"
      ></a-cylinder>
      <!-- Cou -->
      <!-- Tête -->
      <a-sphere
        :color="color"
        radius="0.35"
        position="0 1.7 0"
      ></a-sphere>
    </a-entity>
  </template>
  
  <script setup>
  import { defineProps, watch } from "vue";
  
  const props = defineProps({
    position: {
      type: String,
      default: "0 0 0"
    },
    color: {
      type: String,
      default: "#FFFFFF"
    }
  });
  
  watch(props, (newProps) => {
    console.log("Props changed:", newProps);
  });
  </script>