import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter/counterSlice";
export const store = configureStore({
    //reducer function will help take an initial state and return a new state based on the actions dispatched.
    reducer: {
        // Add your reducers here
        // e.g., user: userReducer,
        //       posts: postsReducer,
        counter: counterReducer, // This is the counter slice reducer 
    },
    })
// The store is the single source of truth in Redux.
//what is single source of truth? ->  Single source of truth means that the entire state of your application is stored in one place, making it easier to manage and debug.
// The store holds the complete state tree of your app.
// The store is created using configureStore from Redux Toolkit, which simplifies the setup process.