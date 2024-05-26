import axios from "axios"

const axiosLinks = axios.create({
    baseURL:  import.meta.env.VITE_LINK_SERVICE+'/api',
    withCredentials:true,
  
}
)
export default axiosLinks