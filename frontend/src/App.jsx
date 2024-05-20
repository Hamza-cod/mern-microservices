import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
const App = () => {
  // console.log(document.cookie)
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App