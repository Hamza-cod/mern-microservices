import { useState } from 'react'

function reloadIframe(username) {
  const [iframeSrc, setIframeSrc] = useState(import.meta.env.VITE_APP_URL+'/'+username)

  const reload = () => {
    // This will force the iframe to reload by changing its src attribute
    setIframeSrc('');
    setTimeout(() => {
      setIframeSrc(import.meta.env.VITE_APP_URL+username);
    }, 0);
  };

  return {iframeSrc}
}

export default reloadIframe