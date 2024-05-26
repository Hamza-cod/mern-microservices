import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Guest from "./Layouts/Guest";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Auth from "./Layouts/Auth";
import Links from "./components/Auth/Links";
import Profile from "./components/Auth/Profile";
import ViewMyLinks from "./pages/viewMyLinks";
import NotFound from "./pages/NotFound";




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
      },
      {
         path:'*',
        element:<NotFound/>
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
      },
      {
         path:'*',
        element:<NotFound/>
      }
    ]
  },
  {
    path:'/:username',
    element:<ViewMyLinks/>
  },
  {
    path:'*',
    element:<NotFound/>
  }
])
export default router