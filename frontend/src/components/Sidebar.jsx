import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="brand">
                <div className="brand-icon">
                    🎓
                </div>

                <div>
                    <h1>CampusHub</h1>
                    <span>Student Portal</span>
                </div>
            </div>

            <nav className="sidebar-nav">

                <p className="menu-title">
                    MAIN MENU
                </p>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span>📊</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/students"
                    className="nav-item"
                >
                    <span>👨‍🎓</span>
                    Students
                </NavLink>

                <NavLink
                    to="/students/add"
                    className="nav-item"
                >
                    <span>➕</span>
                    Add Student
                </NavLink>

                <p className="menu-title">
                    MANAGEMENT
                </p>

                <button className="nav-item">
                    <span>📈</span>
                    Analytics
                </button>

                <button className="nav-item">
                    <span>⚙️</span>
                    Settings
                </button>

            </nav>

            <div className="sidebar-bottom">

                <div className="help-box">
                    <div className="help-icon">
                        💡
                    </div>

                    <div>
                        <strong>Need Help?</strong>
                        <p>Check the documentation</p>
                    </div>
                </div>

                <button className="logout-btn">
                    🚪
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;