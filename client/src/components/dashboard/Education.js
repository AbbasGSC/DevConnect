import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Moment from "react-moment";

Education.propTypes = {
    education: PropTypes.array.isRequired
};

function Education({ education }) {

    const educations = education.map(edu => (
        <tr key={edu.id}>
            <td>{edu.company}</td>
            <td className='hide-sm'>{edu.title}</td>
            <td>to
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.from}</Moment>)}
            </td>
            <td><button className='btn btn-danger'>Delete</button></td>
        </tr>
    ))

    return (
        <div>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Action</th>
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </div>
    );
}

export default Education;