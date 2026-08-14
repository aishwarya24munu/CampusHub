const express = require("express");

const {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getDashboardStats
} = require("../controllers/studentController");

const router = express.Router();

// GET all students
router.get("/", getStudents);

// GET dashboard statistics
router.get("/stats/dashboard", getDashboardStats);

// GET student by ID
router.get("/:id", getStudentById);

// POST create student
router.post("/", createStudent);

// PUT update student
router.put("/:id", updateStudent);

// DELETE student
router.delete("/:id", deleteStudent);

module.exports = router;