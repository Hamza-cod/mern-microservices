import axios from "axios";

const axiosClient = axios.create({
    baseURL:  import.meta.env.VITE_USER_SERVICE+'/api',
    withCredentials:true,
}
)


export default axiosClient;
