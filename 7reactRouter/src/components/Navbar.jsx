import React from 'react'
import { NavLink } from 'react-router-dom'

//with Link component, the page will not reload everytime you click a link
//instead it will change the URL and render the component that matches the URL
//use Link instead of a tag
//use Link classNameto navigate between pages without reloading the page

//full page reloads can destroy the state, make the app slower, and cause flickering
//so we use Link component from react-router-dom classNameto navigate between pages without reloading the page

//instead of href we use 'to' with link

//with NavLink we can attach className and do some conditional rendering based on the active link 
const Navbar = () => {
  return (
    <div>
      <nav>
        {/* <a href="/"><li>Home</li></a> */}
        <NavLink className={(e)=>{return e.isActive?"red":""}}to="/"><li>Home</li></NavLink>
        {/* <a href="/about"><li>About</li></a> */}
        <NavLink className={(e)=>{return e.isActive?"red":""}}to="/about"><li>About</li></NavLink>
        {/* <a href="/login"><li>Login</li></a> */}
        <NavLink className={(e)=>{return e.isActive?"red":""}}to="/login"><li>Login</li></NavLink>
      </nav>
    </div>
  )
}

export default Navbar