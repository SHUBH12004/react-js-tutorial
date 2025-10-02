import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar  from './components/Navbar'

function App() {
  const [count, setCount] = useState(0);
  const [adjective, setAdjective] = useState("good");
  // useState is a hook that allows us to create state variables in functional components

  /*
    useCallback Hook:
    - useCallback is a React hook that returns a memoized version of the callback function you provide.
    - It only changes if one of the dependencies has changed.
    - Useful for passing stable function references to child components, which can help prevent unnecessary re-renders.
    - Syntax: const memoizedCallback = useCallback(() => { ... }, [dependencies]);
    - In this example, getAdjective will always return the same function instance unless dependencies change (here, dependencies array is empty, so it never changes).
  */
  // const getAdjective = useCallback(
  //   () => {
  //     return "Another";
  //   },
  //   [], // No dependencies, so the function reference will never change
    //useCallback freezes the function reference, preventing unnecessary re-renders of child components that depend on this function
  // )

  // const getAdjective = useCallback(
  //   () => {
  //     return "Another" + count; //this will never change count, cuz the function is frozen
  //   },
  //   [],
  // )

  //therefore, in the dependecy array pass count, this will cause function to change when count changes

  const getAdjective = useCallback(
    () => {
      return "Another" + count;
    },
    [count], // No dependencies, so the function reference will never change
    //useCallback freezes the function reference, preventing unnecessary re-renders of child components that depend on this function
  )
  
  // This function will return the current value of the adjective state variable

  /*
    useCallback vs useMemo:
    - useCallback is used to memoize functions, returning a memoized function reference.
    - useMemo is used to memoize values, returning a memoized value (the result of a computation).
    - useCallback(fn, deps) is equivalent to useMemo(() => fn, deps), but useCallback is more semantically clear for functions.
    - Both help optimize performance by preventing unnecessary recalculations or re-renders, especially in child components that rely on referential equality (React.memo, useEffect dependencies, etc.).
    
    Example:
    // useMemo for values
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    // useCallback for functions
    const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
  */

  return (
    <>
    <Navbar adjective={"good"} getAdjective={getAdjective}/>
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
