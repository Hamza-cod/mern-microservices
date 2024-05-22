import { CircleX, Image } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { useDropzone} from 'react-dropzone'

function AddLink({closeForm}) {
  const [image,setImage] = useState({})
  const imageRef = useRef()
 const handelSubmit = (e)=>{
  e.preventDefault()
  console.log(URL.createObjectURL(image))
 }

 const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files)
  };
  const onDrop = useCallback((acceptedFiles) => {
    
    console.log(acceptedFiles[0])
    setImage(acceptedFiles[0])
  }, [])
 const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  return (
    <div className="absolute w-full h-full  top-0 left-0 flex justify-center items-center">
    <div className="relative min-h-[500px] min-w-[400px] max-w-[450px] p-6
     bg-gray-100 rounded-xl">
      {/* heading */}
      <button  onClick={()=>closeForm(false)} className="absolute right-10 top-3">
       <CircleX className="hover:text-red-500 hover:scale-110 transition ease-linear duration-100" />
      </button>
      <div className="capitalize font-semibold text-center shadow-2xl m-5">add link</div>

      {/* form */}
      <form onSubmit={handelSubmit} >
        <div>
              <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                url
              </label>
              <div className="mt-2">
                <input
                  id="url"
                  type="text"
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
                  <p>Drop the files here ...</p> :
                  image.name ?<> <img src={URL?.createObjectURL(image)} alt="image" width={100} /> {image.name}</> 
                  : <p>Drag & drop some files here, <br/>
                  or click to select files</p>
              }
                
            </div>
              
               
        </div>
        <button type="submit">
          submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default AddLink