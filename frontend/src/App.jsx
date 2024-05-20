import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<h1>test</h1>} />
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App