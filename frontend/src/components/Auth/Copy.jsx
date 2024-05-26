import { Check, CopyIcon } from "lucide-react"
import { useState } from "react";

const Copy = ({username = ''}) => {
  const [copyed,setCopyed] = useState(false)
  function copy() {
    const link = `${import.meta.env.VITE_APP_URL}/${username}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        setTimeout(()=>{
          setCopyed(false)
        },2000)
        setCopyed(true)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
}
  return (
    <button
     onClick={copy}
     className="absolute right-11 top-5 p-4 rounded-3xl bg-gray-100 shadow-md
     px-5 flex gap-2 text-sm justify-center items-center">Copy 
     {copyed? <Check size={15} />:<CopyIcon size={15}/>}
    </button>
  )
}

export default Copy