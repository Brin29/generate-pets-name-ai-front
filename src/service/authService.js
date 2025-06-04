import { ref } from "vue";
import axios from 'axios';

const VITE_APP_URL = import.meta.env.VITE_APP_URL

class AuthServices {
  data;
  error;

  constructor(){
    this.data = ref(false);
    this.error = ref(false);
  }
  
  getData(){
    return this.data;
  }

  getError(){
    return this.error;
  }

  async loginService(authUser){
    try {
      const response = await axios.post(
        `${VITE_APP_URL}/login/`, 
        authUser, 
        { withCredentials: true }
      )

      const data = response.data
      if (!data) throw new Error('No se recibieron datos del servidor')
      console.log(data)
    }
    catch (err) {
      console.error(err)
    }
  }

  // async registerService(){
  //   try {

  //   }

  // }
}

export default AuthServices