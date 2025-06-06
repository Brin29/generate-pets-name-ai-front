import axios from 'axios';
import router from '..';

const VITE_APP_URL = import.meta.env.VITE_APP_URL

class AuthServices {

  getToken(){
    return JSON.parse(localStorage.getItem('access'))
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

      return response.data
    }
    catch(error) {
      throw this.handleAuthError(error);
    }
  }

  async changePasswordService(passwordForm){
    try {
      const response = await axios.patch(
        `${VITE_APP_URL}/change-password/`,
        passwordForm,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          }
        }
      )
    }

    catch(error) {
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