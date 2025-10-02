import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0) 

  const [form, setForm] = useState({
    email: "",
    phone: ""
  });

  const handleClick =()=>{
    alert("Button clicked!");
    console.log("Button clicked!");
    //this function will be called when the button is clicked
  }

  const handlemouseOver =()=>{
    alert("Mouse is over the red div!");
    //this function will be called when the mouse is over the red div
  }
  

  const handleChange =(e)=>{
    // setName(e.target.value);
    //this function will be called when the input value changes
    //this is async and takes a lil bit time to run 
    setForm({   
      ...form,//spreads the form object 
      [e.target.name]: e.target.value //updates the necessary fields
    });
    //console.log(form); -> this might run before setForm is updated due to async nature of setForm
    //so to see the updated value of form, use useEffect hook
  }

  return (
    <>
      <div className="button">
        <button onClick = {handleClick}>Click me gng!</button>
      </div>
       
       {/* <div className="red">
          I am a red div
       </div> */}
       <input type="text" placeholder="Type email" onChange={handleChange} name='email' value={form?.email}/>
       <input type="text" placeholder="Phone number" onChange={handleChange} name='phone' value={form?.phone}/>
    </>
  )
}
   
export default App
