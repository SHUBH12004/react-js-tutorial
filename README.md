# React 101: A Practical and In-Depth Guide

This repository is a comprehensive, hands-on guide to mastering core and advanced React concepts. Each numbered directory corresponds to a key topic, containing a practical, isolated example. This document breaks down the "why" and "how" of each concept, using code snippets directly from this repository to ensure you can revise and deeply understand how React works.

---

## 1. The “Why”: From JavaScript to React

React is a library for building user interfaces. Its core strength lies in its **declarative** nature. Instead of manually manipulating the DOM (the *imperative* approach), you simply declare what the UI should look like for any given state, and React takes care of updating the DOM efficiently.

-   **Imperative (Vanilla JS)**: You write step-by-step instructions to change the UI. *"First, find the element with ID 'my-box'. Then, change its background color to red. Then, update its text."* This can become complex and error-prone.
-   **Declarative (React)**: You describe the final state of the UI. *"If the state is 'active', the box should be red and say 'Active'."* React figures out the most efficient way to make the DOM match this description.

*Explore the code in `/1whyreact/` to see a direct comparison.*

---

## 2. Building Blocks: Components & Props

Components are the heart of React. They are reusable, self-contained blocks of UI. Think of them as JavaScript functions that accept inputs (called **props**) and return React elements that describe what should appear on the screen.

-   **Props (Properties)**: Allow you to pass data from a parent component to a child component, making them dynamic and reusable.

*The example in `/2morereact/first-app/` demonstrates how to create and nest simple components like `Navbar` and `Footer`.*

---

## 3. State and Side Effects: The Core Hooks

Hooks are special functions that let you “hook into” React features from your function components. They are the backbone of modern React development.

### `useState`: Giving Components Memory

-   **What it does**: Allows a component to hold state—information that can change over time and affects the component's output. It returns an array with two elements: the current state value and a function to update it.
-   **Why it matters**: When the state is updated using the setter function, React automatically re-renders the component and its children to reflect the new state.

```jsx
// From: /1whyreact/with-react/src/App.js
import { useState } from 'react';

function App() {
  // Declares a state variable 'value' and a function 'setValue' to update it.
  const [value, setValue] = useState(0); // Initial state is 0

  return (
    <div className="App">
      <div className="value">{value}</div>
      <button onClick={() => {
        // Calling setValue triggers a re-render with the new value.
        setValue(value + 1);
      }}>Click me!</button>
    </div>
  );
}
```

### `useEffect`: Handling Side Effects

-   **What it does**: Lets you perform side effects in your components. Side effects are operations that affect something outside of the component itself, such as fetching data, setting up a subscription, or manually changing the DOM.
-   **The Dependency Array**: This is the crucial second argument to `useEffect`. It controls when the effect runs.
    -   `useEffect(fn)`: No array. Runs after **every single render**.
    -   `useEffect(fn, [])`: Empty array. Runs **only once**, after the initial render. Perfect for one-time setup like API calls.
    -   `useEffect(fn, [dep1, dep2])`: Runs once on mount, and then **only when any dependency in the array changes**.

```jsx
// From: /3hooks/useEffectHook/src/App.jsx
function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState(0);

  // Case 1: Runs only once after the initial render.
  useEffect(() => {
    alert("Welcome to my page!");
  }, [])

  // Case 2: Runs after the initial render AND every time 'count' changes.
  useEffect(() => {
    console.log("Count was changed!");
    setColor(color + 1);
  }, [count]);
}
```

### `useRef`: Escaping the Render Cycle

-   **What it does**: Returns a mutable ref object whose `.current` property is initialized to the passed argument. The object persists for the full lifetime of the component without causing re-renders when its value changes.
-   **Key Use Cases**:
    1.  **Accessing DOM nodes**: To directly interact with an element, like focusing an input.
    2.  **Storing a mutable value**: To keep track of a value that shouldn't trigger a re-render when it changes (e.g., a timer ID, a previous state value).

```jsx
// From: /3hooks/useRefHook/src/App.jsx
function App() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(1); // Persists across renders
  const inputRef = useRef(null); // Will hold a DOM element

  useEffect(() => {
    renderCount.current++; // This does NOT cause a re-render
  });

  const focusInput = () => {
    inputRef.current.focus(); // Directly manipulating the DOM
  };

  return (
    <>
      <p>Render count: {renderCount.current}</p>
      <input ref={inputRef} placeholder="Focus me with button" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}
```

