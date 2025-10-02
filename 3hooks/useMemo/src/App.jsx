import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const nums = new Array(30_000_000).fill(0).map((_, i) => {
  return {
    index: i,
    isMagical:i===29_000_000 ? true : false,
  }
})
import { useMemo } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState(nums)

  // const magical=numbers.find((num) => num.isMagical) //Expensive computation
  //whenever count value is changed, on every render, this computation will be done again

  //so on count from 0 to 1, it will run 29 mil times
  //then on count from 1 to 2, it will run 29 mil times again
  // This is inefficient, as the magical number does not change with count

  // We can optimize this using useMemo to memoize the result of the expensive computation

  const magical = useMemo(() => {
    return numbers.find((num) => num.isMagical)
  }, [numbers]) // This will only recompute when numbers changes
  //numbers is the dependency array, if numbers changes, then the computation will be done again
  //for example in the button below we change when count reaches 5
  // Using useMemo to memoize the result of the expensive computation  
  //this will save the value across re-renders 

  //this reduces and keeps the app responsive, as single expensive computation at every render can bottleneck the app
  //useMemo will only recompute the value when the dependencies change, in this case when numbers changes
  return (
    <>
      <div>
        <span>Magical number is {magical.index}</span>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {setCount((count) => count + 1);
          if(count==10){
            setNumbers(new Array(10_000_001).fill(0).map((_, i) => {
              return {
                index: i,
                isMagical:i===9_000_001 ? true : false,
              }
            }))} //will also be saved by useMemo as numbers is passed as dependency array
            //this will add a new magical number to the numbers array
            //so now the magical number will be 29_000_001
          }
        }>
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
