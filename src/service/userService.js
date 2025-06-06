import axiosInstance from "./axiosInstance";

const VITE_APP_URL = import.meta.env.VITE_APP_URL

class UserServices {

  getToken(){
    return JSON.parse(localStorage.getItem('access'))
  }

  async myUserService(){
    try {
      const response = await axiosInstance.get(
        `${VITE_APP_URL}/profile/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          }
        }
      )
      return response.data;
    }
    catch(error){
      throw new Error(error);
    }
  }

}

export default UserServices