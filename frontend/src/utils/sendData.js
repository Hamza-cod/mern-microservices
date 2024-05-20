import axiosClient from "../axios/axios"

export const sendData = async (data,uri )=>{
  try{const res = await axiosClient.post(uri,data)
    return res.data
  }catch(err){
    return  err
  }
  }