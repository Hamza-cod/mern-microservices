import { Trash, Edit2Icon, Image } from "lucide-react";
import shortenString from "../../utils/shortenString";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { updateLink } from "../../redux/slices/LinkSlice";

function Link({ link }) {
  const [isOpen, setIsOpen] = useState();
  const [image, setImage] = useState({});
  const dispatch = useDispatch()
  const showEdit = () => {
    setIsOpen(!isOpen);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setImage(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
    });

const handlSubmit = (e)=>{
  e.preventDefault()
  dispatch(updateLink(link))
}


  return (
    <div className="p-3 bg-white mt-4 rounded-xl relative">
      <ul className={`p-4 ${isOpen ? "w-[100%]" : "w-[80%]"}`}>
        {isOpen ? (
          <form onSubmit={handlSubmit}>
            <li className=" font-semibold">
              title
              <input
                className="p-1 border border-orange-400 rounded-xl"
                type="text"
                defaultValue={link.title}
              />
            </li>

            <li>
              url
              <input
                className="p-1 border border-orange-400  rounded-xl"
                type="text"
                defaultValue={link.url}
              />
            </li>
            <li>
              description
              <textarea
                className="p-1 border border-orange-400  rounded-xl"
                defaultValue={link.description}
              />
            </li>
            <div className="absolute flex gap-4 bottom-2 right-5">
              <button
                className=" border border-orange-500  py-2 px-4 rounded-2xl "
                onClick={showEdit}
              >
                cancel
              </button>
              <button className=" bg-orange-500  py-2 px-4 rounded-2xl text-white">
                save
              </button>
            </div>

            <div
              className="cursor-pointer m-6 max-h-[150px] min-h-[150px] capitalize flex flex-col p-1 max-w-full items-center justify-center border-2 border-gray-700 border-dashed"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Image />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : image.name ? (
                <>
                  <img
                    src={URL?.createObjectURL(image)}
                    alt="image"
                    width={100}
                  />
                    {/* {console.log(image.name.split('.')[1])} */}
                  {
                    shortenString(image.name,25,".") 
                  }{image.name.split('.')[1]}
                </>
              ) : (
                <>
                  <img
                    className="mt-3"
                    width={100}
                    src={import.meta.env.VITE_LINK_SERVICE + "/" + link.image}
                    alt="imagelink"
                  />
                  <p>
                    Drag & drop some files here, <br />
                    or click to select files
                  </p>  
                </>
              )}
            </div>
          </form>
        ) : (
          <>
            <li className="font-semibold">{link.title}</li>
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
        <Trash width={20} className="hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Link;
