import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx';

function App() {
  const [count, setCount] = useState(0)

  const [color, setColor] = useState(0);
  // useState is a Hook that lets you add React state to function components.

  //UseEffect is a Hook that lets you perform side effects in function components.
  // It can be used to run code after the component renders, or when certain values change.
  // useEffect(() => {
  //   first
  
  //   return () => {
  //     second
  //   }
  // }, [third])

  // will run twice cuz of strictmode -> it runs the code twice in development mode to help identify side effects that are not handled correctly.


  // The first time it runs is after the component mounts, and the second time is after the component updates.
  // The cleanup function (if provided) runs before the component unmounts or before the effect runs again.
  // The second time it runs is after the component updates, and the cleanup function (if provided) runs before the effect runs again.
  // The third argument is an array of dependencies that the effect depends on. If any of the values in the array change, the effect will run again.

  useEffect(() => {
    alert("Welcome to ma page!");
  }, [])

  useEffect(() => {
    console.log("Count was changed!");
    setColor(color + 1) ;
  }
  , [count]); // This effect will run whenever `color` changes.
  
  useEffect(() => {
    // This effect runs after the component mounts and whenever `count` changes
    console.log(`Count is now: ${count}`);
    
    // Cleanup function (optional)
    // return () => {
    //   console.log('Cleanup before next effect or unmount');
    // };
  }
  , [count]); // The effect depends on `count`, so it will run whenever `count` changes.
  

  return (   
    <>
    <Navbar color={"navy"+"blue"+color} />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
