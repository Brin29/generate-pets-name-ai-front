import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import router from "..";

const token = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : ''
const refresh_token = localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : ''

const VITE_APP_URL = import.meta.env.VITE_APP_URL

const axiosInstance = axios.create({
  baseURL: VITE_APP_URL,
  'Content-type': 'application/json',
  headers: {
    Authorization:
      localStorage.getItem('access') ? `Bearer ${token}` : null
  }
})

axiosInstance.interceptors.request.use(async req => {
  if (token){
    req.headers.Authorization = `Bearer ${token}`
    const user = jwtDecode(token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    
    if (!isExpired) {
      return req
    }

  else {
    const res = await axios.post(`${VITE_APP_URL}/token/refresh/`, { refresh:refresh_token })

    if (res.status === 200) {
      localStorage.setItem('access', JSON.stringify(res.data.access))
      req.headers.Authorization=`Bearer ${res.data.access}`
      return req
    }
    else {
      const res = await axios.post(`${VITE_APP_URL}/logout/`, 
      {'refresh_token': refresh_token})

      if (res.status === 200){
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        router.push({name: 'Login'})
      }
    }
  }
  }
  return req
})

export default axiosInstance