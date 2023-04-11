import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../Assets/logo1.png';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const toastOptions={
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  }

  useEffect(()=> {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      const { password, username } = values;
        const {data} = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          navigate('/');
        }
      }
  }

  const handleValidation = () => {
    const {password, username } =values;
    if( username === '') {
     toast.error("Email and password is required",toastOptions);
     return false;
    } else if(password === '') {
      toast.error("Email and Password is required", toastOptions);
      return false;
    } 
    return true;
  };

  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
  }
  return (
    <>
     <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
              <img src={Logo} alt='Logo' />
              <h1>Messenger App</h1>
          </div>
          <div className='alignn'>
            <h3>Have Your Best Chat🤝</h3>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} min='3' />
          
          <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          
          <button type='submit'>LOGIN</button>
          <span>Don't have an account ? <Link to='/register'>Register</Link></span>
          <div  className='alignn'>
              <h3>Talking with everyone and keep secure...</h3>
            </div>
        </form>
     </FormContainer>
     <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #EB9DAA;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
    }
  }
  .alignn {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #7D1224;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #D05368;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #5E5254;
            outline: none;
        }
    }
    button {
      background-color: #ff70af;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      outline: none;
      &:hover{
        background-color: #fc9ca4;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
        margin-left:2px;
      }
    }
`;


export default Login;

