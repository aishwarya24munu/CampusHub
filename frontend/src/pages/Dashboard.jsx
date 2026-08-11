import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getDashboardStats, getStudents } from "../services/api";

function Dashboard() {
    const [stats, setStats] = useState({
    totalStudents: 0,
    computerScience: 0,
    electronics: 0,
    informationTechnology: 0
});

const [recentStudents, setRecentStudents] = useState([]);

useEffect(() => {
    loadDashboard();
}, []);

const loadDashboard = async () => {
    try {
        const statsData = await getDashboardStats();
        const studentsData = await getStudents();

        setStats(statsData);
        setRecentStudents(studentsData.slice(0, 4));
    } catch (error) {
        console.error("Dashboard loading failed:", error);
    }
};

    

    return (
        <div className="dashboard">

            {/* Welcome section */}

            <div className="welcome-section">

                <div>
                    <h1>
                        Good evening, Admin 👋
                    </h1>

                    <p>
                        Here's what's happening with your students today.
                    </p>
                </div>

                <button className="primary-btn">
                    + Add Student
                </button>

            </div>


            {/* Statistics */}

            <div className="stats-grid">

                <StatCard
                    title="Total Students"
                    value="128"
                    icon="👨‍🎓"
                    description="↑ 12% from last month"
                />

                <StatCard
                    title="Computer Science"
                    value="42"
                    icon="💻"
                    description="32.8% of total students"
                />

                <StatCard
                    title="Electronics"
                    value="36"
                    icon="⚡"
                    description="28.1% of total students"
                />
<StatCard
    title="Total Students"
    value={stats.totalStudents}
    icon="👨‍🎓"
    description="Students registered"
/>
<StatCard
    title="Computer Science"
    value={stats.computerScience}
    icon="💻"
    description="CSE students"
/>
<StatCard
    title="Electronics"
    value={stats.electronics}
    icon="⚡"
    description="ECE students"
/>
<StatCard
    title="Information Tech"
    value={stats.informationTechnology}
    icon="🌐"
    description="IT students"
/>

            </div>


            {/* Main dashboard content */}

            <div className="dashboard-grid">

                {/* Recent students */}

                <div className="dashboard-card students-card">

                    <div className="card-header">

                        <div>
                            <h2>Recent Students</h2>
                            <p>Recently added students</p>
                        </div>

                        <button className="view-btn">
                            View All →
                        </button>

                    </div>


                    <div className="student-table">

                        <div className="table-header">
                            <span>Student</span>
                            <span>Roll Number</span>
                            <span>Department</span>
                            <span>Year</span>
                        </div>


                        {recentStudents.map((student) => (

                            <div
                                className="student-row"
                                key={student.id}
                            >

                                <div className="student-name">

                                    <div className="student-avatar">
                                        {student.name.charAt(0)}
                                    </div>

                                    <div>
                                        <strong>
                                            {student.name}
                                        </strong>

                                        <small>
                                            Student
                                        </small>
                                    </div>

                                </div>

                                <span>
                                    {student.roll}
                                </span>

                                <span>
                                    {student.department}
                                </span>

                                <span className="year-badge">
                                    {student.year}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                {/* Quick actions */}

                <div className="dashboard-card quick-card">

                    <div className="card-header">

                        <div>
                            <h2>Quick Actions</h2>
                            <p>Manage your students</p>
                        </div>

                    </div>


                    <div className="quick-actions">

                        <button className="quick-action">
                            <span>➕</span>

                            <div>
                                <strong>Add Student</strong>
                                <small>Create a new student record</small>
                            </div>

                            <span>→</span>
                        </button>


                        <button className="quick-action">
                            <span>🔍</span>

                            <div>
                                <strong>Find Student</strong>
                                <small>Search student records</small>
                            </div>

                            <span>→</span>
                        </button>


                        <button className="quick-action">
                            <span>📊</span>

                            <div>
                                <strong>View Analytics</strong>
                                <small>Check student statistics</small>
                            </div>

                            <span>→</span>
                        </button>


                        <button className="quick-action">
                            <span>⚙️</span>

                            <div>
                                <strong>Settings</strong>
                                <small>Manage your account</small>
                            </div>

                            <span>→</span>
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;