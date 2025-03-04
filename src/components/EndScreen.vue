<template>
    <div class="end-screen">
      <h1 class="title">The End</h1>
      <p class="message">Félicitations ! Vous avez obtenu la bonne fin du jeu.</p>
      <p class="thanks">Merci d'avoir joué !</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
  
  .end-screen {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(30, 30, 30, 0.9);
    backdrop-filter: blur(10px);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    animation: fadeIn 3s forwards, zoomIn 3s ease-out;
  }
  
  .title {
    font-family: 'Cinzel', serif;
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  
  .message {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .thanks {
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    opacity: 0.8;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  @keyframes zoomIn {
    to {
      transform: scale(1);
    }
  }
  </style>
  