import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudents } from "../services/api";

function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const students = await getStudents();

            const foundStudent = students.find(
                (item) => item.id === Number(id)
            );

            if (!foundStudent) {
                alert("Student not found");
                navigate("/students");
                return;
            }

            setStudent(foundStudent);
        } catch (error) {
            console.error(error);
        }
    };

    if (!student) {
        return (
            <div className="loading-state">
                Loading student...
            </div>
        );
    }

    return (
        <div className="details-page">

            <div className="page-heading">
                <div>
                    <h1>Student Details</h1>
                    <p>View complete student information</p>
                </div>

                <button
                    className="cancel-btn"
                    onClick={() => navigate("/students")}
                >
                    ← Back to Students
                </button>
            </div>

            <div className="student-profile-card">

                <div className="profile-header">

                    <div className="large-avatar">
                        {student.name.charAt(0)}
                    </div>

                    <div>
                        <h2>{student.name}</h2>
                        <p>{student.roll_number}</p>
                    </div>

                </div>

                <div className="details-section">

                    <h3>Personal Information</h3>

                    <div className="details-grid">

                        <div>
                            <span>Email</span>
                            <strong>{student.email}</strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>{student.phone}</strong>
                        </div>

                        <div>
                            <span>Gender</span>
                            <strong>{student.gender}</strong>
                        </div>

                        <div>
                            <span>Date of Birth</span>
                            <strong>
                                {student.date_of_birth
                                    ? new Date(
                                        student.date_of_birth
                                    ).toLocaleDateString("en-IN")
                                    : "Not provided"}
                            </strong>
                        </div>

                    </div>

                </div>

                <div className="details-section">

                    <h3>Academic Information</h3>

                    <div className="details-grid">

                        <div>
                            <span>Department</span>
                            <strong>{student.department}</strong>
                        </div>

                        <div>
                            <span>Year</span>
                            <strong>Year {student.year}</strong>
                        </div>

                        <div>
                            <span>Semester</span>
                            <strong>Semester {student.semester}</strong>
                        </div>

                        <div>
                            <span>Roll Number</span>
                            <strong>{student.roll_number}</strong>
                        </div>

                    </div>

                </div>

                <div className="details-section">

                    <h3>Address</h3>

                    <p className="student-address">
                        {student.address}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default StudentDetails;