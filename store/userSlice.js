import { createSlice } from '@reduxjs/toolkit'



let user = createSlice({
    name : 'user',
    initialState : { name : 'Han', age : 20 },
    reducers : {
      changeName(state){
        state.name = '판테라'
      },
      increase(state, action){
        state.age += action.payload
      }
    }
  })


  export let { changeName, increase} = user.actions

  export default user