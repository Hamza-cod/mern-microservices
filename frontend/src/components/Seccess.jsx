
import { IoIosCloudDone } from "react-icons/io";
function Seccess() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
       <IoIosCloudDone className=" text-green-500" fontSize={200}/>
       <div className="text-xl font-bold">
        Account crated seccessfully ,Next step signin & update profile image
       </div>
    </div>
  )
}

export default Seccess