import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios/axios";
import Seccess from "../components/Seccess";
import logo from "./../assets/logo.png"

export default function Signup() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [created,setCreated] = useState(false);
  const navigate = useNavigate()
  

  const handelSubmit = async(e)=>{
    e.preventDefault();
    const data = {
      email : emailRef.current.value,
      password : passwordRef.current.value,
      username : usernameRef.current.value,
    }
    // console.log(data)
    try{ 
        setLoading(true)
       await axiosClient.post("/auth/signup",JSON.stringify(data),{ headers:{'Content-Type': 'application/json',
      'Accept':'application/json', 
  }})
       setError('')
       setCreated(true);
       setTimeout(()=>{

         navigate('/login');
       },3000)
  }catch({response}){
   setError(response.data.message)
  }finally{
    setLoading(false)
  }
  }

if( created){
  return <Seccess/>
}


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create  your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  onSubmit={handelSubmit}>
            {error &&<div className="bg-red-500 text-white p-6 rounded-md first-letter:uppercase">
               {error}
            </div>}
            <div>
              <label htmlFor="email"  className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  ref={usernameRef}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={passwordRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                
                className="flex w-full justify-center bg-gradient-to-r from-orange-500 to-orange-600  rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ?"Loading ...":"Sign up" }
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You  have accout ?
            <Link to="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
