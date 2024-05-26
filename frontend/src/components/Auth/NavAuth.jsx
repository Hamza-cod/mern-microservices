import { useDispatch, useSelector } from "react-redux"
import {  NavLink, useNavigate } from "react-router-dom"
import { persistor } from "../../redux/store";
import {setUser } from "../../redux/slices/slice"
import axiosClient from "../../axios/axios";
import logo from '../../assets/logo.png'
import defaultPFP  from '../../assets/profile-pictures/default_image.jpg'
import { LogOut } from "lucide-react";

function NavAuth() {
  const navigate = useNavigate();
  const disipatch = useDispatch()
  const  logout = async()=>{
     
      persistor.pause();
      disipatch(setUser({}))
      persistor.flush().then(() => {
        axiosClient.get('/auth/logout');
      return persistor.purge();
    });
    navigate('/login')
  }
  const {user} = useSelector(({persistedReducer:user})=>user.user)
  const   {profilePicture,username} = user
  return (
    <nav className="fixed flex  flex-col z-0  items-center h-[90vh]  bg-gray-100 shadow-md w-[20%] p-5 m-5 rounded-2xl ">
      <img width={100} src={logo} alt="logo"/>
      <div className="flex flex-col justify-between items-center  h-full mt-4">
      <div className="flex flex-col gap-4 ">
        <NavLink to='/admin' className="links px-9 py-3  rounded-md hover:bg-orange-500">links</NavLink>
        <NavLink to='/me' className="links px-9 py-3  rounded-md hover:bg-orange-500">profile</NavLink>
      </div>
        
        {/* user name and image */}
        <div className="flex flex-col gap-3 items-center justify-center ">
        <div className=" flex justify-center items-center gap- p-1 rounded-full bg-white px-2 border-2">
        <div className="h-8 w-8 rounded-full bg-gray-400 overflow-hidden ">

            <img src={profilePicture ? import.meta.env.VITE_USER_SERVICE+'/'+profilePicture : defaultPFP} alt="profilepfp" className="rounded-full w-[100px]   bg-black" />
         
        </div>
            {username}
        </div>
      <button onClick={logout} className="p-3 px-4 flex justify-center items-center gap-3 rounded-full bg-orange-400 text-white">
        logout <LogOut size={15}/>
      </button>  
        </div>
      </div>
      
   
    </nav>
  )
}

export default NavAuth