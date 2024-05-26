
function reloadIframe(username) {
  const iframeSrc= import.meta.env.VITE_APP_URL+'/'+username

  
  return {iframeSrc}
}

export default reloadIframe