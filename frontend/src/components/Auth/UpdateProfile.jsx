import { useRef, useState } from 'react'
import defaultPFP  from '../../assets/profile-pictures/default_image.jpg'
import axiosClient from '../../axios/axios'
import { useDispatch } from 'react-redux'
import { setErr } from '../../redux/slices/errSlice'
import { Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function UpdateProfile({profile,closeFrom}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [img,setImg] = useState({})
  const {profilePicture,username,email,description,_id:id} = profile
 
  const emailRef = useRef()
  const descRef = useRef()
  
  const handlSubmit = async(e) =>{
    e.preventDefault()
    try{
      const formData = new FormData();
    formData.append("email", emailRef.current.value.trim());
    formData.append("description", descRef.current.value.trim());
      // console.log(data)    
      if(img.name){
      formData.append("image", img);
    }else{
      formData.append("image", profilePicture)
    }
    console.log(img)
      const res = await axiosClient.post('/users/'+id,formData,)
      dispatch(setErr(""))
      location.reload()
    }
    catch({response}){
      console.log(response)

      dispatch(setErr(response?.data.message))
      setTimeout(()=>{
        dispatch(setErr(""))
      },7000)
      if(response.status === 401)
          navigate('/login')
    }
  }


  return (
    <>
   
    <form className="flex flex-col relative  h-[500px]" onSubmit={handlSubmit}>
            <div className='w-[100px] h-[100px] rounded-full   overflow-hidden relative'>
            <label htmlFor='img' className='h-full w-full absolute bottom-0 flex justify-center items-center bg-black/25'>
              <input type="file"  id="img" hidden onChange={(e)=>setImg(e.target.files[0])} />
              <Camera />
              </label> 
            <img src={img.name ? URL?.createObjectURL(img) : import.meta.env.VITE_USER_SERVICE+'/'+profilePicture   || defaultPFP}
             alt="profilepfp" 
             className="rounded-full w-[100px] " />
            </div>
              <label htmlFor='username'>username :</label>
              <p className="m-4 font-semibold"> {username}</p>
             <label htmlFor='email'>email :</label>
            <input type='text'  id='email' ref={emailRef} className="m-4 bg-transparent border rounded-lg p-2 focus:outline-none border-orange-500 "  defaultValue={email}/>
            <label htmlFor='description'>Description :</label>
            <textarea type='text'  id='description' ref={descRef}  className="m-4 bg-transparent border rounded-lg p-2 focus:outline-none border-orange-500 " defaultValue={description}/>
             <div className="absolute flex gap-4 bottom-0 right-5">
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
  )
}

export default UpdateProfile