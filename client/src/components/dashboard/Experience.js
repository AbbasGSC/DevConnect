import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteExperience} from "../../actions/profile";

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

function Experience({ experience, deleteExperience }) {

    const experiences = experience.map(exp => (
        <tr key={exp.id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>to
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.from}</Moment>)}
            </td>
            <td><button onClick={()=>deleteExperience(exp.id)} className='btn btn-danger'>Delete</button></td>
        </tr>
    ))

    return (
        <div>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Action</th>
                </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </div>
    );
}

export default connect(null, {deleteExperience})(Experience);