---

## 4. State Management: `useContext` vs. Redux

### `useContext`: Simple State Sharing

As an application grows, passing props down through many levels of components (a problem known as **prop drilling**) becomes cumbersome.

#### The Problem: Prop Drilling
Imagine a `count` state in the top-level `App` component that needs to be displayed in a deeply nested `Component1`. Without `useContext`, you have to pass `count` as a prop through every intermediate component, even those that don’t use it.

*Example in `/3hooks/without useContextHook/`.*

#### The Solution: `useContext`
- **What it does**: Provides a way to pass data through the component tree without having to pass props down manually at every level.
- **How it works**:
  1.  `createContext()`: Creates a Context object.
  2.  `<MyContext.Provider value={...}>`: Wraps a part of your component tree and makes the `value` available to all components inside.
  3.  `useContext(MyContext)`: A hook used in any child component to read the context's value.

*Example in `/3hooks/useContextHook/`.*

---

## 5. Performance Optimization: `useMemo` and `useCallback`

React is fast, but re-rendering can become expensive. `useMemo` and `useCallback` are tools to optimize performance by preventing unnecessary work.

### `useMemo`: Memoizing Expensive Calculations

-   **What it does**: Caches the result of a calculation. The function you pass to `useMemo` is only re-executed if a dependency in its dependency array has changed. It returns the cached value.
-   **Why it matters**: Prevents re-computing heavy functions on every render, keeping your app fast and responsive.

```jsx
// From: /3hooks/useMemo/src/App.jsx
const nums = new Array(30_000_000).fill(0).map((_, i) => {
  return {
    index: i,
    isMagical: i === 29_000_000,
  }
});

function App() {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState(nums)

  // Without useMemo, this expensive find() would run on EVERY render,
  // even when just the 'count' state changes, causing major lag.
  const magical = useMemo(() => {
    return numbers.find((num) => num.isMagical)
  }, [numbers]); // With useMemo, it only runs if 'numbers' changes.

  return (
    <>
      <span>Magical number is {magical.index}</span>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}
```

### `useCallback`: Memoizing Functions

-   **What it does**: Caches a function definition itself. It returns the *exact same function instance* between renders unless a dependency changes.
-   **Why it matters**: Crucial for optimizing child components. If you pass a function as a prop to a child component wrapped in `React.memo`, `useCallback` ensures the prop doesn't change on every parent re-render, thus preventing the child from re-rendering unnecessarily.

```jsx
// From: /3hooks/useCallbackHook/src/App.jsx

// Child component wrapped in memo to prevent re-renders if props are the same.
const Navbar = memo(({ getAdjective }) => {
  console.log('Navbar rendered');
  return <div>I am a {getAdjective()} Navbar</div>;
});

function App() {
  const [count, setCount] = useState(0);

  // Without useCallback, a new getAdjective function is created on every render of App.
  // This would cause Navbar to re-render every time, defeating the purpose of memo.
  const getAdjective = useCallback(() => {
    return "Another" + count;
  }, [count]); // With useCallback, the function reference is stable.

  return (
    <>
      <Navbar getAdjective={getAdjective} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```

---

## 6. Dynamic UIs: Conditional Rendering & Lists

### Conditional Rendering

You can render UI conditionally based on the current state. The two most common patterns are:

1.  **Ternary Operator (`condition ? <A /> : <B />`)**: For choosing between two pieces of UI.
2.  **Logical AND (`condition && <A />`)**: For rendering a piece of UI only if a condition is true.

```jsx
// From: /4condrendering/src/App.jsx
function App() {
  const [showBtn, setShowBtn] = useState(false);

  return (
    <>
      {/* Using Logical AND: The button only renders if showBtn is true */}
      {showBtn && <button>I am now visible!</button>}

      <button onClick={() => setShowBtn(!showBtn)}>
        {showBtn ? "Hide Button" : "Show Button"} {/* Using Ternary */}
      </button>
    </>
  );
}
```

### Rendering Lists

To render a dynamic list of components, you can use the `.map()` array method. **Crucially**, you must provide a unique `key` prop to each element in the list. This helps React identify which items have changed, are added, or are removed, leading to much more efficient updates.

