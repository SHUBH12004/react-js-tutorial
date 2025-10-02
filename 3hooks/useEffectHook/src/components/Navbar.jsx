import React, {useEffect} from 'react'

const Navbar = (props) => {
  //case 1 -> run only once when the component mounts
  useEffect(() => {
    console.log("Navbar component mounted!")
  }
  , []) // This effect will run only once when the component mounts
  
  //case 2 -> run every time the component renders
  useEffect(() => {
    console.log("Navbar component rendered!")
  }) // This effect will run every time the component renders

  //case 3 -> run only when certain props change
  useEffect(() => {
    console.log("Color was changed gng!")
  }, [props.color]) // This effect will run whenever props.color changes
  
  return (
    <div>
        I am Navbar of {props.color} hehe... 
    </div>  
  )
}

export default Navbar