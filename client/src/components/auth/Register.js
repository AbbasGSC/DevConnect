import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';

export const Register = ({setAlert}) => {

const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
});

const {name,email,password,password2} = formData;

const onChange = (e)=>setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e)=>{ 
    e.preventDefault();
    if(password!==password2){
        setAlert('password does not match','danger');
    }else{
        const newUser = {
            name,
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
}

  return (
    <section class="container">
    <h1 class="large text-primary">Sign Up</h1>
    <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
    <form class="form" onSubmit={e => onSubmit(e)}>
      <div class="form-group">
        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
      </div>
      <div class="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange}/>
        <small class="form-text"
          >This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
      </div>
      <div class="form-group">
        <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={onChange}/>
      </div>
      <div class="form-group">
        <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={onChange}/>
      </div>
      <input type="submit" class="btn btn-primary" value="Register" />
    </form>
    <p class="my-1">
      Already have an account? <Link to="/login">Sign In</Link>
    </p>
  </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, setAlert)(Register)