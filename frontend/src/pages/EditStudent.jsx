import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudents, updateStudent } from "../services/api";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const students = await getStudents();
            const student = students.find(
                (item) => item.id === Number(id)
            );

            if (!student) {
                alert("Student not found");
                navigate("/students");
                return;
            }

            setFormData({
                ...student,
                date_of_birth: student.date_of_birth
                    ? student.date_of_birth.split("T")[0]
                    : ""
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateStudent(id, {
                ...formData,
                year: Number(formData.year),
                semester: Number(formData.semester)
            });

            alert("Student updated successfully!");
            navigate("/students");
        } catch (error) {
            console.error(error);
            alert("Failed to update student.");
        }
    };

    if (loading || !formData) {
        return <div className="loading-state">Loading student...</div>;
    }

    return (
        <div className="form-page">

            <div className="page-heading">
                <div>
                    <h1>Edit Student</h1>
                    <p>Update student information</p>
                </div>
            </div>

            <form
                className="student-form"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <div className="form-section-title">
                        <h2>Student Information</h2>
                        <p>Update the student's details</p>
                    </div>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Roll Number</label>
                            <input
                                name="roll_number"
                                value={formData.roll_number}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Department</label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <option value="Computer Science">
                                    Computer Science
                                </option>

                                <option value="Electronics">
                                    Electronics
                                </option>

                                <option value="Information Technology">
                                    Information Technology
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Year</label>

                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            >
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Semester</label>

                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                            >
                                {[1,2,3,4,5,6,7,8].map((sem) => (
                                    <option key={sem} value={sem}>
                                        Semester {sem}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Gender</label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                </div>

                <div className="form-section">

                    <div className="form-group">
                        <label>Address</label>

                        <textarea
                            name="address"
                            rows="4"
                            value={formData.address || ""}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/students")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Update Student
                    </button>

                </div>

            </form>
        </div>
    );
}

export default EditStudent;