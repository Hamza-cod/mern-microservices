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
// console.log(import.meta.env.VITE_USER_SERVICE)
// axiosClient.interceptors.request.use((config)=>{
//   const token = window.localStorage.getItem('access_token');
//   // console.log(token)
//   config.headers.Authorization = 'Bearer '+token
//   return config
// })

// axiosClient.interceptors.response.use((response)=>{
//   return response
// },(err)=>{
//   const {response}= err;
//   if(response?.status === 401){
//     window.localStorage.removeItem('access_token')
//   }
//   throw err
// })
export default axiosClient;