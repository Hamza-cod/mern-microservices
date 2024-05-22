import axios from "axios";

const axiosClient = axios.create({
    baseURL:  import.meta.env.VITE_USER_SERVICE+'/api',
    withCredentials:true,
     headers:{'Content-Type': 'application/json',
      'Accept':'application/json', 
    // "Authorization":`Bearer ${localStorage.getItem('access_token')}`
  }
}
)


export default axiosClient;
