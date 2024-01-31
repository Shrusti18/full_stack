import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewStudent() {
  const [student, setStudent] = useState({
    firstname: '',
    lastname: '',
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

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://ec2-13-127-128-170.ap-south-1.compute.amazonaws.com/api/s/getstudent/${id}`);
      setStudent(result.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Student Details</h2>
          <div className="card">
            <div className="card-header">
              Details of Student id: {student.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>First_name:</b>
                  <input
                    type="text"
                    name="firstname"
                    value={student.firstname}
                    onChange={handleInputChange}
                  />
                </li>
                <li className="list-group-item">
                  <b>Last_name:</b>
                  <input
                    type="text"
                    name="lastname"
                    value={student.lastname}
                    onChange={handleInputChange}
                  />
                </li>
                <li className="list-group-item">
                  <b>Address:</b>
                  <input
                    type="text"
                    name="address"
                    value={student.studdetials.address}
                    onChange={handleInputChange}
                  />
                </li>
                <li className="list-group-item">
                  <b>Gender:</b>
                  <input
                    type="text"
                    name="gender"
                    value={student.studdetials.gender}
                    onChange={handleInputChange}
                  />
                </li>
                <li className="list-group-item">
                  <b>Email_id:</b>
                  <input
                    type="text"
                    name="emailid"
                    value={student.studdetials.emailid}
                    onChange={handleInputChange}
                  />
                </li>
                <li className="list-group-item">
                  <b>Subject:</b>
                  <input
                    type="text"
                    name="subject"
                    value={student.marks.subject}
                    onChange={handleInputChange}
                  />
                </li>
                <li className="list-group-item">
                  <b>Marks:</b>
                  <input
                    type="text"
                    name="marks"
                    value={student.marks.marks}
                    onChange={handleInputChange}
                  />
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
