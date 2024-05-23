import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import NavAuth from "../components/Auth/NavAuth"
import { persistor } from "../redux/store"
import { setUser } from "../redux/slices/slice"
import axiosClient from "../axios/axios"
import { useEffect } from "react"

function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(({user})=>user.user)
  const getUser = async ()=>{
    try{
      const res= await axiosClient.get('/users/me')
      console.log(res)

    }catch ({response}){
      if(response?.status === 401){
      persistor.pause();
      persistor.flush().then(() => {
        dispatch(setUser({}))
        axiosClient.get('/auth/logout');
      return persistor.purge();
    });
    alert('you have to re login')
    navigate('/login')
    }
  }
  }


  useEffect(()=>{
    if(user){
      getUser()
    }
  },[user])
  return user.username ? <div className=" flex">
    <div className="flex w-[25%]">

    <NavAuth/>
    </div>
      <div className=" pt-[50px]  min-h-[100vh] max-w-[100%]">
        <Outlet/>
      </div>
      </div>
  : <Navigate to='/login'/>
  

}
export default Auth