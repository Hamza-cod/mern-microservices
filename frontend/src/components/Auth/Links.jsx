import { useEffect, useState } from "react"
import AddLink from "./AddLink"
import { Plus } from "lucide-react"
import useGetLinks from "../../hooks/useGetLinks"
import { useSelector } from "react-redux"

function Links() {

  const [isOpen,setIsOpen] = useState()
  const showForm = ()=>{
     setIsOpen(!isOpen)
  }
  const links = useSelector(({links})=>links.links)

  useGetLinks()
  //  console.log(links)
  useEffect(()=>{

   if(isOpen){
    document.getElementById("blur").classList.remove('hidden')
  }else{
    document.getElementById("blur").classList.add('hidden')
  }
  },[isOpen])
  
  return (
    <div className="min-w-9 bg-gray-200 h-[500px] shadow-sm p-5 rounded-lg overflow-y-auto">
      
      <button 
      onClick={showForm}
      className="min-w6 bg-orange-400 w-[400px] flex justify-center items-center gap-3 mx-6 py-3 rounded-3xl font-semibold text-xl text-white ">
        <Plus className="" />add link
      </button>
      {
        isOpen ?<AddLink closeForm={showForm}/>:''
      }
       {
        links.map((link,index)=>
          <div key={index} className="p-3 bg-white mt-4 rounded-lg">
            <ul>
              <li>{link.url}</li>
              <li>{link.title}</li>
              <li>{link.description}</li>
            </ul>
             <img width={100} src={import.meta.env.VITE_LINK_SERVICE+'/'+link.image} alt="imagelink" />
          </div>
        )
       }
    </div>
  )
}

export default Links