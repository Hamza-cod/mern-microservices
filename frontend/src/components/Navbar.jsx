import { useSelector } from "react-redux"

function Navbar() {
  const user = useSelector(({user})=>user.user)
  return (
    <nav className="flex justify-between items-center px-20 py-10 bg-blue-400">
      logo
      <div className="flex justify-center items-center gap-4">
        <ul>
          <li></li>
          <li></li>
        </ul>
        <div className="m-1">
            {user.username}
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-400">

        </div>
      </div>
    </nav>
  )
}

export default Navbar