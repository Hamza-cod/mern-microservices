import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios/axios'
import axiosLinks from '../axios/axiosLinks'

import NotFound from './NotFound'

import defaultPFP from '../assets/profile-pictures/default_image.jpg'

function ViewMyLinks() {
  
  const [user,setUser] = useState({})
  const [links,setLinks] = useState([])
  
  const {username:userName} = useParams()
  const getUser = async ()=>{
    try {
      const {data} = await axiosClient.get('/users/'+userName)
     setUser(data.user)
     

    } catch (error) {
      console.log(error)
    }
  }


  const getLinks = async ()=>{
    try{
        const {data} = await  axiosLinks.get('/links/'+ userName)
        setLinks(data)
        console.log(data)
      }catch(err){
        console.log(err)
      }
  }
  useEffect(()=>{
    getUser()
    console.log(user)
      getLinks()
    
  },[])
  
  
  
  const {profilePicture,username,description} = user
  if(!username){
    return <>
    <NotFound/>
    </>
  }
  return (
    <div className=' w-full h-full flex justify-center items-center p-7'>
       <div className='flex flex-col gap-6 justify-center items-center'>
          <img src={profilePicture ? import.meta.env.VITE_USER_SERVICE+'/'+profilePicture : defaultPFP}alt="image"
          className='w-[100px] h-[100px] rounded-full border ' />
          <h2 className='font-semibold'>{username}</h2>
          <p className=''>{description}</p>
          <div>
            {links?.map(link=><a href={link.url} target='_blanc' key={link._id} className='flex sm:text-sm md:text-base mt-5 bg-orange-500 rounded-3xl py-4 px-2 md:px-11 justify-center
            items-center gap-6 text-white'>
            <img src={import.meta.env.VITE_LINK_SERVICE+'/'+link.image} alt="image"
          className='w-[50px] h-[50px] rounded-full border ' />
          <div className='flex flex-col'>
            <h5 className='capitalize font-semibold'>{link.title}</h5>
            <p className='w-full'>{link.description}</p>
          </div>
            </a>)}
          </div>
       </div>
    </div>
  )
}

export default ViewMyLinks