import { useEffect } from "react"
import axiosLinks from "../axios/axiosLinks"
import { useDispatch, useSelector } from "react-redux"
import { setLinks } from "../redux/slices/LinkSlice"

function useGetLinks() {
  const disptch = useDispatch()
  const user = useSelector(({persistedReducer:user})=>user.user.user)
  useEffect(()=>{
    (async()=>{
      try{
        const {data} = await  axiosLinks.get('/links/'+user.username )
        disptch(setLinks(data))
        // console.log(data)
      }catch(err){
        console.log(err)
      }
    })()
  },[disptch,user.username])
}

export default useGetLinks