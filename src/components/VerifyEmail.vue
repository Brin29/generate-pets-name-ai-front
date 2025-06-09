<template>
  <form @submit.prevent="sendOtp">
    <input type="text">
    <button type="submit">Enviar</button>
  </form>
</template>

<script setup>
  // import axios from 'axios';

  const VITE_API_URL = import.meta.env.VITE_API_URL
  
  const sendOtp = async () => {
    console.log(VITE_API_URL)
  }
  
</script>