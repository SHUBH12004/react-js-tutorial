import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//inside return whenever writing js code, use {} and write in that
function App() {
  const [count, setCount] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  const [todos, setTodos]=useState([
    {
      title: "Hey!",
      desc: "I am good todo"
    },
    {
      title: "Hello!",
      desc: "I am another todo"
    },
    {
      title: "Hi!",
      desc: "I am yet another todo"
    }

  ])

  const Todo = ({todo}) => {
    return(
    <>
      <div className="todo">{todo.title}</div>
      <div className="todo">{todo.desc}</div>
    </>
    );
  }   ;

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

      {/*showBtn? <button>I will be shown only when another button is clicked!</button>:""*/}
      {showBtn && (
        <button>I will be shown only when another button is clicked!</button>
      )}
      {/*to render a list*/ todos.map(todo =>{
        return <Todo todo={todo} key={todo.title}/>
      })}
      <div className="card">
        <button onClick={() => setShowBtn(!showBtn)}>Toggle showBtn!</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
