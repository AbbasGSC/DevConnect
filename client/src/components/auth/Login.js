import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Alert from "../layout/Alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { login } from '../../actions/auth'



export const Login = () => {

const [formData,setFormData] = useState({
    email:'',
    password:''
});

const {email,password} = formData;

const onChange = (e)=>setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e)=>{ 
    e.preventDefault();

        const newUser = {
            email,
            password
        }
        try {
            const config = {
                headers:{
                    'content-type':'application/json'
                }
            }
            const body = JSON.stringify(newUser);

            const res = await axios.post('/api/users',body,config);

            console.log(res.data);
        } catch (error) {
            console.log(error.resonse.data);
        }
    
}

  return (
    <section class="container">
        <Alert/>
    <h1 class="large text-primary">Sign In</h1>
    <p class="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
    <form class="form" onSubmit={e => onSubmit(e)}>
      <div class="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange}/>
      </div>
      <div class="form-group">
        <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={onChange}/>
      </div>
      <input type="submit" class="btn btn-primary" value="Login" />
    </form>
    <p class="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </section>
  )
}

export default Login