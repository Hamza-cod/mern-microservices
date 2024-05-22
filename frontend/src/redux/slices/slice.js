import {createSlice} from "@reduxjs/toolkit"
import { initialState } from "../state"

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser : (state , {payload})=>{
       return {...state ,user: payload}
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {setUser } = userSlice.actions

export default userSlice.reducer