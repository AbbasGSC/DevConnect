import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteEducation} from "../../actions/profile";

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

function Education({ education,deleteEducation }) {

    const educations = education.map(edu => (
        <tr key={edu.id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>to
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.from}</Moment>)}
            </td>
            <td><button onClick={()=>deleteEducation(edu.id)} className='btn btn-danger'>Delete</button></td>
        </tr>
    ))

    return (
        <div>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Action</th>
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </div>
    );
}

export default connect(null, {deleteEducation})(Education);