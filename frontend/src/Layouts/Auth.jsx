import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import NavAuth from "../components/Auth/NavAuth"

function Auth() {
  const user = useSelector(({user})=>user.user)
  
  return user.username ? <div className=" flex">
    <NavAuth/>
      <div className=" pt-[100px]  min-h-[100vh]">
        
        <Outlet/>
      </div>
      </div>
  : <Navigate to='/login'/>
  
}

export default Auth