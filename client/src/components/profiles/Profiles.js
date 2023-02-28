import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getProfiles} from "../../actions/profile";
import ProfileItem from "./ProfileItem";

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

function Profiles({getProfiles, profile:{profiles, loading}}) {

    useEffect(()=>{
        getProfiles();
    },[getProfiles]);

    return (
        <div className='container'>
            {loading ? <Spinner/> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"/> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (profiles.map(profile=>(
                        <ProfileItem key={profile.id} profile={profile}/>
                    ))) : <h4>No profiles were found</h4>}
                </div>
            </Fragment>}
        </div>
    );
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles);