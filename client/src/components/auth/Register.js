import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
import PropTypes from "prop-types";

export const Register = ({setAlert, register}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const dispatch = useDispatch();

	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			dispatch(setAlert('password does not match', 'danger'));
		} else {
			dispatch(register({name, email, password}));
		}
	};

	return (
		<section className="container">
			<Alert />
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</section>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
}
export default connect(null, {setAlert, register})(Register);