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
      console.log(payload)
       return {...state ,links: [...state.links,payload]}
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {setLinks,addLink } = linkSlice.actions

export default linkSlice.reducer