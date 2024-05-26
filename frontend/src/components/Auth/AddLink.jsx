import { CircleX, Image, LogOut } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { useDropzone} from 'react-dropzone'
import axiosLinks from "../../axios/axiosLinks"
import { useDispatch } from "react-redux"
import { persistor } from "../../redux/store"
import { setUser } from "../../redux/slices/slice"
import axiosClient from "../../axios/axios"
import { useNavigate } from "react-router-dom"
import { addLink } from "../../redux/slices/LinkSlice"

function AddLink({closeForm}) {


const [image,setImage] = useState({})
const [err,setErr] = useState('')
const dispatch = useDispatch()
const navigate = useNavigate()
const [loading,setLoading] = useState(false)

 const urlRef = useRef()
 const descriptionRef = useRef()
 const titleRef = useRef()
//  submit

const handelSubmit = async (e)=>{
  e.preventDefault()
 
  const formData = new FormData
  formData.append('url',urlRef.current.value,)
  formData.append('description',descriptionRef.current.value)
  formData.append('title',titleRef.current.value)
  if(image.name){
    formData.append('image',image )
  }
  // console.log(image)
  try{
    setLoading(true)
    const res =  await axiosLinks.post('/links',formData)
    
     dispatch(addLink(res.data.link))
     closeForm()
    document.getElementById('myPage').src = document.getElementById('myPage').src
  } 
  catch({response})  {
    if(response?.status === 401){
      persistor.pause();
      persistor.flush().then(() => {
        dispatch(setUser({}))
        axiosClient.get('/auth/logout');
      return persistor.purge();
    });
    alert('you have to re login')
    closeForm()
    navigate('/login')
    }
    console.log(response.data)
    setErr(response.data.message)
  }finally{
    setLoading(false)
  }
 }




// drag and drop
const onDrop = useCallback((acceptedFiles) => {
    
    console.log(acceptedFiles[0])
    setImage(acceptedFiles[0])
  }, [])

const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, 
    accept: {
      'image/*': [],
    }
});
// end drag and drop




  return (
    <div className="absolute z-50 w-full h-full  top-0 left-0 flex justify-center items-center p-4">
    <div className="relative min-h-[500px] min-w-[400px] max-w-[450px] p-6
     bg-gray-100 rounded-xl m-4">
      {/* heading */}
      <button  onClick={()=>closeForm(false)} className="absolute right-10 top-3">
       <CircleX className="hover:text-red-500 hover:scale-110 transition ease-linear duration-100" />
      </button>
      <div className="capitalize font-semibold text-center shadow-2xl m-5">add link</div>

      {/* form */}
      <form onSubmit={handelSubmit}  >
         {err &&<div className="bg-red-500 text-white p-3 rounded-md first-letter:uppercase">
               {err}
            </div>}
        <div>
              <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                url
              </label>
              <div className="mt-2">
                <input
                  id="url"
                  type="text"
                  ref={urlRef}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
        </div>
        <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  type="text"
                  required
                  ref={titleRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
        </div>
        <div>
              <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="title"
                  type="text"
                  ref={descriptionRef}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
              
                
                <div
                className="cursor-pointer m-5 max-h-[150px] min-h-[150px] capitalize flex flex-col p-1 max-w-full items-center justify-center border-2 border-gray-700 border-dashed"

                {...getRootProps()}>
              <input {...getInputProps()} />
                <Image/> 
              {
                isDragActive ?
                  <p>Drop the image here ...</p> :
                  image.name ?<> <img src={URL?.createObjectURL(image)} alt="image" width={100} /> {image.name}</> 
                  : <p>Drag & drop some image here, <br/>
                  or click to select image</p>
              }
                
            </div>
              
               
        </div>
        <button type="submit" 
         className="flex w-full justify-center
          bg-gradient-to-r from-orange-500 to-orange-600  rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white 
         shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {loading?"loading .." :"submit"}
        </button>
      </form>
    </div>
    </div>
  )
}

export default AddLink