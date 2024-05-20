import { useSelector } from "react-redux"
import axiosClient from "../axios/axios";

function Home() {
  const user = useSelector(({user})=>user.user)
  const  update = async()=>{
    const res =  await  axiosClient.put("/users/update/"+user._id)
    console.log(res)
  }
  // console.log(user);
  return (
    <div className="p-10">Home
      <button className="p-6 bg-red-200" onClick={update}>
        update action
      </button>
    </div>
  )
}

export default Home