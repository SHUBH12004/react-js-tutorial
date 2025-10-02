import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
function App() {
  //this is jsx syntax, looks like html but gets converted to js
  const [value, setValue] = useState(0); //new state variable value and function setValue to update it and default value is 0
  //useState is a hook that allows you to add state to functional components
  //hooks are functions that let you use state and other React features without writing a class
  return (
    //className is used instead of class
    //because class is a reserved keyword in js
    <div className="App">
      <Navbar logoText="Hello World"/> 
      <div className="value">{value}</div>
      <button onClick={()=>{
        setValue(value + 1); //update the value by incrementing it by 1
      }} > Click me!</button>
    </div>
  );
}

export default App;
