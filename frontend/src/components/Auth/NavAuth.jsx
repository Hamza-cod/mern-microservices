import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { persistor } from "../../../redux/store";
import { setUser } from "../../../redux/slices/slice";
import axiosClient from "../../axios/axios";
import logo from '../../assets/logo.png'

function NavAuth() {
  const navigate = useNavigate();
  const disipatch = useDispatch()
  const  logout = async()=>{
     
      persistor.pause();
      persistor.flush().then(() => {
        disipatch(setUser({}))
        axiosClient.get('/auth/logout');
      return persistor.purge();
    });
    navigate('/login')
  }
  const user = useSelector(({user})=>user.user)
  return (
    <nav className="flex flex-col  items-center  bg-gray-100 shadow-md w-[20%] p-5 m-5 rounded-2xl ">
      <img width={100} src={logo} alt="logo"/>
      <div className="flex flex-col justify-between items-center  h-full mt-4">
      <div className="flex flex-col gap-4 ">
        <NavLink to='/admin' className="links px-9 py-3  rounded-md hover:bg-orange-500">links</NavLink>
        <NavLink to='/me' className="links px-9 py-3  rounded-md hover:bg-orange-500">profile</NavLink>
      </div>
        
        {/* user name and image */}
        <div className="flex flex-col gap-x-3 items-center justify-center ">
        <div className=" flex justify-center items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-400">
        </div>
            {user.username}
        </div>
      <button onClick={logout}>
        logout
      </button>  
        </div>
      </div>
      
   
    </nav>
  )
}

export default NavAuth