```jsx
// From: /5listApiData/src/components/Card.jsx
function Card() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    // Fetch data and update state...
  }, []);

  return (
    <div>
      {/* Mapping over the array to render a list of cards */}
      {postList.map(post => (
        // The 'key' prop must be a unique identifier.
        <div key={post.id} className="card">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 7. Making it Interactive: Handling Events & Forms

### Event Handling

React normalizes events to work consistently across browsers. Event handlers are named using camelCase, like `onClick` or `onChange`.

### Controlled Components

This is the standard React pattern for handling form inputs. The form input's value is controlled by React state.

1.  A state variable holds the value of the input.
2.  The input's `value` attribute is set to this state variable.
3.  An `onChange` handler updates the state variable whenever the user types.

This creates a single source of truth for the input's value.

```jsx
// From: /6handlingEvents/src/App.jsx
function App() {
  const [form, setForm] = useState({ email: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <input
        type="text"
        name="email"
        placeholder="Type email"
        value={form.email} // Value is controlled by state
        onChange={handleChange} // State is updated on change
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
      />
    </>
  );
}
```

---

## 8. Navigation: React Router

React Router is the go-to library for client-side routing in a Single-Page Application (SPA). It enables navigation between different views without causing a full page reload.

-   **`createBrowserRouter`**: Creates a router instance where you define your routes.
-   **`RouterProvider`**: Provides the router to your application.
-   **`NavLink`**: A special version of `<Link>` that knows whether or not it is "active". This is perfect for styling the currently selected navigation link.
-   **`useParams`**: A hook to access URL parameters from a dynamic route (e.g., `/user/:username`).

```jsx
// From: /7reactRouter/src/App.jsx
import { createBrowserRouter, RouterProvider, NavLink, useParams } from 'react-router-dom';

// Define routes
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/user/:username", element: <User /> } // Dynamic route
]);

// Render the provider
function App() {
  return <RouterProvider router={router} />;
}

// Style active links with NavLink
const Navbar = () => (
  <nav>
    <NavLink to="/" className={({ isActive }) => (isActive ? "red" : "")}>Home</NavLink>
    <NavLink to="/about" className={({ isActive }) => (isActive ? "red" : "")}>About</NavLink>
  </nav>
);

// Access dynamic params
const User = () => {
  const { username } = useParams();
  return <div>This is user {username}</div>;
};
```

---

## 9. Advanced Form Handling with `react-hook-form`

For complex forms, `react-hook-form` is a powerful library that optimizes performance and simplifies validation.

-   **`useForm`**: The core hook that provides methods for registering inputs, handling submission, and accessing form state and errors.
-   **`register`**: Connects an input to the form, tracking its value and validation status.
-   **`handleSubmit`**: A function that validates your form before calling your `onSubmit` handler.

```jsx
// From: /8formhandling/src/App.jsx
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: { value: 3, message: "Min length is 3" }
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username && <span className='error'>{errors.username.message}</span>}

      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span className='error'>{errors.password.message}</span>}

      <input disabled={isSubmitting} type="submit" value="Submit" />
    </form>
  );
}
```

---

## 10. Advanced State Management: Redux

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

### Core Concepts

-   **Store**: A single, centralized object that holds the entire state of your application.
-   **Actions**: Plain JavaScript objects that describe what happened.
-   **Reducers**: Pure functions that take the previous state and an action, and return the next state.
-   **Dispatch**: The method used to send actions to the Redux store.
-   **Selectors**: Functions that extract specific pieces of information from the store state.

### Redux Toolkit

Redux Toolkit is the official, recommended way to write Redux logic. It simplifies store setup, creating reducers, and writing immutable update logic.

-   `configureStore`: A function that simplifies store setup and includes good defaults like the Redux DevTools Extension.
-   `createSlice`: A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

*Example in `/9redux/`.*

---

## 11. Setup and Tooling

All projects use **Vite** for a fast development experience.
- **Prerequisites**: Node.js and npm/yarn.
- **Installation**: `npm install` in any project subdirectory.
- **Running**: `npm run dev`.

## 12. Contributing to this Guide

This is a living document. Contributions are welcome!
- **Focus on Clarity**: Explain concepts simply.
- **Link to Code**: Ground every concept in a practical example from this repository.
- **Expand**: Add new sections for new concepts as they are added to the codebase.
