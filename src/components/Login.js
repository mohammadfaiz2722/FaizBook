import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({showAlert}) => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json()
    console.log(json);

    if (response.ok) {
      // save the authtoken and redirect
      console.log(json.authToken);
      console.log("Login successfully");
      localStorage.setItem('token', json.authToken)
      // showAlert("Login Successful", "success")
      toast.success('Login  Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(()=>{
        navigate('/social-media')

      },3000)
    }
   else{
    toast.warn('Login  failed', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
   }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    // console.log([e.target.name])
  }
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <div className='container mt-3'>
    <h1 className='my-4'>Login to continue FaizBook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
      </div>
    </>
  )
}
export default Login
