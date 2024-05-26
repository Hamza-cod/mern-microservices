import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import NavAuth from "../components/Auth/NavAuth"
import { persistor } from "../redux/store"
import { setUser } from "../redux/slices/slice"
import axiosClient from "../axios/axios"
import { useEffect } from "react"
import PreviewRealTime from "../pages/PreviewRealTime"
import Copy from "../components/Auth/Copy"

function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const token = useSelector(({user})=>user.token)
  const {user} = useSelector(({persistedReducer:user})=>user.user)
  const err = useSelector(({err})=>err.err)

  // console.log(user)
  const getUser = async ()=>{
    try{
       const res = await axiosClient.get('/users/me/')
      dispatch(setUser(res.data.user))
        console.log(res)
    }catch ({response}){
      console.log(response)
      if(response?.status === 401){
      persistor.pause();
      persistor.flush().then(() => {
        dispatch(setUser({}))
        axiosClient.get('/auth/logout');
      return persistor.purge();
    });
    dispatch(setUser({}))
    navigate('/login')
    }
  }
  }

  useEffect(()=>{
    getUser()
  },[])


  return user?.username ? <div className=" flex">
     { <div className={`absolute p-3  ${err ?'top-1':'-top-56'} transition-all duration-300 text-white rounded-xl z-50 left-[30%]   bg-red-500`}>
        {err}
      </div>}
    <div className="flex w-[25%]">

    <NavAuth/>
    </div>
        <Copy username={user?.username}/>
      <div className=" pt-[60px]  min-h-[100vh] max-w-[100%] flex gap-9">
        <Outlet/>
        <PreviewRealTime/>
      </div>
      </div>
  : <Navigate to='/login'/>
  

}
export default Auth