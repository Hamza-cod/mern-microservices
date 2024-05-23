import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import NavAuth from "../components/Auth/NavAuth"

function Auth() {
  const user = useSelector(({user})=>user.user)
  
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