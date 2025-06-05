import axios from 'axios';

const VITE_APP_URL = import.meta.env.VITE_APP_URL

class AuthServices {

  async loginService(authUser){
    try {
      const response = await axios.post(
        `${VITE_APP_URL}/login/`, 
        authUser, 
        { withCredentials: true }
      );

      return response.data
    }
    catch(error){
      throw this.handleError(error);
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
      throw this.handleError(error);
    }
  }

  handleError(error) {

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