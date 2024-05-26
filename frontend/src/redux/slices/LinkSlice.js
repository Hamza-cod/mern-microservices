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
    const { id, updatedLink } =payload;
      state.links = state.links.map(link =>
        link._id === id ? { ...link, ...updatedLink } : link
      );
    },
    deleteLink : (state , {payload})=>{
    const { id} =payload;
      state.links = state.links.filter(link=>link._id !== id)
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLinks,addLink,updateLink ,deleteLink} = linkSlice.actions

export default linkSlice.reducer