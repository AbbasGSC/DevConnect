import React, {Fragment, useEffect} from 'react';
import  {connect} from "react-redux";
import {Link} from "react-router-dom";
import {deleteAccount, getCurrentProfile} from "../../actions/profile";
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";


function Dashboard({getCurrentProfile, auth: {user}, profile: {profile, loading}}) {

    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile]);
    return (

        <div className="container">
            {loading && profile === null ? <Spinner/> : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"/> Welcome { user && user.name }
            </p>
                {profile !== null ? <Fragment>
                    <DashboardActions/>
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education}/>
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                            <i className="fas fa-user-minus"/> Delete My Account
                        </button>
                    </div>
                </Fragment> : <Fragment>
                    <p>You have not set up a profile yet, please add some info</p>
                    <Link to="/create-profile" className="btn btn-primary my-1"> Create Profile</Link>
                </Fragment>}
        </Fragment>}
        </div>

    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{ getCurrentProfile, deleteAccount })(Dashboard);
