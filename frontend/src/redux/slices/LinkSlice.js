import {createSlice} from "@reduxjs/toolkit"
import { initialState } from "../state"

export const linkSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLinks : (state , {payload})=>{
      // console.log(payload)
       return {...state ,links: payload}
    },
    addLink : (state , {payload})=>{
       return {...state ,links: [...state.links,payload]}
    },
    updateLink : (state , {payload})=>{
      console.log(payload)
      // console.log(state.links[0])
      const { _id,image,title,description,url } = payload;
      const links = state.links.find((link) => link._id === _id);
    //  return console.log(state.find((link) => link._id === _id))
    //  if (links) {
    //     links.image = image;
    //     links.title = title;
    //     links.description = description;
    //     links.url = url;
    //   }
    console.log(state)

    }
  },
})

// Action creators are generated for each case reducer function
export const {setLinks,addLink,updateLink } = linkSlice.actions

export default linkSlice.reducer