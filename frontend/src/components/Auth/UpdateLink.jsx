import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import shortenString from "../../utils/shortenString";
import { Image } from "lucide-react";
import axiosLinks from "../../axios/axiosLinks";
import { persistor } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/slice";
import axiosClient from "../../axios/axios";
import { updateLink } from "../../redux/slices/LinkSlice";

function UpdateLink({ link, closeFrom }) {
  const [image, setImage] = useState({});
  const [err,setErr] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const urlRef = useRef();
  const descriptionRef = useRef();
  const titleRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
    setImage(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
    });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("url", urlRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("title", titleRef.current.value);
    if(image.path){
      formData.append("image", image);
    }else{
      formData.append("image", link.image)
    }
    try {
      setLoading(true);
      const {data} = await axiosLinks.put("/links/"+link._id, formData);
      const updatedLink = data.link
      dispatch(updateLink({id:link._id,updatedLink}));
      closeFrom();
      document.getElementById('myPage').src = document.getElementById('myPage').src
    } catch ({ response }) {
      if (response?.status === 401) {
        persistor.pause();
        persistor.flush().then(() => {
          dispatch(setUser({}));
          axiosClient.get("/auth/logout");
          return persistor.purge();
        });
        alert("you have to re login");
        closeFrom();
        navigate("/login");
      }
      setErr(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit} className="flex flex-col max-w-[80%]">
        <label htmlFor="">title</label>

        <input
          className="p-1 px-3 border border-orange-400 rounded-xl"
          type="text"
          ref={titleRef}
          defaultValue={link.title}
        />
        <label htmlFor="">url</label>
        <input
          className="p-1 px-3  border border-orange-400  rounded-xl"
          type="text"
          ref={urlRef}
          defaultValue={link.url}
        />
        <label htmlFor="">description</label>
        <textarea
        ref={descriptionRef}
          className="p-1 px-3  border border-orange-400  rounded-xl"
          defaultValue={link.description}
        />
        <div
          className="cursor-pointer m-6 max-h-[150px] min-h-[150px]  flex flex-col p-1 max-w-full items-center justify-center border-2 border-gray-700 border-dashed"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Image />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : image.name ? (
            <>
              <img src={URL?.createObjectURL(image)} alt="image" width={100} />
              {shortenString(image.name, 25, ".")}
              {image.name.split(".")[1]}
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
                Drag & drop some image here, <br />
                or click to select image
              </p>
            </>
          )}
        </div>
        <div className="absolute flex gap-4 bottom-2 right-5">
          <div
            className="cursor-pointer border border-orange-500  py-2 px-4 rounded-2xl "
            onClick={() => closeFrom()}
          >
            cancel
          </div>
          <button
            type="submit"
            className=" bg-orange-500  py-2 px-4 rounded-2xl text-white"
          >
            save
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateLink;
