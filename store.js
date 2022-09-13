import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : '판테라', count : 2},
    {id : 1, name : '옵시디언', count : 1},
    {id : 2, name : '메이크', count : 3}
  ],
  reducers : {
    CountUp(state, action){
      let start = state.findIndex((a) =>{ return a.id === action.payload })
      state[start].count++
    },
    addR(state, action){
      state.push(action.payload)
    }
  }
})

export let { CountUp, addR } = cart.actions


export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
   }
}) 


