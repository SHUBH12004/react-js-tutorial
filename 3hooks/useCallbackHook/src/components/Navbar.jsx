import React from 'react'
import {memo} from 'react';
const Navbar = ({adjective, getAdjective}) => {
    console.log('Navbar rendered');
  // This component receives a prop called 'adjective'
  return (
    <div> 
       I am a {adjective} Navbar
       <button onClick={()=>{getAdjective()}}>{getAdjective()}</button>
    </div>
     
  )
}

//function calls getAdjective when the button is clicked, which will trigger a state change in the parent component.
// This is a functional component that displays a navbar with an adjective and a button to get a new adjective.
// The button click will call the getAdjective function passed from the parent component, which will return the current adjective.


//for this, we useCallback hook in the parent component to prevent unnecessary re-renders of the Navbar component.

export default memo(Navbar) //do this to prevent unnecessary re-renders