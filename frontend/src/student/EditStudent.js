

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditStudent() {
    const [student, setStudent] = useState({
        student: {
            firstname: '',
            lastname: '',
        },
        studdetials: {
            address: '',
            gender: '',
            emailid: '',
        },
        marks: {
            subject: '',
            marks: '',
        },
    });


    // const [student, setStudent] = useState({
    //     student: {
    //         firstname: '',
    //         lastname: '',
    //     },
    //     studdetials: {
    //         address: '',
    //         gender: '',
    //         emailid: '',
    //     },
    //     marks: {
    //         subject: '',
    //         marks: '',
    //     },
    // });



    const { id } = useParams();


    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://ec2-65-1-86-67.ap-south-1.compute.amazonaws.com/api/s/getstudent/${id}`);
            setStudent(result.data);
            console.log("Printing data", result.data);
            console.log('Printing student state', student.result);

        } catch (error) {
            console.error('Error fetching student:', error);
        }
    };


    const onInputChange = (e) => {
        const { name, value } = e.target;

        setStudent((prevStudent) => {
            return {
                ...prevStudent,
                [name]: value,
                student: {
                    ...prevStudent.student,
                    [name]: value,
                },
                studdetials: {
                    ...prevStudent.studdetials,
                    [name]: value,
                },
                marks: {
                    ...prevStudent.marks,
                    [name]: value,
                },
            };
        });
    };








    const updateStudent = async () => {

        try {

            // setStudent(result.data);
            await axios.put(`http://ec2-65-1-86-67.ap-south-1.compute.amazonaws.com/api/s/updatestudent/${id}`, student);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Student Details</h2>
                    <div className="card">
                        <div className="card-header">
                            Details of Student id : {student.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>First_name:</b> &nbsp;
                                    <input
                                     type="text"
                                     name="firstname"
                                     value={student.firstname}
                                     onChange={(e) => onInputChange(e)}
                                    />
                                </li>
                                <li className="list-group-item">
                                    <b>Last_name:</b> &nbsp;
                                    <input
                                     type="text"
                                     name="lastname"
                                     value={student.lastname}
                                     onChange={(e) => onInputChange(e)}
                                />
                                </li>
                                <li className="list-group-item">
                                    <b>Address:</b> &nbsp;
                                    <input
                                        type="text"
                                        name="address"
                                        value={student.studdetials?.address || ''}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </li>
                                <li className="list-group-item">
                                    <b>Gender:</b> &nbsp;
                                    <input
                                        type="text"
                                        name="gender"
                                        value={student.studdetials?.gender || '' }
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </li>
                                <li className="list-group-item">
                                    <b>Email_id:</b> &nbsp;
                                    <input
                                        type="text"
                                        name="emailid"
                                        value={student.studdetials?.emailid || ''}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </li>
                                <li className="list-group-item">
                                    <b>Subject:</b> &nbsp;
                                    <input
                                        type="text"
                                        name="subject"
                                        value={student.marks.subject}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </li>
                                <li className="list-group-item">
                                    <b>Marks:</b> &nbsp;
                                    <input
                                        type="text"
                                        name="marks"
                                        value={student.marks.marks}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </li>
                                <li className="list-group-item">
                                    <Link className="btn btn-primary" onClick={updateStudent} to={'/'}>
                                        Update
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={'/'}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

//New method

