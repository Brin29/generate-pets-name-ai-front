import axios from 'axios';
import router from '..';

class PetsNameServices {
    
  getToken(){
    return JSON.parse(localStorage.getItem('access'))
  }

  async sendInfo(petInput){
    try {
      const response = await axios.post(
        `http://localhost:5678/webhook-test/pets_name`, 
        petInput, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          }
        })
        localStorage.setItem('petsName', JSON.stringify(response.data))
        router.push({name: 'ResponseName'})
    }
    catch(error){
      throw new Error(error);
    }
  }
}

export default PetsNameServices