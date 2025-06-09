<script setup>
import axios from 'axios';

// import axios from 'axios';
    
const VITE_APP_URL = import.meta.env.VITE_APP_URL
      
const sendOtp = async () => {
  try{
    const response = await axios.post(`http://localhost:8000/auth/v1/verify-email/`, {otp:'385129'})
    
    if (response.status === 200){
      console.log('Funciona')
    }
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="sendOtp">
    <input type="text">
    <button type="submit">Enviar</button>
  </form>
</template>