import { useSelector } from "react-redux"

import defaultPFP  from '../../assets/profile-pictures/default_image.jpg'
import { Edit, Trash } from "lucide-react"
import { useState } from "react"
import UpdateProfile from "./UpdateProfile"


function Profile() {
  const {user} = useSelector(({persistedReducer:user})=>user.user)
  const {profilePicture,username,email,description} = user
  // console.log(user)
  const [isOpen , setOpen] =useState(false)

  const handleOpen = ()=>{
    setOpen(!isOpen)
  }

  return (
    <div className="min-w-[300px] bg-gray-200 min-h-full shadow-sm p-5 rounded-lg relative">
          <div className="absolute right-5 top-4 z-50  hover:text-orange-500 cursor-pointer" onClick={handleOpen}>
            <Edit/>
          </div>
         { isOpen ? <UpdateProfile profile={user} />:  <div className="flex flex-col ">
          <div className="w-[100px]  h-[100px] overflow-hidden rounded-full">

            <img src={profilePicture?import.meta.env.VITE_USER_SERVICE+'/'+profilePicture : defaultPFP} alt="profilepfp" className="rounded-full w-[100px]   bg-black" />
          </div>
            <p className="m-4 font-semibold"> {username}</p>
             <div>email:</div>
            <p className="m-4 ">  {email}</p>
            <div>Description:</div>
            <p className="m-4 "> {description}</p>
          </div>}
          <button className="mt-7 bg-red-500 rounded-xl px-24 py-4 text-white flex gap-3">
            <Trash/> Delete Accounte
          </button>
    </div>
  )
}

export default Profile