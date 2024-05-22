import axiosClient from "../../axios/axios"


function Profile() {
  const test = async ()=>{
    try {
      const res = await axiosClient.get('/users/me').catch((err)=>console.log(err))
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="min-w-9 bg-gray-200 min-h-full shadow-sm p-5 rounded-lg">
          <button onClick={test} className="p-5 rounded bg-red-400">
            test
          </button>
    </div>
  )
}

export default Profile