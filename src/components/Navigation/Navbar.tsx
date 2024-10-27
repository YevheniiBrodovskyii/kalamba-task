import { useAuth } from "contexts/AuthContext";
import { FC, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

export const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      logout();
      history.push("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/editor" activeClassName="active">
              <i className="ion-compose" />
              &nbsp;New Article
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/settings" activeClassName="active">
              <i className="ion-gear-a" />
              &nbsp;Settings
            </NavLink>
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
              {error ? <li className="error-messages">Try again</li> : null}
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeClassName="active">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" activeClassName="active">
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
