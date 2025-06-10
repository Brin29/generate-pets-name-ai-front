import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance";

const VITE_APP_URL = import.meta.env.VITE_APP_URL;

class UserServices {

  getToken(){
    return JSON.parse(localStorage.getItem('access'))
  }

  async myUserService(){
    try {
      const response = await axiosInstance.get(
        `/profile/`,
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


  async editUserService(data_user){
    const user = jwtDecode(this.getToken())
    const user_id = user.user_id
    try{
      await axiosInstance.patch(
        `/edit/${user_id}/`, 
        data_user,
        {
          headers: {
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${this.getToken()}`
          }
        }
      )
    }
    catch(error){
      throw new Error(error);
    }
  }

}

export default UserServices