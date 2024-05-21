import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "../components/Geust/Navbar"

function Guest() {
  const user = useSelector(({user})=>user.user)
 
  return user.username ?<Navigate to='/admin'/> 
  : <>
    <Navbar/>
    <Outlet/>
    </>
}

export default Guest