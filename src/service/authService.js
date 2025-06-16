import axios from 'axios';
import router from '..';
import axiosInstance from './axiosInstance';
import { useRoute } from 'vue-router';

const VITE_APP_URL = import.meta.env.VITE_APP_URL

class AuthServices {

  getToken(){
    return JSON.parse(localStorage.getItem('access'))
  }

  getUid(){
    return useRoute().params.uid
  }

  getUrlToken(){
    return useRoute().params.token
  }

  async loginService(authUser){
    try {
      const response = await axios.post(
        `${VITE_APP_URL}/login/`, 
        authUser, 
        { withCredentials: true }
      );

      const user_res = response.data;
      const user = {
        'email': user_res.email,
        'full_name': user_res.full_name
      }

      if (response.status === 200){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('access', JSON.stringify(user_res.access_token))
        localStorage.setItem('refresh', JSON.stringify(user_res.refresh_token))
        router.push({ name: 'Profile' })
      }
    }
    catch(error){
      throw this.handleAuthError(error);
    }
  }

  async registerService(authUser){
    try {
      const response = await axios.post(
        `${VITE_APP_URL}/register/`,
        authUser,
        { withCredentials: true }
      );
      
      if (response.status === 201){
        localStorage.setItem('user', JSON.stringify(authUser))
        router.push({ name: 'VerifyEmail'})
      }
    }
    catch(error) {
      throw this.handleAuthError(error);
    }
  }

  async changePasswordService(passwordForm){
    try {
      await axiosInstance.patch(`/change-password/`, passwordForm,)
    }
    catch(error) {
      throw this.handleAuthError(error);
    }
  }

  async logoutService(refresh){
    try {
      const response = await axiosInstance.post(`/logout/`, refresh)
      
      if (response.status === 200){
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        router.push({ name: 'Login' })
      }
    }
    catch(error){
      throw this.handleAuthError(error);
    }
  }

  async otpService(otp){
    try{
      const response = await axios.post(`${VITE_APP_URL}/verify-email/`, otp)

      if (response.status === 200){
        router.push({ name: 'Login' })
      }

    }
    catch(error){
      throw this.handleAuthError(error);
    }
  }

  async forgetPassword(email){
    try{
      await axios.post(`${VITE_APP_URL}/password-reset/`, email)
    }
    catch(error){
      throw this.handleAuthError(error);
    }
  }

  async resetPassword(password){
    try {
      axios.patch(`${VITE_APP_URL}/set-new-password/`, password);
      router.push({name:'Login'})
    }
    catch(error){
      throw this.handleAuthError(error);
    }
  }

  handleAuthError(error) {

    if (error.response){
      const { status } = error.response;
      switch (status) {
        case 400:
          return new Error(`Error ${status} los datos ingresados son invalidos`);
        case 401:
          return new Error(`Error ${status} no autorizado`);
        case 500:
          return new Error(`Error ${status} interno del servidor`);
        default:
          return new Error(`Error HTTP: ${status}`);
      }
    }
    else {
      return new Error(`Error de conexion`)
    }
  }

}

export default AuthServices