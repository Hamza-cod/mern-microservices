import { Trash, Edit2Icon } from "lucide-react";
import shortenString from "../../utils/shortenString";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { deleteLink, updateLink } from "../../redux/slices/LinkSlice";
import UpdateLink from "./UpdateLink";
import axiosLinks from "../../axios/axiosLinks";

function Link({ link }) {
  const [isOpen, setIsOpen] = useState();
  const dispatch = useDispatch()
  const showEdit = () => {
    setIsOpen(!isOpen);
  };

  
const handelDelete = async(id)=>{
    try {
      if(confirm("are you sure !,you whant to delete this this link :\n"+link.url))
        {
          await axiosLinks.delete('/links/'+id)
          dispatch(deleteLink({id}))
           document.getElementById('myPage').src = document.getElementById('myPage').src
        }
    } catch (error) {
      console.log(error)
    }
}



  return (
    <div className="p-3 bg-white mt-4 rounded-xl relative">
      <ul className={`p-4 ${isOpen ? "w-[100%]" : "w-[80%]"}`}>
        {isOpen ? (
         <UpdateLink link={link} closeFrom={showEdit}/>
        ) : (
          <>
            <li className="font-semibold capitalize">{link.title}</li>
            <li>{shortenString(link.url, 30)}</li>
            <li>{link.description}</li>
            <img
              className="mt-3"
              width={100}
              src={import.meta.env.VITE_LINK_SERVICE + "/" + link.image}
              alt="imagelink"
            />
          </>
        )}
      </ul>
      {/* actions  */}
      <div className="absolute flex flex-col gap-4 top-3 right-9 ">
        <Edit2Icon
          width={20}
          className="hover:text-orange-500 cursor-pointer"
          onClick={() => showEdit()}
        />
        <Trash width={20} className="hover:text-red-600 cursor-pointer" onClick={()=>handelDelete(link._id)} />
      </div>
    </div>
  );
}

export default Link;
