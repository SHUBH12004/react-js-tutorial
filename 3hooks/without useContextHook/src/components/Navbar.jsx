import React from 'react'
import Button from './Button'

const Navbar = (props) => {
  return (
    <div> 
        <Button count={props.count}/>
    </div>
   
  )
}

export default Navbar