import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents, deleteStudent } from "../services/api";

function Students() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);

            const data = await getStudents();

            setStudents(data);
        } catch (error) {
            console.error("Failed to load students:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteStudent(id);

            setStudents((previousStudents) =>
                previousStudents.filter(
                    (student) => student.id !== id
                )
            );

        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete student.");
        }
    };

    const filteredStudents = students.filter((student) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.roll_number.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText);

        const matchesDepartment =
            department === "All" ||
            student.department === department;

        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="students-page">

            <div className="page-heading">

                <div>
                    <h1>Students</h1>

                    <p>
                        Manage all registered students
                    </p>
                </div>

                <Link
                    to="/students/add"
                    className="primary-btn"
                >
                    + Add Student
                </Link>

            </div>


            <div className="students-card">

                <div className="students-toolbar">

                    <div className="search-box">
                        🔍

                        <input
                            type="text"
                            placeholder="Search by name, roll number or email..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                    </div>


                    <select
                        value={department}
                        onChange={(event) =>
                            setDepartment(event.target.value)
                        }
                        className="department-filter"
                    >
                        <option value="All">
                            All Departments
                        </option>

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


                {loading ? (

                    <div className="loading-state">
                        Loading students...
                    </div>

                ) : filteredStudents.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            👨‍🎓
                        </div>

                        <h3>
                            No students found
                        </h3>

                        <p>
                            Try changing your search or add a new student.
                        </p>

                        <Link
                            to="/students/add"
                            className="primary-btn"
                        >
                            + Add Student
                        </Link>

                    </div>

                ) : (

                    <div className="students-table-wrapper">

                        <table className="students-table">

                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Roll Number</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>

                                            <div className="table-student">

                                                <div className="table-avatar">
                                                    {student.name.charAt(0)}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {student.name}
                                                    </strong>

                                                    <span>
                                                        {student.phone || "No phone"}
                                                    </span>
                                                </div>

                                            </div>

                                        </td>

                                        <td>
                                            {student.roll_number}
                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            <span className="department-badge">
                                                {student.department}
                                            </span>
                                        </td>

                                        <td>
                                            Year {student.year}
                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="action-view"
                                                    title="View"
                                                >
                                                    👁️
                                                </button>

                                                <Link
                                                    to={`/students/edit/${student.id}`}
                                                    className="action-edit"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </Link>

                                                <Link
    to={`/students/${student.id}`}
    className="action-view"
    title="View"
>
    👁️
</Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Students;