import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Guest from "./Layouts/Guest";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Auth from "./Layouts/Auth";
import Links from "./components/Auth/Links";
import Profile from "./components/Auth/Profile";
import ViewMyLinks from "./pages/viewMyLinks";




const router = createBrowserRouter([
  {
    Component:Guest,

    children : [
      {
        path:"/",
        Component: Home
      },
      {
        path:"/login",
        Component: Login
      },
      {
        path:"/signup",
        Component: Signup
      }
    ]
  },
  {
    Component:Auth,

    children : [
      {
        path:"/admin",
        element: <Links/>
      },
      {
        path:"/me",
        element: <Profile/>
      }
    ]
  },
  {
    path:'/:username',
    element:<ViewMyLinks/>
  }
])
export default router