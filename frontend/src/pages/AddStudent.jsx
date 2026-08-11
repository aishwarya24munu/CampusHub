import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/api";

function AddStudent() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        roll_number: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        semester: "",
        gender: "",
        date_of_birth: "",
        address: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }));
    };

    const validateForm = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.roll_number.trim()) {
            newErrors.roll_number = "Roll number is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must contain 10 digits";
        }

        if (!formData.department) {
            newErrors.department = "Select a department";
        }

        if (!formData.year) {
            newErrors.year = "Select year";
        }

        if (!formData.semester) {
            newErrors.semester = "Select semester";
        }

        if (!formData.gender) {
            newErrors.gender = "Select gender";
        }

        if (!formData.date_of_birth) {
            newErrors.date_of_birth = "Date of birth is required";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            await createStudent({
                ...formData,
                year: Number(formData.year),
                semester: Number(formData.semester)
            });

            alert("Student added successfully!");

            navigate("/students");

        } catch (error) {

            console.error("Failed to create student:", error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to add student.");
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="form-page">

            <div className="page-heading">

                <div>
                    <h1>Add Student</h1>

                    <p>
                        Create a new student record
                    </p>
                </div>

            </div>


            <form
                className="student-form"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <div className="form-section-title">
                        <h2>Personal Information</h2>

                        <p>
                            Enter the student's basic information
                        </p>
                    </div>


                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Full Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <span className="form-error">
                                    {errors.name}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Roll Number *
                            </label>

                            <input
                                type="text"
                                name="roll_number"
                                placeholder="e.g. CSE001"
                                value={formData.roll_number}
                                onChange={handleChange}
                            />

                            {errors.roll_number && (
                                <span className="form-error">
                                    {errors.roll_number}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Email *
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="student@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {errors.email && (
                                <span className="form-error">
                                    {errors.email}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Phone *
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="10 digit phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            {errors.phone && (
                                <span className="form-error">
                                    {errors.phone}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Gender *
                            </label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                            {errors.gender && (
                                <span className="form-error">
                                    {errors.gender}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Date of Birth *
                            </label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                            />

                            {errors.date_of_birth && (
                                <span className="form-error">
                                    {errors.date_of_birth}
                                </span>
                            )}

                        </div>

                    </div>

                </div>


                <div className="form-section">

                    <div className="form-section-title">

                        <h2>Academic Information</h2>

                        <p>
                            Enter the student's academic details
                        </p>

                    </div>


                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Department *
                            </label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select department
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

                            {errors.department && (
                                <span className="form-error">
                                    {errors.department}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Year *
                            </label>

                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select year
                                </option>

                                <option value="1">
                                    1st Year
                                </option>

                                <option value="2">
                                    2nd Year
                                </option>

                                <option value="3">
                                    3rd Year
                                </option>

                                <option value="4">
                                    4th Year
                                </option>

                            </select>

                            {errors.year && (
                                <span className="form-error">
                                    {errors.year}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Semester *
                            </label>

                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select semester
                                </option>

                                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                    (semester) => (
                                        <option
                                            key={semester}
                                            value={semester}
                                        >
                                            Semester {semester}
                                        </option>
                                    )
                                )}

                            </select>

                            {errors.semester && (
                                <span className="form-error">
                                    {errors.semester}
                                </span>
                            )}

                        </div>

                    </div>

                </div>


                <div className="form-section">

                    <div className="form-section-title">

                        <h2>Contact Information</h2>

                        <p>
                            Enter the student's address
                        </p>

                    </div>


                    <div className="form-group">

                        <label>
                            Address *
                        </label>

                        <textarea
                            name="address"
                            rows="4"
                            placeholder="Enter complete address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        {errors.address && (
                            <span className="form-error">
                                {errors.address}
                            </span>
                        )}

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
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Student"
                        }
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddStudent;