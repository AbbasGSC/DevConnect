import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Route, useNavigate} from "react-router-dom";

const PrivateRoute = ({component: Component, auth, ...rest}) => {

    const navigate = useNavigate();

    return (
        <Route {...rest} render={props => !auth.isAuthenticated  ? (navigate('/login')) : (<Component {...props}/>)}/>
    );
}

PrivateRoute.propTypes = {
    auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps)(PrivateRoute);