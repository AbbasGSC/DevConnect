import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Moment from "react-moment";

Experience.propTypes = {
    experience: PropTypes.array.isRequired
};

function Experience({ experience }) {

    const experiences = experience.map(exp => (
        <tr key={exp.id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>to
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.from}</Moment>)}
            </td>
            <td><button className='btn btn-danger'>Delete</button></td>
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

export default Experience;