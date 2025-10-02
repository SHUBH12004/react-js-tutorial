import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  //Why useEffect hook? 
  // let a=0;

  // useEffect(() => {
  //   a=a+1;
  //   console.log("Re-rendering and the value of a is ", a); //gives a = 1 every time
    //due to re-rendering, the value of a is reset to 0, not persisting across renders
  // }, )

  //for solving the above issure, we use useRef hook
  //useRef hook is used to persist values across renders without causing a re-render
  //it returns a mutable ref object whose .current property is initialized to the passed argument (initialValue)
  //the returned object will persist for the full lifetime of the component

  //changing ref doesn't re-render a component, so for on screen changes useState only should be used as it re-renders with changes
  //ref can help in persisting, but doesn't tirgger a re-render when the value changes  

  const a = useRef(0);
  useEffect(() => {  
    a.current = a.current + 1; //a.current is a mutable object that persists across renders
    console.log(`Re-rendering and the value of a is ${a.current}`); //gives aRef.current = 1 every time
    //the value of aRef.current persists across renders
  },)
  const btnRef=useRef()
  useEffect(() => {
    console.log("First render...")
    btnRef.current.style.backgroundColor="red"; //now red persists across re- renders
  }, [])
  
  
  // 2. Accessing and focusing a DOM element
  const inputRef = useRef(null);
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  // 3. Storing interval IDs or timers
  const intervalRef = useRef();
  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // 4. Tracking previous state value
  const prevCount = useRef();
  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  // 5. Avoiding re-renders when updating a value
  const renderCount = useRef(1);
  useEffect(() => {
    renderCount.current++;
  });

  return (
    <>
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
        <button ref={btnRef} onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <p>Previous count: {prevCount.current}</p>
        <p>Render count (tracked with ref): {renderCount.current}</p>
        <input ref={inputRef} placeholder="Focus me with button" />
        <button onClick={focusInput}>Focus Input</button>
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
