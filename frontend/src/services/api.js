import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getDashboardStats = async () => {
    const response = await API.get("/students/stats/dashboard");
    return response.data;
};

export const getStudents = async () => {
    const response = await API.get("/students");
    return response.data;
};

export const createStudent = async (studentData) => {
    const response = await API.post("/students", studentData);
    return response.data;
};

export const updateStudent = async (id, studentData) => {
    const response = await API.put(`/students/${id}`, studentData);
    return response.data;
};

export const deleteStudent = async (id) => {
    const response = await API.delete(`/students/${id}`);
    return response.data;
};

export default API;