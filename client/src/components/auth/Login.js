import React,{useState} from 'react'
import {Link, redirect} from 'react-router-dom';
import axios from 'axios';
import Alert from "../layout/Alert";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import { login } from '../../actions/auth'



export const Login = ({login, isAthenticated}) => {

const [formData,setFormData] = useState({
    email:'',
    password:''
});

const {email,password} = formData;

const dispatch = useDispatch();

const onChange = (e)=>setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e)=>{ 
    e.preventDefault();

    dispatch(login({email,password}));
    };

    //redirect if logged in
    if(isAthenticated){
        return redirect("/");
    }

  return (
    <section className="container">
        <Alert/>
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange}/>
      </div>
      <div className="form-group">
        <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={onChange}/>
      </div>
      <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </section>
  )
}

Login.ProtoType = {
    login: PropTypes.func.isRequired,
    isAthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAthenticated: state.auth.isAthenticated
});

export default connect(mapStateToProps, { login }) (Login);