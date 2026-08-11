const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

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
router.get("/", authMiddleware, getStudents);

// GET dashboard statistics
router.get("/stats/dashboard", authMiddleware, getDashboardStats);

// GET student by ID
router.get("/:id", authMiddleware, getStudentById);

// POST create student
router.post("/", authMiddleware, createStudent);

// PUT update student
router.put("/:id", authMiddleware, updateStudent);

// DELETE student
router.delete("/:id", authMiddleware, deleteStudent);

module.exports = router;