import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function AddStudent() {
  let navigate = useNavigate();

  const [student, setStudent] = useState({
      First_name: "",
      Last_name: "",
      address: "",
      gender: "",
      emailid: "",
      Subject: "",
      Marks: ""
  });

  const onInputChange = (e) => {
      setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const requestData = {
          studdetials: {
              address: student.address,
              gender: student.gender,
              emailid: student.emailid
          },
          student: {
              firstname: student.First_name,
              lastname: student.Last_name
          },
          marks: {
              subject: student.Subject,
              marks: parseFloat(student.Marks)
          }
      };




      await axios.post("http://ec2-13-127-25-66.ap-south-1.compute.amazonaws.com/api/s/creatstudent", requestData);
      navigate("/");
  } catch (error) {
      console.error("Error:", error);
  }
};

  return (


    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="First_name" className="form-label">
              First_name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your firstname"
                name="First_name"
                value={student.First_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Last_name" className="form-label">
              Last_name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your lastname"
                name="Last_name"
                value={student.Last_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your  address"
                name="address"
                value={student.address}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your gender"
                name="gender"
                value={student.gender}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailid" className="form-label">
                E-mail id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="emailid"
                value={student.emailid}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                Subject
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your subject"
                name="Subject"
                value={student.Subject}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Marks" className="form-label">
                Marks
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your marks"
                name="Marks"
                value={student.Marks}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>

  )
}
