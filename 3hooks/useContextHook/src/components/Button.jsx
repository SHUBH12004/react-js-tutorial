import React from 'react'
import Component1 from './Component1.jsx'
import { counterContext } from '../context/context'
import { useContext } from 'react'

const Button = () => {
    // Access the context value (count and setCount) using useContext hook
    const value = useContext(counterContext);
    // value = { count, setCount }

    return (
    <div>
        {/* 
          When the button is clicked, increment the count by 1 using setCount.
          The onClick handler is an arrow function, so setCount is only called when the button is actually clicked.
          If you call setCount directly (without the arrow function), it will run on every render, causing an infinite loop.
        */}
        <button onClick={() => value.setCount((count)=>count+1)}>
          {/* 
            Render Component1 inside the button. Component1 will display the current count value from context.
            This demonstrates how context can be shared across multiple components.
          */}
          <span><Component1/></span>
          I am a button!
        </button>
    </div>
  )
} 

export default Button