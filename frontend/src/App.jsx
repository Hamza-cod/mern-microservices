import { RouterProvider } from "react-router-dom"

import router from "./router"
const App = () => {

  return (
    <>
    <div id="blur" className=" fixed h-full w-full z-50 bg-black/10 backdrop-blur-sm  hidden">
      
    </div>
    <RouterProvider router={router}/>
    </>
  )
}

export default App