import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 }
  
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            //redux toolkit allows us to write mutating logic in reducers
            //it uses Immer library under the hood to handle immutability
            //Immer allows us to write code that "mutates" the state, but it actually produces a new state object
            //so we can write code like this:
            //state.count = state.count + 1;
            //or simply 
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        },
        incrementByAmount: (state, action) => {
            //action.payload contains the value to increment by
            //so we can write code like this:
            state.value += action.payload;
        }
    },
});
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions; 
export default counterSlice.reducer;