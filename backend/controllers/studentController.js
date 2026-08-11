const db = require("../config/db");

// Get all students
const getStudents = (req, res) => {
    const sql = "SELECT * FROM students ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch students"
            });
        }

        res.status(200).json(results);
    });
};

// Get one student
const getStudentById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM students WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch student"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Add student
const createStudent = (req, res) => {
    const {
        name,
        roll_number,
        email,
        phone,
        department,
        year,
        semester,
        gender,
        date_of_birth,
        address
    } = req.body;

    if (!name || !roll_number || !email) {
        return res.status(400).json({
            message: "Name, roll number and email are required"
        });
    }

    const sql = `
        INSERT INTO students
        (name, roll_number, email, phone, department, year, semester, gender, date_of_birth, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        roll_number,
        email,
        phone,
        department,
        year,
        semester,
        gender,
        date_of_birth,
        address
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "Roll number or email already exists"
                });
            }

            return res.status(500).json({
                message: "Failed to create student"
            });
        }

        res.status(201).json({
            message: "Student created successfully",
            studentId: result.insertId
        });
    });
};

// Update student
const updateStudent = (req, res) => {
    const { id } = req.params;

    const {
        name,
        roll_number,
        email,
        phone,
        department,
        year,
        semester,
        gender,
        date_of_birth,
        address
    } = req.body;

    const sql = `
        UPDATE students
        SET
            name = ?,
            roll_number = ?,
            email = ?,
            phone = ?,
            department = ?,
            year = ?,
            semester = ?,
            gender = ?,
            date_of_birth = ?,
            address = ?
        WHERE id = ?
    `;

    const values = [
        name,
        roll_number,
        email,
        phone,
        department,
        year,
        semester,
        gender,
        date_of_birth,
        address,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to update student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });
    });
};

// Delete student
const deleteStudent = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to delete student"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    });
};
// Get dashboard statistics
const getDashboardStats = (req, res) => {
    const sql = `
        SELECT
            COUNT(*) AS totalStudents,
            SUM(CASE WHEN department = 'Computer Science' THEN 1 ELSE 0 END) AS computerScience,
            SUM(CASE WHEN department = 'Electronics' THEN 1 ELSE 0 END) AS electronics,
            SUM(CASE WHEN department = 'Information Technology' THEN 1 ELSE 0 END) AS informationTechnology
        FROM students
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch dashboard statistics"
            });
        }

        res.status(200).json(results[0]);
    });
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getDashboardStats
};