import { useEffect, useState } from "react"
import AddLink from "./AddLink"
import { Plus } from "lucide-react"
import useGetLinks from "../../hooks/useGetLinks"
import { useSelector } from "react-redux"
import Link from "./Link"

function Links() {

  const [isOpen,setIsOpen] = useState()
  const showForm = ()=>{
     setIsOpen(!isOpen)
  }

  const {links} = useSelector(({persistedReducer:links})=>links.links)

  useGetLinks()
  //  console.log(links)
  useEffect(()=>{

   if(isOpen ){
    document.body.classList.add("stop-scrolling");
    document.getElementById("blur").classList.remove('hidden')
  }else{
    document.body.classList.remove("stop-scrolling");
    document.getElementById("blur").classList.add('hidden')
  }
  },[isOpen])
  
  return (<>
    <div className="min-w-9 bg-gray-200 min-h-[500px] shadow-sm p-5 rounded-lg ">
      
      <button 
      onClick={showForm}
      className="min-w6 capitalize bg-orange-400 w-[400px] flex justify-center items-center gap-3 mx-6 py-3 rounded-3xl  text-xl text-white ">
        <Plus className="" />add link
      </button>
      {
        isOpen ?<AddLink closeForm={showForm}/>:null
      }
     
       { links.length >0 ?
         links?.map((link,index)=>{

            
           return <Link key={index} link={link}  />
         } 
        ):
        <div className="text-center p-8 pt-32 flex flex-col justify-center items-center gap-3 text-gray-400">
            <Plus className="" />
            No link yet
        </div>
       }
    </div>
  </>

  )
}

export default Links