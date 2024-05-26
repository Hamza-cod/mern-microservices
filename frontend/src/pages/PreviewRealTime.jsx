
import { useSelector } from "react-redux"
import reloadIframe from "../utils/reloadIframe"

function PreviewRealTime() {
  const {user} = useSelector(({persistedReducer:user})=>user.user)
  const   {username} = user
 
const {iframeSrc} = reloadIframe(username)
  return (
    <div className="right-9 absolute">
      
      <iframe
  id="myPage"
  title="my page"
  width="300"
  height="500"
  className="p-3 shadow-xl rounded-lg   "
  src={iframeSrc}
  >
</iframe>
    </div>
  )
}

export default PreviewRealTime