// import React from 'react' //type rafce for this entire code snippet
// react also uses virtual dom to update the UI
// const Navbar = () => {
//   return (
//     <div>Navbar</div>
//   )
// }

// export default Navbar

import React from 'react'
import Footer from './Footer'
//can use the logotext passed
//props helps pass data from components
const Navbar = (props) => {  
  return (
    <div>
        <div className="logo">{props.logoText}</div> 
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
        <Footer />  
    </div>
  )
}

export default Navbar