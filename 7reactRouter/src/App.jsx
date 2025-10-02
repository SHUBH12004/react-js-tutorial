import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import './components/Navbar.jsx' 
//install router using npm i react-router-dom 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About.jsx'
import User  from './components/User.jsx'
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path:"/",// use colons not equal to (path: not path=)
      element: <><Navbar/><Home/></>, //this is the root path, so it will be shown when the app loads
      errorElement:<div>Page not found!</div>, //this will be shown when the page is not found
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>,
    },
    {
      path:"/about",
      element:<><Navbar/><About/></>,
    },
    {
      path:"/user/:username", //this is a dynamic route, where :username is a variable that can be accessed in the component
      element:<><Navbar/><User/></>,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
