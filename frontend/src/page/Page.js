
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

export default function Page() {
    const [students, setStudents] = useState([]);
    // const { id} = useParams()


    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await axios.get("http://ec2-65-1-86-67.ap-south-1.compute.amazonaws.com/api/s/getallstudent");

            const combinedData = response.data.student.map((student, index) => ({
                ...student,
                ...response.data.marks[index],
                ...response.data.studentDetails[index]
            }));

            setStudents(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);

        }

    };


    const delteStudent = async (id) => {
        try {
          await axios.delete(`http://ec2-65-1-86-67.ap-south-1.compute.amazonaws.com/api/s/deletestudent/${id}`);
          loadStudents();
        } catch (error) {
          console.error("Error deleting student:", error);

        }
      };

    return (
        <div className='container'>
            <div className='py-5'>
                <table className="table border-5 shadow">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">First_name</th>
                            <th scope="col">Last_name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Gender</th>
                            <th scope="col">email_id</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Marks</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td>{student.firstname}</td>
                                <td>{student.lastname}</td>
                                <td>{student.address}</td>
                                <td>{student.gender}</td>
                                <td>{student.emailid}</td>
                                <td>{student.subject}</td>
                                <td>{student.marks}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewstudent/${student.id}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editstudent/${student.id}`}>Edit</Link>
                                   <button className='btn btn-danger mx-2' onClick={() => {console.log('Student:', student); delteStudent(student.id);}} >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
