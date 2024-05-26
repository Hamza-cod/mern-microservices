import {createSlice} from "@reduxjs/toolkit"
import { initialState } from "../state"

export const errSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setErr : (state , {payload})=>{
      // console.log(u)
       return {...state ,err: payload}
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {setErr } = errSlice.actions

export default errSlice.reducer