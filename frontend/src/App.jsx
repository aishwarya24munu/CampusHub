import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">

                <Sidebar />

                <div className="main-area">

                    <Navbar />

                    <main className="content">

                        <Routes>

                            <Route
                                path="/"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/students"
                                element={<Students />}
                            />
                            <Route
    path="/students/add"
    element={<AddStudent />}
/>
<Route
    path="/students/edit/:id"
    element={<EditStudent />}
/>
<Route
    path="/students/:id"
    element={<StudentDetails />}
/>
<Route
    path="/login"
    element={<Login />}
/>


                        </Routes>

                    </main>

                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;