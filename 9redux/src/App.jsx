import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//state in redux will be read from reduxStore
//
import { useSelector, useDispatch } from 'react-redux' //hooks to access redux state and dispatch actions
import { increment, decrement, incrementByAmount, reset } from './redux/counter/counterSlice.js'
function App() {
 const count = useSelector((state) => state.counter.value) //useSelector is a hook that lets you extract data from the Redux store state, using a selector function
 const dispatch = useDispatch() //useDispatch is a hook that returns a reference to the dispatch function from the Redux store, allowing you to dispatch actions
  return (
    <>
      <div>
      <button onClick={()=>dispatch(decrement())} >-</button>
       Current count : {count} yay!!!
       <button onClick={()=>dispatch(increment())}>+</button>
      </div>
     
    </>
  )
}

export default App
