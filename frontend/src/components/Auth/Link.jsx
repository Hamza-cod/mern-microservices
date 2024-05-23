import { Trash, Edit2Icon } from "lucide-react";
import shortenString from "../../utils/shortenString";
import { useEffect, useState } from "react";
import UpdateLink from "./UpdateLink";

function Link({ link }) {
  const [isOpen,setIsOpen] = useState()
  const showForm = ()=>{
     setIsOpen(!isOpen)
  }
  useEffect(()=>{

   if(isOpen){
    document.body.classList.add("stop-scrolling");
    document.getElementById("blur").classList.remove('hidden')
  }else{
    document.body.classList.remove("stop-scrolling");
    document.getElementById("blur").classList.add('hidden')
  }
  },[isOpen])
  return (
    <div className="p-3 bg-white mt-4 rounded-xl relative">
      <ul className="p-4 w-[80%]">
        <li className="font-semibold">{link.title}</li>
        <li >{shortenString(link.url,30)}</li>
        <li>{link.description}</li>
      </ul>
      <img
        className="m-1"
        width={100}
        src={import.meta.env.VITE_LINK_SERVICE + "/" + link.image}
        alt="imagelink"
      />
      {/* actions  */}
      <div className="absolute flex flex-col gap-4 top-3 right-9 ">
          <Edit2Icon width={20} className="hover:text-orange-500 cursor-pointer" onClick={showForm}/>
          <Trash width={20} className="hover:text-red-500 cursor-pointer"/>
      </div>
      {isOpen ? <UpdateLink closeForm={showForm} id={link._id}/> : null}
    </div>
  );
}

export default Link;
