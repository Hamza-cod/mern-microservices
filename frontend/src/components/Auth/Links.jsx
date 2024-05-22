import { useEffect, useState } from "react"
import AddLink from "./AddLink"
import { Plus } from "lucide-react"

function Links() {
  const [isOpen,setIsOpen] = useState()
  const showForm = ()=>{
     setIsOpen(!isOpen)
  }
  useEffect(()=>{
   if(isOpen){
    document.getElementById("blur").classList.remove('hidden')
  }else{
    document.getElementById("blur").classList.add('hidden')
  }
  },[isOpen])
  
  return (
    <div className="min-w-9 bg-gray-200 min-h-full shadow-sm p-5 rounded-lg">
      
      <button 
      onClick={showForm}
      className="min-w6 bg-orange-400 w-[400px] flex justify-center items-center gap-3 mx-6 py-3 rounded-3xl font-semibold text-xl text-white ">
        <Plus className="" />add link
      </button>
      {
        isOpen ?<AddLink closeForm={showForm}/>:''
      }
    </div>
  )
}

export default Links