import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  // useForm is a custom hook from react-hook-form that manages form state and validation
  // Destructure register (to register inputs), handleSubmit (to handle form submission),
  // errors (for validation errors), and isSubmitting (to track submission state)
  const{
    register,
    handleSubmit,
    setError, // setError can be used to manually set validation errors
    formState : { errors, isSubmitting },
  }= useForm();

  // Simulate a network delay to mimic an async form submission (e.g., API call)
  const simulateNetworkDelay = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
  };

  // onSubmit is called when the form is submitted and passes validation
  // It is async to allow for simulated (or real) network requests
  const onSubmit = async (data) => {

    /*
      Send a POST request to the backend server with the form data.
      - JSON.stringify(data) converts the form data object to a JSON string.
      - The 'Content-Type' header is set to 'application/json' so the backend knows to parse the body as JSON.
      - If you omit this header, Express's body-parser.json() middleware will not parse the body, and req.body will be undefined.
      - The backend should also send a JSON response so that r.json() works on the frontend.
    */
    let r = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let res = await r.json(); // Parse the JSON response from the backend
    // await simulateNetworkDelay(); // Simulate a network delay
    console.log(data);
    if(data.username!=="tom"){
      // If the username is not "tom", set a custom error on the username field
      setError("myform", {
        type: "manual", // Manual error type
        message: "Username must be 'tom'" // Custom error message
      });
    } 

    if(data.username==="jack"){
      setError("jack", {message: "sorry this user is blocked!"}); // Set an error for a specific field
    }
    // Here you can handle the form submission, e.g., send data to an API
  } 

  return (
    <>
      {/*
        Show a loading message while the form is submitting.
        isSubmitting is managed by react-hook-form and is true during async submission.
      */}
      {isSubmitting && <div className="loading">Submitting...</div>}
      <div className="container">
        {/*
          handleSubmit wraps your onSubmit function and handles validation before calling it.
        */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {/*
            The {...register("username", ...)} syntax connects this input to react-hook-form.
            Validation rules are provided as the second argument:
              - required: field must be filled
              - minLength: minimum length (with custom error message)
              - maxLength: maximum length (with custom error message)
            react-hook-form will automatically validate and set errors if rules are broken.
          */} 
          <input 
            {...register("username", {
              required : true, 
              minLength: {value: 3, message:"Min length is 3"}, 
              maxLength: {value: 10, message:"Max length is 10"}
            })} 
            type="text" 
          />
          {/*
            If there is a validation error for username, display the error message.
            errors.username.message comes from the validation rules above.
            so it won't let u submit the form if there are errors
            errors.username ties the error to the specific input field -> username class here 
          */}
          {errors.username && <span className='error'>{errors.username.message}</span>}   
          <br />
          {/*
            Register the password input as well. No validation rules are provided here,
            but you could add them similarly to the username field.
          */}
          <input {...register("password")} type="password" placeholder='password' />
          <br />  
          {/*
            Disable the submit button while the form is submitting to prevent duplicate submissions.
          */}
          <input disabled={isSubmitting} type="submit" value="Submit" /> 
          {/* {errors.myform && (
            <span className='error'>{errors.myform.message}</span>
          )} */}
          {/*
            If there are any other form-level errors, display them here.
            This is useful for errors that don't belong to a specific field,
            such as server-side validation errors.
          */}
          {errors.jack && (
            <span className='error'>{errors.jack.message}</span>
          )}
        </form>
      </div>
    </>
  )
}

export default App
