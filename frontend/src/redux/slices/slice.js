import {createSlice} from "@reduxjs/toolkit"
import { initialState } from "../state"

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser : (state , {payload})=>{
      // console.log(u)
       return {...state ,user: payload}
    },
    setSrc : (state , {payload})=>{
      // console.log(u)
       return {...state ,iframeSrc: payload}
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {setUser,setSrc } = userSlice.actions

export default userSlice.reducer