import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <header className="navbar">

            <div className="navbar-left">
                <button className="mobile-menu">
                    ☰
                </button>

                <div>
                    <h2>Dashboard</h2>
                    <p>Student Management System</p>
                </div>
            </div>

            <div className="navbar-right">

                <button className="notification-btn">
                    🔔
                </button>

                <div className="profile">

                    <div className="profile-avatar">
                        A
                    </div>

                    <div className="profile-info">
                        <strong>Admin</strong>
                        <span>Administrator</span>
                    </div>

                    <button
                        type="button"
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;