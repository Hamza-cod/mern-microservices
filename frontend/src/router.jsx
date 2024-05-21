import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Guest from "./Layouts/Guest";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Auth from "./Layouts/Auth";




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
        element: <h1>dashboard</h1>
      },
      {
        path:"/links",
        element: <h1>links</h1>
      },
      {
        path:"/me",
        element: <h1>profile</h1>
      }
    ]
  },
])
export default router