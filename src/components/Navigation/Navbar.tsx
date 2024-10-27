import { DisabledButton } from "components/ui";
import { useAuth } from "contexts/AuthContext";
import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    setError(false);
    try {
      logout();
      navigate("/");
    } catch (error) {
      setError(Boolean(error));
    } finally {
      setLoading(false);
    }
  };

  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? { textDecoration: 'none', color: 'black' } : undefined;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" style={activeStyle}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            {user ? (<NavLink className="nav-link" to="/editor" style={activeStyle}>
              <i className="ion-compose" />&nbsp;New Article
            </NavLink>) : (<DisabledButton text="New Article" />)}
          </li>
          <li className="nav-item">
            {user ? (<NavLink className="nav-link" to="/settings" style={activeStyle}>
              <i className="ion-gear-a" />&nbsp;Settings
            </NavLink>) : (<DisabledButton text="Settings" />)}
          </li>
          {user ? (
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={handleLogout}
                disabled={loading}
                style={{ cursor: "pointer", background: "none", border: "none", color: "red" }}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
              {error && <div className="error-messages">Try again</div>}
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={activeStyle}>
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" style={activeStyle}>
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
